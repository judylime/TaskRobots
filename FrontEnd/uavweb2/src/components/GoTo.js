import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {Redirect} from "react-router"


// once login is good: use imperative redirect
// https://dev.to/emreloper/react-router-v6-in-two-minutes-2i96 (网页素材名字写反了)
//SZQ：what is the difference between this redirect and Go to?
function GoTo(props) {
    return <Redirect to={props.target} replace />;
}


// 被动方式的Navigate会创建一个新按钮等待用户点击后再跳转
// function passive() {
//   let navigate = useNavigate();
//   function handleClick() {
//     navigate('/home')
//   }
//   return (
//     <div>
//       <button onClick={handleClick}>go home</button>
//     </div>
//   );
// }

export default GoTo;
