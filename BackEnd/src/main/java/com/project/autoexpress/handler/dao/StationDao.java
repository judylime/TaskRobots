package com.project.autoexpress.handler.dao;

import com.project.autoexpress.entity.Station;
import com.project.autoexpress.holder.request.StationRequestBody;
import com.project.autoexpress.holder.response.StationInfoResponseBody;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class StationDao {

    @Autowired
    private SessionFactory sessionFactory;

    public Integer addStation(StationRequestBody stationRequest) {

        // if stationId is not within the range of 1 - 3, return null
        if (stationRequest.getStationId() < 1 || stationRequest.getStationId() > 3 ) {
            return null;
        }
        // otherwise, add the new station
        Station station = new Station();
        station.setStationId(stationRequest.getStationId());
        station.setAvailableDrones(stationRequest.getAvailableDrones());
        station.setAvailableRobots(stationRequest.getAvailableRobots());
        station.setStationAddress(stationRequest.getStationAddress());

        //delete a robot or drone from the station

        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(station);
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

        return station.getStationId();
    }

    public List<StationInfoResponseBody> getAllStations() {
        // get all stations
        List<Station> stations = new ArrayList<>();
        try (Session session = sessionFactory.openSession()) {
            // if have, return all
            stations = session.createCriteria(Station.class).list();
        } catch (Exception e) {
            // if don't have return null
            e.printStackTrace();
        }
        // convert stations into response body
        List<StationInfoResponseBody> results = new ArrayList<>();
        for(Station station : stations) {
            StationInfoResponseBody body = new StationInfoResponseBody();
            body.setStationId(station.getStationId());
            body.setAvailableDrone(station.getAvailableDrones());
            body.setAvailableRobot(station.getAvailableRobots());
            body.setStationAddress(station.getStationAddress());
            results.add(body);
        }
        return results;
    }

    public Station getStationById(int stationId) {
        Station station = null;

        try (Session session = sessionFactory.openSession()) {
            station = session.get(Station.class, stationId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (station != null) {
            return station;
        }
        return null;
    }

    //get all 3 stations for lat and long
    public List<Station> getStationsLocation() {

        List<Station> stations = new ArrayList<>();
        try (Session session = sessionFactory.openSession()) {
            // if have, return all
            stations = session.createCriteria(Station.class).list();
        } catch (Exception e) {
            // if don't have return null
            e.printStackTrace();
        }

        return stations;
    }
}
