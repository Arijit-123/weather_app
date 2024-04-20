import React,{useEffect, useState} from 'react'
import { WEATHER_API_NEW } from '../utils/Constants';
import { WEATHER_API_KEY } from '../utils/Constants';
const useWeatherdata = (lat:string, lon:string) => {
  const [info, setInfo]=useState();
  useEffect(() => {
    fetchweatherdata()
  }, [])

  async function fetchweatherdata(){
const data= await fetch(WEATHER_API_NEW+"lat="+lat+"&lon="+lon+"&appid="+WEATHER_API_KEY);

const data_json=await data.json();
setInfo(data_json);
  }

  console.log("weather data", info);
  return info;
}

export default useWeatherdata
