import React, {Component} from 'react';
import {Row, Col, Space} from 'antd';
import {Link} from 'react-router-dom';


class Bottom extends Component {
    render() {
        return (
            <Row>
                <Col span={4} className="App-bottom">
                    <h3>AutoExpress ©2021</h3>
                </Col>

                <Col span={4} />
                <Col span={4} />
                <Col span={4} />
                <Col span={2} />

                <Col span={2} className="App-bottom">
                    <Link to='contactus'>
                        <h4>CONTACT US</h4>
                    </Link>
                </Col>

                <Col span={2} className="App-bottom">
                    <h4>TERMS OF USE</h4>
                </Col>

                <Col span={2} className="App-bottom">
                    <h4>PRIVACY</h4>
                </Col>


            </Row>
        );
    };
}

export default Bottom;