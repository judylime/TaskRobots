package com.project.autoexpress.holder.request;

public class OrderRequestBody {

    private String senderAddress;
    private String receiverAddress;
    private String receiverName;
    private String cardNumber;
    private String size;
    private double weight;
    private String description;
    private String deliveryMethod;
    private double fee;
    //add sender address's latitude and longitude
    private double latitude;
    private double longitude;

    public void setSenderAddress(String senderAddress) {
        this.senderAddress = senderAddress;
    }

    public void setReceiverAddress(String receiverAddress) {
        this.receiverAddress = receiverAddress;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDeliveryMethod(String deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }

    public String getSenderAddress() {
        return senderAddress;
    }

    public String getReceiverAddress() {
        return receiverAddress;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getSize() {
        return size;
    }

    public double getWeight() {
        return weight;
    }

    public String getDescription() {
        return description;
    }

    public String getDeliveryMethod() {
        return deliveryMethod;
    }

    public double getFee() {
        return fee;
    }

    public double getLatitude() { return latitude; }

    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }

    public void setLongitude(double longitude) { this.longitude = longitude; }

}
