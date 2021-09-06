import React, { Component } from "react";
import { Row, Col, Divider, message } from "antd";
import background from "../assets/imgs/background_small.jpg";
import loc from "../assets/imgs/location.png";
import tracking from "../assets/imgs/tracking.png";
import shipping from "../assets/imgs/shipping.png";
import { Form, Input, Button } from "antd";
import { useMediaQuery } from "react-responsive";

import { Link } from "react-router-dom";
import { register, getTrackingDetails } from "../utils";
import { Redirect } from "react-router";

const layout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 10,
  },
};
//SZQ： “background“ ”loc“ ”shipping” 这些image的名字是怎么来的呢？跟文件名也不一样啊
//SZ: 先在render里把这六个layout 都写出来，然后用useMediaQuery检测当前浏览页面的size，因为size肯定落在max/min width区间之内
//所以最后render出来 有且只有一个页面。 SZQ： is there any better solutions to solve this redundant codes?
const XL = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1640 });
  return isDesktop ? children : null;
};
const L = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 1480, maxWidth: 1639 });
  return isTablet ? children : null;
};
const M = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 1310, maxWidth: 1479 });
  return isMobile ? children : null;
};
const S = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 1150, maxWidth: 1309 });
  return isMobile ? children : null;
};
const XS = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 820, maxWidth: 1149 });
  return isMobile ? children : null;
};
const XXS = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 819 });
  return isMobile ? children : null;
};

class Home extends Component {
  state = {
    trackingInfo: [],
  };

  onFinish = data => {
    console.log(data); //data contains all <Input> collected from user
    this.props.history.push(`/tracking?orderId=${data.orderId}`); //change url, then render Tracking component
  };
  //SZQ：this.hasChange 会返回一个 bool？And why in Home page we redirect to Tracking?
  render() {
    return this.hasChange ? (
      <Redirect to="/tracking" />
    ) : (
      <div>
        <Row>
          <Col span={24} className="App-home-main">
            <img
              className="App-home-background"
              src={background}
              alt="This is Drone."
            />
            <XL>
              <div className="App-home-container-xl">
                <h1 className="App-home-title">Robot Delivery</h1>
                <h1 className="App-home-title">SAN FRANCISCO</h1>
                <div>
                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={shipping}
                          alt="shipping"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Send A Package</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      {/*如果从home页面tracking，则需要传给tracking：trackingInfo 和 trackButtonClicked：true  */}
                      <Link to="tracking">
                        <img
                          className="App-home-boxes-logo"
                          src={tracking}
                          alt="tracking"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Tracking</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={loc}
                          alt="location"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Location</h3>
                      </Link>
                    </nav>
                  </div>
                </div>

                <br />

                <div>
                  <Form onFinish={this.onFinish}>
                    <Form.Item
                      {...layout}
                      name="orderId"
                      className="App-home-input-tracking"
                    >
                      <Input placeholder="Your Tracking Number" />
                    </Form.Item>

                    <Form.Item className="App-home-input-tracking">
                      <Button type="primary" htmlType="submit">
                        TRACK
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </XL>

            <L>
              <div className="App-home-container-l">
                <h1 className="App-home-title">Robot Delivery</h1>
                <h1 className="App-home-title">SAN FRANCISCO</h1>
                <div>
                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={shipping}
                          alt="shipping"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Rate & Ship</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      {/*如果从home页面tracking，则需要传给tracking：trackingInfo 和 trackButtonClicked：true  */}
                      <Link to="tracking">
                        <img
                          className="App-home-boxes-logo"
                          src={tracking}
                          alt="tracking"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Tracking</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={loc}
                          alt="location"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Location</h3>
                      </Link>
                    </nav>
                  </div>
                </div>

                <br />

                <div>
                  <div>
                    <Form onFinish={this.onFinish}>
                      <Form.Item
                        {...layout}
                        name="orderId"
                        className="App-home-input-tracking"
                      >
                        <Input style={{}} placeholder="Your Tracking Number" />
                      </Form.Item>

                      <Form.Item className="App-home-input-tracking">
                        <Button type="primary" htmlType="submit">
                          TRACK
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </L>

            <M>
              <div className="App-home-container-m">
                <h1 className="App-home-title">Robot Delivery</h1>
                <h1 className="App-home-title">SAN FRANCISCO</h1>
                <div>
                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={shipping}
                          alt="shipping"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Rate & Ship</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      {/*如果从home页面tracking，则需要传给tracking：trackingInfo 和 trackButtonClicked：true  */}
                      <Link to="tracking">
                        <img
                          className="App-home-boxes-logo"
                          src={tracking}
                          alt="tracking"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Tracking</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={loc}
                          alt="location"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Location</h3>
                      </Link>
                    </nav>
                  </div>
                </div>

                <br />

                <div>
                  <Form onFinish={this.onFinish}>
                    <Form.Item
                      {...layout}
                      name="orderId"
                      className="App-home-input-tracking"
                    >
                      <Input
                        style={{ display: "inline-block" }}
                        placeholder="Your Tracking Number"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        style={{ display: "inline-block" }}
                        type="primary"
                        htmlType="submit"
                      >
                        TRACK
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </M>

            <S>
              <div className="App-home-container-s">
                <h1 className="App-home-title">Robot Delivery</h1>
                <h1 className="App-home-title">SAN FRANCISCO</h1>
                <div>
                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={shipping}
                          alt="shipping"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Rate & Ship</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      {/*如果从home页面tracking，则需要传给tracking：trackingInfo 和 trackButtonClicked：true  */}
                      <Link to="tracking">
                        <img
                          className="App-home-boxes-logo"
                          src={tracking}
                          alt="tracking"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Tracking</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={loc}
                          alt="location"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Location</h3>
                      </Link>
                    </nav>
                  </div>
                </div>

                <br />

                <div>
                  <div>
                    <Form onFinish={this.onFinish}>
                      <Form.Item
                        {...layout}
                        name="orderId"
                        className="App-home-input-tracking"
                      >
                        <Input style={{}} placeholder="Your Tracking Number" />
                      </Form.Item>

                      <Form.Item className="App-home-input-tracking">
                        <Button type="primary" htmlType="submit">
                          TRACK
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </S>

            <XS>
              <div className="App-home-container-xs">
                <h1 className="App-home-title">Robot Delivery</h1>
                <h1 className="App-home-title">SAN FRANCISCO</h1>
                <div>
                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={shipping}
                          alt="shipping"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Rate & Ship</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      {/*如果从home页面tracking，则需要传给tracking：trackingInfo 和 trackButtonClicked：true  */}
                      <Link to="tracking">
                        <img
                          className="App-home-boxes-logo"
                          src={tracking}
                          alt="tracking"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Tracking</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={loc}
                          alt="location"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Location</h3>
                      </Link>
                    </nav>
                  </div>
                </div>

                <br />

                <div>
                  <div>
                    <Form onFinish={this.onFinish}>
                      <Form.Item
                        {...layout}
                        name="orderId"
                        className="App-home-input-tracking"
                      >
                        <Input style={{}} placeholder="Your Tracking Number" />
                      </Form.Item>

                      <Form.Item className="App-home-input-tracking">
                        <Button type="primary" htmlType="submit">
                          TRACK
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </XS>

            <XXS>
              <div className="App-home-container-xxs">
                <h1 className="App-home-title">ANYWHERE</h1>
                <h1 className="App-home-title">SAN FRANCISCO</h1>
                <div>
                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={shipping}
                          alt="shipping"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Rate & Ship</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      {/*如果从home页面tracking，则需要传给tracking：trackingInfo 和 trackButtonClicked：true  */}
                      <Link to="tracking">
                        <img
                          className="App-home-boxes-logo"
                          src={tracking}
                          alt="tracking"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Tracking</h3>
                      </Link>
                    </nav>
                  </div>

                  <div className="App-home-boxes">
                    <nav>
                      <Link to="ordering">
                        <img
                          className="App-home-boxes-logo"
                          src={loc}
                          alt="location"
                          height={100}
                        />
                        <h3 className="App-home-boxes-name">Location</h3>
                      </Link>
                    </nav>
                  </div>
                </div>

                <br />

                <div>
                  <div>
                    <Form onFinish={this.onFinish}>
                      <Form.Item
                        {...layout}
                        name="orderId"
                        className="App-home-input-tracking"
                      >
                        <Input style={{}} placeholder="Your Tracking Number" />
                      </Form.Item>

                      <Form.Item className="App-home-input-tracking">
                        <Button type="primary" htmlType="submit">
                          TRACK
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </XXS>
          </Col>
        </Row>

        <Row>
          <Col span={6} />
          <Col span={12} className="App-home-intro">
            <Divider>
              <h1>Introduction</h1>
            </Divider>
            <p>
              We are committed to providing service of the highest quality,
              paying particular attention to working efficiently while keeping
              the lines of communication with our clients clear and consider.
            </p>
            <p>
              Our mission is simple: provide smarter transportation with fewer
              process. To connect people and provide high quality services in a
              timely manner. Our team caters to each project’s specific needs to
              ensure excellence. We hope you’ll find what you’re looking for.
              For more information or genral inquires, feel free to get in touch
              today.
            </p>
          </Col>
          <Col span={6} />
        </Row>
        {/* SZQ: 为什么style里面需要两个花括号 */}
        <div style={{ textAlign: "center" }}>
          <Link to="accountInfo">Account Info</Link>
        </div>
      </div>
    );
  }
}

export default Home;
