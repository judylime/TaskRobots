package com.project.autoexpress.handler.dao;

import com.project.autoexpress.entity.Customer;
import com.project.autoexpress.entity.ShippingOrder;
import com.project.autoexpress.entity.Station;
import com.project.autoexpress.entity.User;
import com.project.autoexpress.handler.service.CustomerService;
import com.project.autoexpress.handler.service.DispatchService;
import com.project.autoexpress.handler.service.StationService;
import com.project.autoexpress.holder.request.OrderRequestBody;
import com.project.autoexpress.holder.response.OrderInfoResponseBody;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OrderDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private StationService stationService;

    @Autowired
    private DispatchService dispatchService;

    public List<OrderInfoResponseBody> getCurrentUserOrders() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String emailId = loggedInUser.getName();

        User user = null;
        try (Session session = sessionFactory.openSession()) {
            user = session.get(User.class, emailId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Customer customer = user.getCustomer();
        List<ShippingOrder> orders = customer.getShippingOrder();
        List<OrderInfoResponseBody> results = new ArrayList<>();
        for(ShippingOrder order : orders) {
            OrderInfoResponseBody body = new OrderInfoResponseBody();
            body.setSender(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName());
            body.setSenderAddress(order.getSenderAddress());
            body.setReceiver(order.getReceiverName());
            body.setReceiverAddress(order.getReceiverAddress());
            body.setSize(order.getSize());
            body.setWeight(order.getWeight() + " lb");
            body.setDelivery(order.getDeliveryMethod());
            results.add(body);
        }
        return results;
    }

    public Integer addOrder(OrderRequestBody orderRequest) { // set 是否成功，通过返回一个int来表达。

        Customer customer = customerService.getCurrentCustomer();
        // assume new order is assigned to station with stationID == 1
        Station station = stationService.getStationById(1);

        //dispatch a station
        //Station station = dispatchService.dispatchStation(orderRequest);

        ShippingOrder shippingOrder = new ShippingOrder(); // build a shipping order from request
        shippingOrder.setCustomer(customer);
        shippingOrder.setSenderAddress(orderRequest.getSenderAddress());
        shippingOrder.setReceiverAddress(orderRequest.getReceiverAddress());
        shippingOrder.setReceiverName(orderRequest.getReceiverName());
        shippingOrder.setCardNumber(orderRequest.getCardNumber());
        shippingOrder.setDeliveryMethod(orderRequest.getDeliveryMethod());
        shippingOrder.setDescription(orderRequest.getDescription());
        shippingOrder.setFee(orderRequest.getFee());
        shippingOrder.setSize(orderRequest.getSize());
        shippingOrder.setWeight(orderRequest.getWeight());
        // add current time
        shippingOrder.setTime(new Timestamp(System.currentTimeMillis()));
        // assume inital status of new order is waiting
        shippingOrder.setStatus("waiting");
        // assign order to a station
        shippingOrder.setStation(station);

        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(shippingOrder);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
            return null; // on error
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return shippingOrder.getOrderId(); // on success
    }

    public ShippingOrder getShippingOrderById(Integer orderId) {
        ShippingOrder shippingOrder = null;

        try (Session session = sessionFactory.openSession()) {
            shippingOrder = session.get(ShippingOrder.class, orderId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (shippingOrder != null) {
            return shippingOrder;
        }
        return null;
    }
}
