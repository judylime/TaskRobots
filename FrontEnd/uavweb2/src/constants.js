/*This file defines constants that can be globally used in this project*/

// export const GOOGLE_API_KEY = "AIzaSyB53y4-6k1lvgsORyVe1T28zH82VkpFmrA";
export const GOOGLE_API_KEY = "AIzaSyC71ITh_3ZLZ8FONu8HU_qDAF5X4uVIlu4";

/*这个是google geocoding提供的地址转换成经纬度的api url的base*/
export const GEOCODING_BASE = "https://maps.googleapis.com/maps/api/geocode/json?address=";

/*这个是google api，通过 distance matrix api来输入起始地 & 目的地来计算距离*/
export const GOOGLE_DISTANCE_MATRIX_API = "http://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=";