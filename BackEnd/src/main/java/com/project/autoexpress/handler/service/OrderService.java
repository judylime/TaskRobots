package com.project.autoexpress.handler.service;

import com.project.autoexpress.entity.ShippingOrder;
import com.project.autoexpress.handler.dao.OrderDao;
import com.project.autoexpress.holder.request.OrderRequestBody;
import com.project.autoexpress.holder.response.OrderInfoResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderDao orderDao;

    public int addOrder(OrderRequestBody orderRequest) {
        return orderDao.addOrder(orderRequest);
    }

    public ShippingOrder getShippingOrderById(int orderId) {
        return orderDao.getShippingOrderById(orderId);
    }

    public List<OrderInfoResponseBody> getCurrentUserOrders() {
        return orderDao.getCurrentUserOrders();
    }
}
