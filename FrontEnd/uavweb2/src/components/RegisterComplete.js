import {Row, Col, Button} from 'antd';
import React from 'react';
import {Link} from "react-router-dom";
import congrats from "../assets/imgs/congrats.png"

class RegisterComplete extends React.Component {
    render() {
        return (
            <div>

                <br/><br/><br/><br/>
                <Row>
                    <Col offset={6} span={15}>
                        <img src={congrats} alt="robot" height={200}/>
                    </Col>
                </Row>
                <br/><br/><br/><br/>

                <Row>
                    <Col offset={6} span={12}>
                        <h1 style={{textAlign: 'left'}}> Dear UAV: </h1>
                        <br/>
                        <h1 style={{textAlign: 'center'}}> Congratulations! You've registered an account!</h1>
                        <br/>
                        <br/>
                        <div style={{textAlign: 'center'}}>
                            <Button>
                                <Link to="/login">
                                    Login to your account
                                </Link>
                            </Button>
                        </div>

                        <br/><br/><br/>

                        <div style={{textAlign: 'center'}}>
                                <Link to="/register">
                                    Register
                                </Link>
                        </div>

                        <div style={{textAlign: 'center'}}>
                            <Link to="/register2">
                                Register2
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RegisterComplete;