import React, { useState } from 'react'
import { newweather } from '../utils/Common';
import { useLocation, useParams } from 'react-router-dom';
import { Graphweather } from './Graphweather';
import useWeatherdata from '../Customhooks/useWeatherdata';
import { Windgraph } from './Windgraph';

const Weatherapp  = () => {
  
const [udates,setUdates]=useState<string[]>([]);

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

const max_temp=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.main?.temp_max)- 273)});
const min_temp=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.main?.temp_min)- 273)});
const usefuldata=dates?.slice(0,16);
const windspeed=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.wind?.speed))});
const windgust=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.wind?.gust))});
console.log("useful",max_temp);
const winddegree=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.wind?.deg)-273)});

  return (
    <>
    <div>
      this is the new weather page
    <div className=''>  {weatherdata?.city?.name}</div>
    <div>
      {weatherdata?.city?.country}
    </div>
    <p>Today's latest Temperature</p>
<p>Min Temperature </p>
<p>Max Temperature</p>
    <div className=' w-[1000px] h-[1000px]'>
<Graphweather udates={usefuldata} max_temp={max_temp} min_temp={min_temp}/>

<p>All temperatures in 'c</p>


<p> latest Wind Parameters</p>

<Windgraph udates={usefuldata}  windspeed={windspeed} windgust={windgust} winddegree={winddegree}/>

<p>Clouds and Rinfall</p>
<div className='flex'>
{
  weatherdata?.list?.map((item:any)=>(
  <>
  
  <div className='flex-column'>
<div>
{item.weather[0].description}
</div>
<div>
{item.dt_txt}
</div>
</div>

</>
  ))
}
</div>
</div>

<div className='mt-100'>
<iframe src={`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`}  width="600"
        height="450"></iframe>
        </div>
    </div>
    
     
    </>
  )
}

export default Weatherapp
