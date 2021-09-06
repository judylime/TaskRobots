package com.project.autoexpress.handler.service;

import com.project.autoexpress.entity.Station;
import com.project.autoexpress.handler.dao.StationDao;
import com.project.autoexpress.holder.request.OrderRequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DispatchService {

    @Autowired
    private StationDao stationDao;

    //get a list of Stations
    public List<Station> getStationsLocation() {
        return stationDao.getStationsLocation();
    }

    //return the stationId with the minimum distance to sender's address
    //手动在数据库里给三个station写了三个地址！
    public int dispatchStation(OrderRequestBody orderRequest) {
        double senderLat = orderRequest.getLatitude();
        double senderLon = orderRequest.getLongitude();
        String deliveryMethod = orderRequest.getDeliveryMethod();

        List<Station> stations = getStationsLocation();
        int id = -1;
        double minDistance = Integer.MAX_VALUE;

        for (Station station : stations) {
            double stationLat = station.getLatitude();
            double stationLon = station.getLongitude();
            int stationId = station.getStationId();

            double distance = getDistance(senderLat, senderLon, stationLat, stationLon, deliveryMethod);

            if (distance < minDistance) {
               minDistance = distance;
               id = stationId;
            }
        }

        return id;
    }

    //distance calculator
    private double getDistance(double lat1, double lon1, double lat2, double lon2,
                               String deliverMethod) {

        //if drone is selected---> 直线距离
        if (deliverMethod.equals("drone")) {
            return getDist(lat1, lon1, lat2, lon2);
        } else {//if robot is selected ---> manhattan distance
            return getManDist(lat1, lon1, lat2, lon2);
        }
    }

    //Haversine formula(球面距离，SF市内其实可以就当作曼哈顿距离）
    private double getDist(double lat1, double lon1, double lat2, double lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        } else {
            double theta = lon1 - lon2;
            double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
            dist = Math.acos(dist);
            dist = Math.toDegrees(dist);
            dist = dist * 60 * 1.1515;
            /*if (unit.equals("K")) {
                dist = dist * 1.609344;
            } else if (unit.equals("N")) {
                dist = dist * 0.8684;
            }*/
            return dist;
        }
    }

    private double getManDist(double lat1, double lon1, double lat2, double lon2) {
      return Math.abs(lat1 - lat2) + Math.abs(lon1 - lon2);
    }
}
