package com.project.autoexpress.handler.controller;

import com.project.autoexpress.handler.service.StationService;
import com.project.autoexpress.holder.request.StationRequestBody;
import com.project.autoexpress.holder.response.StationInfoResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StationController {

    @Autowired
    private StationService stationService;

    @RequestMapping(value = "/admin/addStation", method = RequestMethod.POST)
    public ResponseEntity<Object> addStation(@RequestBody StationRequestBody stationRequest) {

        // add station, get stationId
        Integer stationId = stationService.addStation(stationRequest);

        // if add unsuccessful, return bad request
        if (stationId == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // if successful, get list of stations
        List<StationInfoResponseBody> stationList = stationService.getAllStations();

        // return list of stations and status
        return new ResponseEntity<>(stationList, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/allStations", method = RequestMethod.GET)
    public ResponseEntity<Object> getAllStations() {

        // get all stations as a list
        List<StationInfoResponseBody> stationList = stationService.getAllStations();

        // return list of stations and status
        return new ResponseEntity<>(stationList, HttpStatus.OK);
    }
}
