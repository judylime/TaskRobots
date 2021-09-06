import React from 'react';
import {Row, Col, Form, Input, Select, Button, message, Checkbox} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {register} from '../utils';

import {Link} from 'react-router-dom';
import walle from "../assets/imgs/icon-robot.png";
import drone from "../assets/imgs/icon-drone.png";
import GoTo from "./GoTo";

const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
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


class Register extends React.Component {

    state = {
        complete: false,
    }

   onFinish = (data) => {
        register(data)
            .then(() => {
                message.success(`Successfully signed up`);
                this.setState({complete: true});
            }).catch((err) => {
            message.error(err.message);
        })
    }


    render() {
        if (this.state.complete) {
            return <GoTo target='/login' />;
        }
        return (
            <div>
                <br/><br/><br/><br/>
                <Row>
                    <Col span={15} offset={9}>
                        <img src={walle} alt="robot" height={235}/>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <img src={drone} alt="robot" height={235}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col offset={6} span={12} style={{textAlign: "center"}}>
                        <h1>please enter your information</h1>
                    </Col>
                    <br/><br/>
                    <Col offset={4} span={12}>
                        <Form
                            {...(formItemLayout)}
                            name="register"
                            onFinish={this.onFinish}
                            scrollToFirstError
                        >

                            <Form.Item
                                name="lastName"
                                label="Last name"
                                rules={[{required: true, whitespace: true, message: 'Please input your Username!'}]}
                            >
                                <Input prefix={<UserOutlined/>} placeholder="Lastname"/>
                            </Form.Item>

                            <Form.Item
                                name="firstName"
                                label="First name"

                                rules={[{required: true, whitespace: true, message: 'Please input your Username!'}]}
                            >
                                <Input prefix={<UserOutlined/>} placeholder="Firstname"/>
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input placeholder="email"/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
                            </Form.Item>

                            {/*<Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password"/>
                </Form.Item>*/}

                            <Form.Item
                                name="shippingAddress"
                                label="Shipping Address"

                                rules={[{required: true, whitespace: true}]}
                            >
                                <Input placeholder="Pattern: Address, City, State, Zip code"/>
                            </Form.Item>

                            <Form.Item
                                name="billingAddress"
                                label="Billing Address"

                                rules={[{required: true, whitespace: true}]}
                            >
                                <Input placeholder="Pattern: Address, City, State, Zip code"/>
                            </Form.Item>

                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject('Please accept agreement'),
                                    },
                                ]}
                                {...(tailFormItemLayout)}
                            >
                                <Checkbox>
                                    I have read the <a href="">agreement</a>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item {...(tailFormItemLayout)}>
                                <Button type="primary" htmlType="submit" className="register-btn">
                                    Next
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

                <div style={{textAlign: 'center'}}>
                    <Link to="/register2">
                        Register2
                    </Link>
                </div>

                <div style={{textAlign: 'center'}}>
                    <Link to="/register/complete">
                        Register Complete
                    </Link>
                </div>

            </div>
        );
    }
}

export default Register;

