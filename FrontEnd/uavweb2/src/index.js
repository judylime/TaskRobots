import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//SZ-a: where do we apply index.css file?? 只要import进来就好， class 会根据名字找到style 并应用。
ReactDOM.render(
    <App/>,
    document.getElementById('root')//SZ：render(from where, to where) root is the only ID in index.html file
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
