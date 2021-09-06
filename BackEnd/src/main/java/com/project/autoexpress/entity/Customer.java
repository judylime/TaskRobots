package com.project.autoexpress.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "customer")
public class Customer implements Serializable { // POJO class can be serialized.

  private static final long serialVersionUID = 103L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(unique = true)
  private User user; // 相当于 FK email

  private String firstName;
  private String lastName;
  private String shippingAddress;
  private String billingAddress;

  @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  private List<ShippingOrder> shippingOrder;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getShippingAddress() {
    return shippingAddress;
  }

  public void setShippingAddress(String shippingAddress) {
    this.shippingAddress = shippingAddress;
  }

  public String getBillingAddress() {
    return billingAddress;
  }

  public void setBillingAddress(String billingAddress) {
    this.billingAddress = billingAddress;
  }

  public List<ShippingOrder> getShippingOrder() {
    return shippingOrder;
  }

  public void setShippingOrder(List<ShippingOrder> shippingOrder) {
    this.shippingOrder = shippingOrder;
  }
}
