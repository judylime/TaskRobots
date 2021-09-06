 import React, {Component} from 'react';
import title from "../assets/imgs/title.PNG";
import loginLogo from "../assets/imgs/login-logo.png";
import {Row, Col, Menu, Button} from 'antd';
import {Link} from "react-router-dom";
import {logout} from "../utils"
import GoTo from "./GoTo"
import {useNavigate} from "react-router"


class Top extends Component {
    state = {
        current: 'shipping',
        loggedIn: false
    };

    handleClick = e => { // change key
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
    };

    signoutOnClick = () => {
      this.props.setLoggedIn(false); // 修改全局的state
      this.setState({
        loggedIn: false
      });
    }

    render() {
        return (
            <Row className="App-top">
                <Col span={4} className="App-top-logo">
                    <nav>
                        <Link to="/">
                            <img src={title} alt="title-logo" className="App-top-title-logo"/>
                        </Link>
                    </nav>

                </Col>

                <Col span={4} className="App-top-nav">

                </Col>

                <Col span={4} className="App-top-nav">
                    {/* SZQ：还是不太懂为什么this.current 要加[] 所以什么时候要加{} 什么时候加[] 什么时候不加呢*/}
                    {/* SZQ：以及这个key 和current的作用 不懂 */}
                    <Menu onClick={this.handleClick} selectedKeys={[this.current]} defaultSelectedKeys={[this.current]}
                          mode="horizontal"
                          theme="dark"
                          className="App-top-font">
                        <Menu.Item key="shipping">
                            <Link to="ordering">
                                <h3 className="App-top-font">Shipping</h3>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>

                <Col span={4} className="App-top-nav">
                    <Menu onClick={this.handleClick} selectedKeys={[this.current]} defaultSelectedKeys={[this.current]}
                          mode="horizontal"
                          theme="dark"
                          className="App-top-font">
                        <Menu.Item key="tracking">
                            <nav>
                                <Link to="tracking">
                                    <h3 className="App-top-font">Tracking</h3>
                                </Link>
                            </nav>
                        </Menu.Item>
                    </Menu>
                </Col>

                <Col span={4} className="App-top-nav">
                    <Menu onClick={this.handleClick} selectedKeys={[this.current]} defaultSelectedKeys={[this.current]}
                          mode="horizontal"
                          theme="dark"
                          className="App-top-font">
                        <Menu.Item key="register">
                            <nav>
                                <Link to="register">{/*SZQ：h3 和div有什么区别 如果都可以在css里通过ClassName设置的话*/}
                                    <h3 className="App-top-font">Register</h3>
                                </Link>
                            </nav>
                        </Menu.Item>
                    </Menu>
                </Col>



                <Col>

                </Col>

                <Col span={4} className="App-top-nav">
                    { //如果用户login成功，则页面<Col>中只显示一个logout按键
                        this.props.isLoggedIn
                            ?
                            <Button shape="round" onClick={this.signoutOnClick}>
                                Logout</Button>
                            :                   //如果用户login暂时不成功，持续显示login按键
                            <>
                                <Menu onClick={this.handleClick} selectedKeys={[this.current]} defaultSelectedKeys={[this.current]}
                                      mode="horizontal"
                                      theme="dark"
                                      className="App-top-font">
                                    <Menu.Item key="login">
                                        <nav>
                                            <Link to="login">
                                                <h3 className="App-top-font">Login &nbsp;</h3>
                                                <img className="App-top-login-logo" src={loginLogo} alt="login-logo"/>
                                            </Link>
                                        </nav>
                                    </Menu.Item>
                                </Menu>
                            </>
                    }

                </Col>

            </Row>
        )
    }
}

export default Top;
