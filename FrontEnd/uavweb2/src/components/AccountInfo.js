import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Button, Descriptions, Divider, Form, message} from "antd";
import {Table, Tag, Space} from 'antd';
import {getAccountInfo, getAllOrders} from "../utils";

const {Column, ColumnGroup} = Table;

// maintain the mapping between color and content
const colors = {
    "small": "orange",
    "medium": "red",
    "large": "purple",
    "robot": "volcano",
    "drone": "blue"
}

const columns = [
    {
        title: 'Sender',
        dataIndex: 'sender',
        key: 'sender',
    },
    {
        title: 'Sender Address',
        dataIndex: 'senderAddress',
        key: 'sender',
    },
    {
        title: 'Receiver',
        dataIndex: 'receiver',
        key: 'receiver',
    },
    {
        title: 'Receiver Address',
        dataIndex: 'receiverAddress',
        key: 'receiverAddress',
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        render: size => (
            <Tag color={colors[size]} key={size}>
                {size.toUpperCase()}
            </Tag>
        )
    },
    {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
    },
    {
        title: 'Delivery',
        dataIndex: 'delivery',
        key: 'delivery',
        render: delivery => (
            <Tag color={colors[delivery]} key={delivery}>
                {delivery.toUpperCase()}
            </Tag>
        )
    }
];

class AccountInfo extends React.Component {

    state = {
        accountInfo: {
            email: null,
            firstName: null,
            lastName: null,
            billingAddress: null,
            shippingAddress: null
        },
        orderData: null
    };

    componentDidMount() {
        // 1. query current logged in user's info
        getAccountInfo()
            .then(res => {
                this.setState({
                    accountInfo: res
                });
                console.log('got account info');
                console.log(res);
            })
            .catch(err => {
                console.log('did not get account info');
                message.error(err.message);
            });

        // 2. query current logged in user's orders.
        getAllOrders()
          .then(res => {
              this.setState({orderData: res});
              console.log(res);
          });
    };


    //Shen: we only need to finish MVP, so skip the splitting part, only keep address as a whole entity.
    //don't know how to split the address string into 3 parts.
    render() {
        return (
            <Row>
                <Col span={6}/>
                <Col span={12}>
                    <br/>
                    <Divider><h1>ACCOUNT INFO</h1></Divider>
                    <Descriptions title="Personal Information" bordered layout="vertical"
                                  labelStyle={{color: "red"}}
                                  column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}>
                        <Descriptions.Item label="First Name">{this.state.accountInfo.firstName}</Descriptions.Item>
                        <Descriptions.Item label="Last Name">{this.state.accountInfo.lastName}</Descriptions.Item>
                        <Descriptions.Item label="Email Address">{this.state.accountInfo.email}</Descriptions.Item>
                    </Descriptions>

                    <Divider/>

                    <Descriptions title="Address" bordered
                                  column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}>
                        <Descriptions.Item label="Address">{this.state.accountInfo.shippingAddress}</Descriptions.Item>
                        {/*<Descriptions.Item label="Address 2">{this.state.accountInfo.shippingAddress}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="City">{this.state.accountInfo.shippingAddress}</Descriptions.Item>*/}
                    </Descriptions>

                    <Divider/>

                    <Descriptions title="Billing Address" bordered
                                  column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}>
                        <Descriptions.Item label="Address">{this.state.accountInfo.billingAddress}</Descriptions.Item>
                        {/*<Descriptions.Item label="Address 2">{this.state.accountInfo.billingAddress}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="City">{this.state.accountInfo.billingAddress}</Descriptions.Item>*/}
                    </Descriptions>


                    <Divider><h1>SERVICES</h1></Divider>


                    <div className="App-accountInfo-send-button">
                        <nav>
                            <Link to='/ordering'>
                                <Button type="primary">
                                    <h1 className="App-accountInfo-send">Send a New Package</h1>
                                </Button>
                            </Link>
                        </nav>
                    </div>

                    <br/>
                    <Divider><h1>ORDER INFO</h1></Divider>

                    <Table columns={columns} dataSource={this.state.orderData}/>

                    <br/><br/><br/><br/>
                </Col>
                <Col span={6}/>
            </Row>
        )
    }
}

export default AccountInfo;

// Sample Data
const data = [
    {
        sender: 'Santa Claus',
        senderAddress: '2901 Sloat Blvd, San Francisco, CA 94132, United States',
        receiver: 'Yaowei Ma',
        receiverAddress: '1310 17th St, San Francisco, CA 94107, United States',
        size: 'large',
        weight: '10 lb',
        delivery: 'robot',
        // description: 'A brand new Desktop.'
    }
];
