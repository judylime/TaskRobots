import React, {Component} from 'react';
import {Row, Col, Divider} from 'antd';
import background from "../assets/imgs/background_small.jpg";
import loc from "../assets/imgs/location.png";
import tracking from "../assets/imgs/tracking.png";
import shipping from "../assets/imgs/shipping.png";
import {Form, Input, Button} from 'antd';


import {Link} from 'react-router-dom';

const layout = {
    wrapperCol: {
        offset: 8,
        span: 8
    }
};

const tailLayout = {
    wrapperCol: {
        offset: 10
    }
};

class ContactUs extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={24} className="App-home-main">
                        <img className="App-home-background" src={background} alt="This is Drone."
                             style={{opacity: 0.4}}/>
                        <div className="App-home-container">

                            <br/>

                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={6}/>
                    <Col span={12} className="App-home-intro">
                        <Divider><h1>About Us</h1></Divider>
                        <p>
                            We are committed to providing service of the highest quality, paying particular attention to
                            working efficiently while keeping the lines of communication with our clients clear and
                            consider.
                        </p>
                        <p>
                            Our mission is simple: provide smarter transportation with fewer process. To connect people
                            and provide high quality services in a timely manner. Our team caters to each project’s
                            specific needs to ensure excellence. We hope you’ll find what you’re looking for. For more
                            information or genral inquires, feel free to get in touch today.
                        </p>
                    </Col>
                    <Col span={6}/>
                </Row>

                <div style={{textAlign: 'center'}}>
                    <Link to="accountInfo">
                        Account Info
                    </Link>
                </div>

            </div>
        );
    }
}

export default ContactUs;