/*本文件根据jupiter项目的前端进行的modify，大家可以根据需要进行更改*/
// If you don't want to host your server code and client code together, you can
// pay AWS to host your server with HTTPS then config the api url endpoints like below
// const SERVER_ORIGIN = '<Your server's url>';
import axios from "axios"
import {message} from "antd"

const SERVER_ORIGIN = 'http://localhost:8080';

const loginUrl = `${SERVER_ORIGIN}/login`;

// Ma: the content type should be x-www-form-urlencoded.

export const login = (credential) => {
    const {username, password} = credential;
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    return fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlencoded,
        redirect: 'follow',
        credentials: 'include' //SZQ: means cookies available？
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to log in');
        }
        // chaining fetch
        getAccountInfo().then((data) => {
            message.success(`Welcome back, ${data.firstName + " " + data.lastName}`);
        })
    }).catch((err) => {
        console.error(err, "If you see a error here, contact mayaowei.study@gmail.com immediately.")
    })
}

const registerUrl = `${SERVER_ORIGIN}/register`;

export const register = (data) => {
    return fetch(registerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.status !== 201) { // Ma: 201 created.
            throw Error('Fail to register');
        }
    })
}

const logoutUrl = `${SERVER_ORIGIN}/logout`;

export const logout = (data) => {
    return fetch(logoutUrl, {
        method: 'GET',
        credentials: "include"
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to logout');
        }
    })
}

const getTrackingDetailsUrl = `${SERVER_ORIGIN}/tracking?orderId=`;

export const getTrackingDetails = (orderId) => {
    return fetch(`${getTrackingDetailsUrl}${orderId}`, {
        method: 'GET',
        redirect: 'follow'
    }).then((response) => {
            if (response.status !== 200) {
                throw Error('Fail to track the order');
            }

            return response.json();
        })
}

const makeAPaymentUrl = `${SERVER_ORIGIN}/payment`;//this is following "addFavoriteItem" in jupiter project

//allPaymentInfo: sender_address, receiver_address, receiver_name, card_number, package_size, weight, description, delivery_method, fee
export const makeAPayment = (allPaymentInfo) => {
    return fetch(makeAPaymentUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', //does this credentials include cardNumber or just username and password. Ma: no, it's a flag tells browser that you can receive or send cookies.
        body: JSON.stringify(allPaymentInfo)
    }).then((response) => {
        if (response.status !== 201) {
            throw Error('Fail to make a payment');
        }
    })
}
//Shen: api目前能够成功拿到后端返回的数据，但是返回数据的格式有error,所以无法对返回的数据destruct。error如下：
// "Failed to execute 'json' on 'Response': body stream already read.
// Ma: the method will get the [currently logged in user's info], so it's unnecessary to provide credentials.
const getAccountInfoUrl = `${SERVER_ORIGIN}/accountinfo`
//SZQ-a: how to get the current user info?
export const getAccountInfo = () => {
    return fetch(getAccountInfoUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',},
        redirect: 'follow',
        credentials: 'include'
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to get account information');
        }
        console.log('got fetched data from backend');
        console.log('fetched response is: ');
        console.log(response);

        var data = response.json();
        if (data === null) {
            message.warning("Please login");
        }
        return data;
    })
}

const getAllOrdersUrl = `${SERVER_ORIGIN}/orders`
export const getAllOrders = () => {
    return fetch(getAllOrdersUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',},
        redirect: 'follow',
        credentials: 'include'
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to get orders information');
        }
        let data = response.json();
        if (data === null) {
            message.warning("Please login");
        }
        console.log(data);
        return data;
    })
}
