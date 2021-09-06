import React, { Component } from "react";
import "antd/dist/antd.css";
import { makeAPayment } from "../utils";
import walle from "../assets/imgs/icon-robot.png";
import drone from "../assets/imgs/icon-drone.png";
import { getDistance, getRoute, getStraightDistance } from "./GoogleAPI.js";
import { Row, Col, Form, Input, Radio, Button, InputNumber, message, Divider } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { GEOCODING_BASE, GOOGLE_API_KEY, GOOGLE_DISTANCE_MATRIX_API } from "../constants";
import axios from "axios";
import MapContainer from "./GoogleMap";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class Ordering extends Component {
  state = {
    dist: null,
    cardInfo: {
      cardNumber: null
    },
    Ordering: {
      senderAddress: null,
      receiverAddress: null,
      receiverName: null,
      //cardNumber: null,
      size: null,
      weight: 0,
      description: null,
      deliveryMethod: null,
      fee: null,
    },
  };

  //'SUBMIT' button: 只负责向后端发送数据
  onFinish = (data) => {
    if (!data.hasOwnProperty("cardNumber")) {//如果当前data数据中没有cardNumber信息，则不向后端发送rest api，直接return。这一步是绕开发送2个api的bug
      return;
    }

    //ui上拿到的credit card数据不可以直接用，需要解构才能拿到。 存放在：this.state.cardInfo.cardNumber
    this.setState({
      cardInfo: data
    })

    //更改Ordering中的cardNumber
    this.setState({
      Ordering: { ...this.state.Ordering, cardNumber: this.state.cardInfo.cardNumber }
    });

    //console.log("onFinish, this.state.cardInfo:", this.state.cardInfo);

    //向后端发送Ordering数据
    console.log(data)
    makeAPayment(this.state.Ordering)
      .then(() => {
        message.success("Order successfully submitted");
      })
      .catch(err => {
        message.error("submit failed!", err);
      });

    //console.log("onFinish, this.state.cardInfo.cardNumber:", this.state.cardInfo.cardNumber);
    console.log("onFinish, this.state.Ordering:", this.state.cardInfo.Ordering);
  };

  //'Check Price' button: 只负责计算价格，实时显示给前端用户
  checkPriceOnClick = (data) => {
    //console.log("Click check price, data:", data);

    this.setState({
      Ordering: data,
    });

    // price calculation
    let weight = this.state.Ordering.weight;
    let size = 0;
    if (this.state.Ordering.size === "small") {
      size = 1;
    } else if (this.state.Ordering.size === "medium") {
      size = 2;
    } else {
      size = 3;
    }
    // console.log("when checking price, size: ", size);

    let method = 0;
    let dist = 1;

    if (this.state.Ordering.deliveryMethod === "drone") {//无人机派送
      method = 1;

      //处理地址，格式化
      var formattedAddrFrom = this.state.Ordering.senderAddress.replace(" ", "+");
      var formattedAddrTo = this.state.Ordering.receiverAddress.replace(" ", "+");

      // Geocoding API 起始地址
      const urlFrom = `${GEOCODING_BASE}${formattedAddrFrom}&key=${GOOGLE_API_KEY}`;
      console.log('Drone From url: ', urlFrom);

      // Geocoding API 目的地址
      const urlTo = `${GEOCODING_BASE}${formattedAddrTo}&key=${GOOGLE_API_KEY}`;
      console.log('Drone To url: ', urlTo);

      var location1 = null;

      //拿到经纬度，并计算距离，这里要注意：是在cb function内异步，所以用axios实现同步操作
      axios.get(urlFrom)
        .then(response => {
          //console.log("Sender, google api drone - response.data", response.data);
          //console.log('Sender location: ', response.data.results[0].geometry.location);
          location1 = response.data.results[0].geometry.location;
          const { lat, lng } = location1;
          console.log('Drone Sender Latitude & Longitude: ', lat, lng);
          var lat1 = lat;
          var lng1 = lng;

          var location2 = null;
          axios.get(urlTo)
            .then(response => {
              //console.log("Receiver, google api drone - response.data", response.data)
              //console.log('Receiver location: ', response.data.results[0].geometry.location);
              location2 = response.data.results[0].geometry.location;
              const { lat, lng } = location2;
              console.log('Drone Receiver Latitude & Longitude: ', lat, lng);
              var lat2 = lat;
              var lng2 = lng;
              console.log('Drone distance is: ', getStraightDistance(lat1, lng1, lat2, lng2));
              dist = getStraightDistance(lat1, lng1, lat2, lng2);//单位是米
            })
            .catch(error => {
              console.log('Drone To, err in fetch latitude and longitude -> ', error);
            })

        })
        .catch(error => {
          console.log('Drone From, err in fetch latitude and longitude -> ', error);
        })

    } else {//机器人派送
      method = 2;
      dist = getRoute(
        this.state.Ordering.senderAddress,
        this.state.Ordering.receiverAddress
      );
      console.log(dist);
    }
    // console.log("when checking price, method : ", method);
    let price = 0.8 * size * method * dist * weight;

    this.setState(
      {
        Ordering: Object.assign({}, this.state.Ordering, { fee: price.toFixed(2) }),//Round to 2 decimals
      });
    console.log("checked price, Update fee in Ordering:", this.state.Ordering);
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col span={15} offset={9}>
            <img src={walle} alt="robot" height={235} />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <img src={drone} alt="robot" height={235} />
          </Col>
        </Row>
        <br />

        <Row>
          <Col offset={6} span={12}>
            <br />
            <br />
            <Divider>
              <h1>SENDING A PACKAGE</h1>
            </Divider>
            <br></br>
            <br />
            <Divider orientation="left">Shipping Information</Divider>

            <Form
              {...formItemLayout}
              name="Ordering"
              onFinish={this.checkPriceOnClick}
              scrollToFirstError
            >
              <Form.Item
                name="receiverName"
                label="Receiver Name"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your receiver name!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="receiver name" />
              </Form.Item>
              <Form.Item
                name="senderAddress"
                label="Sender Address"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your Sender Address!",
                  },
                ]}
              >
                <Input placeholder="Pattern: Address, City, State, Zip code" />
              </Form.Item>

              <Form.Item
                name="receiverAddress"
                label="Receiver Address"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your Receiver Address!",
                  },
                ]}
              >
                <Input placeholder="Pattern: Address, City, State, Zip code" />
              </Form.Item>
              <Divider orientation="left">Package Information</Divider>

              <Form.Item
                name="description"
                label="Item Description"
                rules={[{ required: false, whitespace: true }]}
              >
                <Input placeholder="Please discribe your product" />
              </Form.Item>

              <Form.Item
                label="Package Size"
                name="size"
                rules={[{ required: true, whitespace: true }]}
              >
                <Radio.Group>
                  <Radio value="small">Small</Radio>
                  <Radio value="medium">Medium</Radio>
                  <Radio value="large">Large</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Delivery Method "
                name="deliveryMethod"
                rules={[{ required: true, whitespace: true }]}
              >
                <Radio.Group>
                  <Radio value="drone">Drone</Radio>
                  <Radio value="machine">Machine</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Weight"
                rules={[{ required: true, whitespace: true }]}
              >
                <Form.Item name="weight" noStyle>
                  <InputNumber min={0} max={20.0} step={0.5} defaultValue={0} />
                </Form.Item>

                <span className="App-ordering-package-weight"> lbs </span>
              </Form.Item>

              <Form.Item label="Shipping Price" name="fee">
                {/*<p>*/}
                  ${this.state.Ordering.fee } USD {'   '}
                  <Button
                  onClick={this.checkPriceOnClick}
                  icon={<SearchOutlined />}
                  htmlType="submit"
                >
                  Check Price
                  </Button>
                {/*</p>*/}
              </Form.Item>
            </Form>

            <Divider orientation="left">Payment Information</Divider>

            <Form
              {...formItemLayout}
              name="cardInfo"
              onFinish={this.onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="cardNumber"
                label="Card Number"
                rules={[{ required: true, whitespace: true }]}
              >
                <Input placeholder="Credit Card/ Debit Card Number" />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={this.onFinish} htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Form>

          </Col>
        </Row>
        <br />
        <Row>
          <Col offset={6} span={12} className="App-ordering-map">
            <MapContainer />
          </Col>
        </Row>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        


      </div>

    );
  }
}

export default Ordering;
