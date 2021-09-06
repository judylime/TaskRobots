package com.project.autoexpress.handler.service;

import com.project.autoexpress.entity.Station;
import com.project.autoexpress.handler.dao.StationDao;
import com.project.autoexpress.holder.request.StationRequestBody;
import com.project.autoexpress.holder.response.StationInfoResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationService {

    @Autowired
    private StationDao stationDao;

    public Integer addStation(StationRequestBody stationRequest) {
        return stationDao.addStation(stationRequest);
    }

    public List<StationInfoResponseBody> getAllStations() {
        return stationDao.getAllStations();
    }

    public Station getStationById(int stationId) {
        return stationDao.getStationById(stationId);
    }
}
