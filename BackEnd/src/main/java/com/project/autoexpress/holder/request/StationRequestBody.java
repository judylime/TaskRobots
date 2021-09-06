package com.project.autoexpress.holder.request;

public class StationRequestBody {
    private int stationId;
    private int availableDrones;
    private int availableRobots;
    private String stationAddress;

    public int getStationId() {
        return stationId;
    }

    public int getAvailableDrones() {
        return availableDrones;
    }

    public int getAvailableRobots() {
        return availableRobots;
    }

    public String getStationAddress() {
        return stationAddress;
    }

    public void setStationId(int stationId) {
        this.stationId = stationId;
    }

    public void setAvailableDrones(int availableDrones) {
        this.availableDrones = availableDrones;
    }

    public void setAvailableRobots(int availableRobots) {
        this.availableRobots = availableRobots;
    }

    public void setStationAddress(String stationAddress) {
        this.stationAddress = stationAddress;
    }


}
