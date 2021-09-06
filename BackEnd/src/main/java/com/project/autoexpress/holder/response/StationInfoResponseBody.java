package com.project.autoexpress.holder.response;

public class StationInfoResponseBody {

    private int stationId;
    private int availableDrone;
    private int availableRobot;
    private String stationAddress;

    public int getStationId() {
        return stationId;
    }

    public void setStationId(int stationId) {
        this.stationId = stationId;
    }

    public int getAvailableDrone() {
        return availableDrone;
    }

    public void setAvailableDrone(int availableDrone) {
        this.availableDrone = availableDrone;
    }

    public int getAvailableRobot() {
        return availableRobot;
    }

    public void setAvailableRobot(int availableRobot) {
        this.availableRobot = availableRobot;
    }

    public String getStationAddress() {
        return stationAddress;
    }

    public void setStationAddress(String stationAddress) {
        this.stationAddress = stationAddress;
    }

}
