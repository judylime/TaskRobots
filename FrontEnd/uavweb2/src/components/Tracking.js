import React from 'react';
import {Row, Col, Divider, Timeline, Descriptions, message, Form, Input, Button} from 'antd';
import {getTrackingDetails} from "../utils";

const layout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 12,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 0
    }
};

class Tracking extends React.Component {
    state = {
        loggedIn: false,
        trackButtonClicked: false,
        orderIdEnteredOnHome: false,
        trackingInfo: {
            orderId: null,
            senderAddress: null,
            receiverAddress: null,
            receiverName: null,
            cardNumber: null,
            size: null,
            weight: null,
            description: null,
            deliveryMethod: null,
            fee: null,
            status: null,
            time: null,
            station: null
        }
    };


    //First step: get the url and parse url parameter as orderID
    componentDidMount() {
        const location = this.props.history.location; // get the current url
        const id = location.search.substr(9, location.search.length); // get the number after "?orderId="
        // e.g.  "?orderId=13" --> substr --> "13" (which is id)
        if (id !== "") {
            getTrackingDetails(id)
                .then(res => {
                    this.setState({
                        trackingInfo: res,
                        trackButtonClicked: true,
                        orderIdEnteredOnHome: true
                    });
                    console.log('got tracking info');
                    console.log(res);
                })
                .catch(err => {
                    console.log('did not get tracking info');
                    message.error(err.message);
                });
        }
    }

    onFinish = (data) => {
        getTrackingDetails(data.orderId)
            .then(res => {
                this.setState({
                    trackingInfo: res,
                    trackButtonClicked: true
                });
                console.log('got tracking info');
                console.log(res);
            })
            .catch(err => {
                console.log('did not get tracking info');
                message.error(err.message);
            });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col offset={6} span={12} className="App-main-tracking">

                        <br/><br/>
                        <Divider><h1> TRACKING A PACKAGE </h1></Divider>
                        <br/><br/>
                    { //如果用户点击在home页面输入了orderId，则不显示tracking页面不继续显示Form
                        this.state.orderIdEnteredOnHome ?
                            <div></div> :
                            (//否则显示Form，让用户在tracking页面输入orderId
                                <>
                                <Form
                                    name="tracking"
                                    onFinish={this.onFinish}
                                    scrollToFirstError
                                >

                                    <Form.Item {...layout}
                                               name="orderId"
                                               label="Order Id: "
                                               rules={[{required: true, whitespace: true, message: 'Please input Order Id!'}]}
                                    >
                                        <Input placeholder="Tracking number"/>
                                    </Form.Item>

                                    <Form.Item {...tailLayout}>
                                        <Button style={{textAlign: 'center'}} type="primary" htmlType="submit"
                                                className="register-btn">
                                            Track
                                        </Button>
                                    </Form.Item>
                                </Form>
                                </>
                            )}
                    </Col>
                </Row>

                <br/><br/>


                <Row>
                    <Col offset={6} span={12}>
                        { //如果用户点击track按键，则显示trackingInfo，否则不显示
                            this.state.trackButtonClicked ?
                                (
                                    <>
                                        <h2 style={{textAlign: 'center'}}> Tracking #
                                            ： {this.state.trackingInfo.orderId}</h2>
                                        <br/><br/>
                                        <br/><br/>
                                        <Timeline mode="left">
                                            <Timeline.Item label="Delivery Order been placed"
                                                           color="green">{Date(this.state.time)}
                                                <br/><br/>
                                            </Timeline.Item>
                                            <Timeline.Item label="Waiting to be picked up"
                                                           color="green">
                                                {Date()}<br/><br/>
                                            </Timeline.Item>
                                            <Timeline.Item label="Package delivering" color="grey">
                                                <br/><br/>
                                            </Timeline.Item>
                                            <Timeline.Item label="Arrived" color="grey">
                                                <br/><br/>
                                            </Timeline.Item>
                                        </Timeline>
                                        <br/><br/>

                                        <Descriptions
                                            title="Delivery Details"
                                            bordered
                                            column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}
                                        >
                                            <Descriptions.Item
                                                label="From">{this.state.trackingInfo.senderAddress}</Descriptions.Item>
                                            <Descriptions.Item
                                                label="To">{this.state.trackingInfo.receiverAddress}</Descriptions.Item>
                                            <Descriptions.Item
                                                label="Receiver Name">{this.state.trackingInfo.receiverName}</Descriptions.Item>
                                            <Descriptions.Item
                                                label="Delivery method">{this.state.trackingInfo.deliveryMethod}</Descriptions.Item>
                                            <Descriptions.Item
                                                label="Size">{this.state.trackingInfo.size}</Descriptions.Item>
                                            <Descriptions.Item
                                                label="Weight">{this.state.trackingInfo.weight}</Descriptions.Item>
                                            <Descriptions.Item
                                                label="Description">{this.state.trackingInfo.description}</Descriptions.Item>
                                            <Descriptions.Item
                                                label="Station">{this.state.trackingInfo.station}</Descriptions.Item>
                                        </Descriptions>
                                    </>
                                ) :
                                <div></div>
                        }

                    </Col>
                </Row>

            </div>
        );
    }
}

export default Tracking;
