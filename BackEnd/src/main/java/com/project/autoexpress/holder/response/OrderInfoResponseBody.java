package com.project.autoexpress.holder.response;

public class OrderInfoResponseBody {
  String sender;
  String senderAddress;
  String receiver;
  String receiverAddress;
  String size;
  String weight;
  String delivery;

  public String getSender() {
    return sender;
  }

  public void setSender(String sender) {
    this.sender = sender;
  }

  public String getSenderAddress() {
    return senderAddress;
  }

  public void setSenderAddress(String senderAddress) {
    this.senderAddress = senderAddress;
  }

  public String getReceiver() {
    return receiver;
  }

  public void setReceiver(String receiver) {
    this.receiver = receiver;
  }

  public String getReceiverAddress() {
    return receiverAddress;
  }

  public void setReceiverAddress(String receiverAddress) {
    this.receiverAddress = receiverAddress;
  }

  public String getSize() {
    return size;
  }

  public void setSize(String size) {
    this.size = size;
  }

  public String getWeight() {
    return weight;
  }

  public void setWeight(String weight) {
    this.weight = weight;
  }

  public String getDelivery() {
    return delivery;
  }

  public void setDelivery(String delivery) {
    this.delivery = delivery;
  }
}
