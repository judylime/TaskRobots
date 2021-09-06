package com.project.autoexpress.handler.controller;

import com.project.autoexpress.entity.ShippingOrder;
import com.project.autoexpress.handler.service.DispatchService;
import com.project.autoexpress.handler.service.OrderService;
import com.project.autoexpress.holder.request.OrderRequestBody;
import com.project.autoexpress.holder.response.OrderInfoResponseBody;
import com.project.autoexpress.holder.response.OrderResponseBody;
import com.project.autoexpress.holder.response.TrackingResponseBody;
import com.sun.xml.bind.v2.TODO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private DispatchService dispatchService;

    @RequestMapping(value = "/payment", method = RequestMethod.POST)
    public ResponseEntity<Object> placeOrder(@RequestBody OrderRequestBody orderRequest) {

        // request containing the request body.
        OrderResponseBody orderResponse = new OrderResponseBody();
        int orderId = orderService.addOrder(orderRequest);
        orderResponse.setOrderId(orderId);

        //add a dispatched stationId to the response
        TrackingResponseBody trackingResponseBody = new TrackingResponseBody();
        int stationId = dispatchService.dispatchStation(orderRequest);
        trackingResponseBody.setStationId(stationId);

        if (orderResponse == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // give a response body class object in the first parameter
        }

        // return tracking number and status
        return new ResponseEntity<>(orderResponse, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/orders", method = RequestMethod.GET)
    public ResponseEntity<Object> getCurrentUserOrders() {
        List<OrderInfoResponseBody> orderList = orderService.getCurrentUserOrders();
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }
}
