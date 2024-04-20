import React from 'react'
import { newweather } from '../utils/Common';
import { useLocation, useParams } from 'react-router-dom';
import { Graphweather } from './Graphweather';
import useWeatherdata from '../Customhooks/useWeatherdata';
const Weatherapp  = () => {
  
 interface newweather{
 city:{
  name:string;
  country:string;
 };
list:{
  dt_txt:string;
}
 }
  const location = useLocation();
  const {locid}=useParams();
let lat="";
let lon="";
  console.log("locid", locid);
if(locid?.length== 15){
    lat=locid?.substring(0, 8);
   lon=locid?.substring(8);
   console.log("lat",lat);
   console.log("lon",lon);
}
else{
   lat=(locid ?? "")?.substring(0, 8);
   lon=(locid ?? "")?.substring(8);
}

console.log("lat",lat);
console.log("lon",lon);
   const weatherdata:any= useWeatherdata(lat || "", lon || "") ;
   console.log("weatherappnew", weatherdata);

const dates=weatherdata?.list?.map((item:any)=> item?.dt_txt);
console.log("dates",dates);
  return (
    <div>
      this is the new weather page
    <div className=''>  {weatherdata?.city?.name}</div>
    <div>
      {weatherdata?.city?.country}
    </div>
<Graphweather />
    </div>
  )
}

export default Weatherapp
