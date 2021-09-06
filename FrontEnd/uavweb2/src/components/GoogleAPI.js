/*本文主要提供3个函数,用于实现与google app API交互的方法：
1. getLatAndLong：转换地址->经纬度
2. getDistance：输入寄件地址 & 收件地址，来计算无人机需要的 直 线 距 离
3. getRoute：输入寄件地址 & 收件地址，来计算机器人在陆地上的 真正路线距离
*/
import { GOOGLE_API_KEY, GEOCODING_BASE, GOOGLE_DISTANCE_MATRIX_API } from "../constants";
import axios from "axios";
//Google API KEY:  AIzaSyB53y4-6k1lvgsORyVe1T28zH82VkpFmrA  feel free to use



//1. Convert address to latitude & longitude.
export const getLatAndLong = (address) => {
    //处理地址，格式化
    var addressStr = address;
    var formattedAddress = addressStr.replace(" ", "+");

    // Geocoding API 起始地址
    const urlFrom = `${GEOCODING_BASE}${formattedAddress}&key=${GOOGLE_API_KEY}`;
    console.log('Google api url: ', urlFrom);

    //get latitude and longitude
    var location = null;
    axios.get(urlFrom)
        .then(response => {
            console.log("google api's response", response.data);
            //console.log('location: ', response.data.results[0].geometry.location);
            location = response.data.results[0].geometry.location;
            const { lat, lng } = location;
            console.log('Latitude & Longitude: ', lat, lng);
            return location;
        })
        .catch(error => {
            console.log('err in fetch latitude and longitude -> ', error);
        })
};

//2. Drone's distance calculation:无人机路线的距离 (直线)
export const getDistance = (addressFrom, addressTo) => {
  //处理地址，格式化
  var formattedAddrFrom = addressFrom.replace(" ", "+");
  var formattedAddrTo = addressTo.replace(" ", "+");

  // Geocoding API 起始地址
  const urlFrom = `${GEOCODING_BASE}${formattedAddrFrom}&key=${GOOGLE_API_KEY}`;
  console.log('Drone From url: ', urlFrom);

  // Geocoding API 目的地址
  const urlTo = `${GEOCODING_BASE}${formattedAddrTo}&key=${GOOGLE_API_KEY}`;
  console.log('Drone To url: ', urlTo);

  var location1 = null;

  //拿到经纬度，并计算距离，这里要注意：是在cb function内异步，所以用axios实现同步操作
    axios.get(urlFrom)
      .then(response => {
        //console.log("Sender, google api drone - response.data", response.data);
        //console.log('Sender location: ', response.data.results[0].geometry.location);
        location1 = response.data.results[0].geometry.location;
        const { lat, lng } = location1;
        console.log('Drone Sender Latitude & Longitude: ', lat, lng);
        var lat1 = lat;
        var lng1 = lng;

          var location2 = null;
          axios.get(urlTo)
              .then(response => {
                  //console.log("Receiver, google api drone - response.data", response.data)
                  //console.log('Receiver location: ', response.data.results[0].geometry.location);
                  location2 = response.data.results[0].geometry.location;
                  const { lat, lng } = location2;
                  console.log('Drone Receiver Latitude & Longitude: ', lat, lng);
                  var lat2 = lat;
                  var lng2 = lng;
                  console.log('Drone distance is: ', getStraightDistance(lat1, lng1, lat2, lng2));
                  return getStraightDistance(lat1, lng1, lat2, lng2);//单位是米
              })
              .catch(error => {
                  console.log('Drone To, err in fetch latitude and longitude -> ', error);
              })

      })
      .catch(error => {
        console.log('Drone From, err in fetch latitude and longitude -> ', error);
      })
/*
    //--------------------距离的另一种计算方式，包含返回单位的不同----------------------------
  // 从返回数据中获取经纬度
  // 根据公式计算距离:单位是mile
   var theta = lng2 - lng1;
   var dist = Math.sin(degreeToRadius(lat1)) * Math.sin(degreeToRadius(lat2))
            + Math.cos(degreeToRadius(lat1)) * Math.cos(degreeToRadius(lat2)) * Math.cos(degreeToRadius(theta));
  dist = Math.acos(dist);
  dist = dist * (180.0 / Math.PI);//radiusToDegree(radius) = radius * (180.0 / Math.PI)
  var miles = dist * 60 * 1.1515;

  // 根据单位参数，返回数据----------目前暂时不考虑
   var unit;
  if (unit == "K") {
    return Math.round(miles * 1.609344, 2).' km';//单位是km
  } else if(unit == "M") {
    return Math.round(miles * 1609.344, 2).' meters';//单位是m
  } else {
    return Math.round(miles, 2).' miles';//单位是mile
  }
*/
}

//可以测试这个url，是能够拿到json数据的。
//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=765+hampden+ave,+saint+paul,+MN&destinations=1016+Washington+Ave,+Minneapolis,+MN&key=AIzaSyB53y4-6k1lvgsORyVe1T28zH82VkpFmrA
//3. Machine's distance calculation: 陆地路线的距离
export const getRoute = (addressFrom, addressTo) => {
    //处理地址，格式化
    // var formattedAddrFrom = addressFrom.replace(" ", "+");
    // var formattedAddrTo = addressTo.replace(" ", "+");
    //
    // const url = `${GOOGLE_DISTANCE_MATRIX_API}${formattedAddrFrom}&destinations=${formattedAddrTo}&key=${GOOGLE_API_KEY}`;
    // console.log('Machines calculation url: ', url);

    //？？？？？？？？？遇到跨域问题？？？？？？？？？？
    // axios.get(url, {
    //     headers: {'Access-Control-Allow-Origin': '*'},
    //     proxy: {
    //        host: '104.236.174.88',
    //        port: 3128
    //     },}
    //     )
    //     .then(response => {
    //         console.log("Machines, response.data", response.data);
    //         console.log('Machines distance: ', response.data.rows[0].elements[0].distance);
    //
    //     })
    //     .catch(error => {
    //         console.log('To, err in fetch latitude and longitude -> ', error);
    //     })

  return 2;
};

//可以测试这个url，是能够拿到json数据的。
//https://maps.googleapis.com/maps/api/geocode/json?address=765+hampden+ave,+saint+paul,+MN&key=AIzaSyB53y4-6k1lvgsORyVe1T28zH82VkpFmrA
//Helper function 1
function degreeToRadius(degree) {
  return (degree * Math.PI) / 180;
}

//Helper function 2
//This is the function to calculate distance between 2 pairs of coordinates on map.
//由于地球是一个近乎标准的椭球体，所以我们以0度经线为基准，根据地球表面任意2点的经纬度就可以酸楚这两点间的地表距离。忽略误差
export const getStraightDistance = (lat1, lng1, lat2, lng2) => {//单位是米
  //lat为纬度, lng为经度, 一定不要弄错
  // const EARTH_MEAN_RADIUS_KM = 6371.009;//地球半径
  // const EARTH_MEAN_DIAMETER = EARTH_MEAN_RADIUS_KM * 2;//地球直径

  //计算纬度
  var radLat1 = degreeToRadius(lat1);
  var radLat2 = degreeToRadius(lat2);
  //计算经度
  var radLong1 = degreeToRadius(lng1);
  var radLong2 = degreeToRadius(lng2);
  var diffX = radLat1 - radLat2; //计算纬度差
  var diffY = radLong1 - radLong2; //计算经度差
  //计算正弦和余弦
  var hsinX = Math.sin(diffX * 0.5);
  var hsinY = Math.sin(diffY * 0.5);

  //计算方式1：
  // var latCenterRad_cos = Math.cos(lat1 * (Math.PI / 180));
  // var h = hsinX * hsinX + (latCenterRad_cos * Math.cos(radLat2) * hsinY * hsinY);
  // return (EARTH_MEAN_DIAMETER * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));

  //计算方式2：
  //var dis = 6378137 * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(diffX / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(diffY / 2), 2)));

  //计算方式3：
  var dis =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(hsinX, 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(hsinY, 2)
      )
    );
  return dis * 6378137;
};

// export const calcRoute = (startLatLng, endLatLng) => {
//   var request = {
//     origin: startLatLng,
//     destination: endLatLng,
//     travelMode: "DRIVING",
//   };
//   directionsService.route(request, function (response, status) {
//     if (status == "OK") {
//       directionsRenderer.setDirections(response);
//     }
//   });
// };
