import React, { useState } from 'react'
import { newweather } from '../utils/Common';
import { useLocation, useParams } from 'react-router-dom';
import { Graphweather } from './Graphweather';
import useWeatherdata from '../Customhooks/useWeatherdata';
import { Windgraph } from './Windgraph';

const Weatherapp  = () => {
  
const [udates,setUdates]=useState<string[]>([]);
const [unit,setUnit]=useState<string>("");
 interface newweather{
 city:{
  name:string;
  country:string;
 };
list:{
  dt_txt:string[];
}

 }
  const location = useLocation();
  const {locid}=useParams();
let lat="";
let lon="";
 
if(locid?.length== 15){
    lat=locid?.substring(0, 8);
   lon=locid?.substring(8);
   
}
else{
   lat=(locid ?? "")?.substring(0, 8);
   lon=(locid ?? "")?.substring(8);
}


   const weatherdata:any= useWeatherdata(lat || "", lon || "");


const dates=weatherdata?.list?.map((item:any)=> item?.dt_txt);


const max_temp=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.main?.temp_max)- 273.15)});
const min_temp=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.main?.temp_min)- 273.15)});
const max_temp_kelvin=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.main?.temp_max))});
const min_temp_kelvin=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.main?.temp_min))});
const max_temp_fehren=weatherdata?.list?.map((item:any)=> {return (((Math.trunc((item?.main?.temp_max)-273.15)*1.8)+32))});
const min_temp_fehren=weatherdata?.list?.map((item:any)=> {return (((Math.trunc((item?.main?.temp_max)-273.15)*1.8)+32))});

const usefuldata=dates?.slice(0,16);
const windspeed=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.wind?.speed))});
const windgust=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.wind?.gust))});

const winddegree=weatherdata?.list?.map((item:any)=> {return Math.trunc((item?.wind?.deg)-273)});

let newmax_temp=[];
let newmin_temp=[];
if(unit=="Kelvin"){
newmax_temp=max_temp_kelvin;
newmin_temp=min_temp_kelvin;
}

if(unit=="Centigrade"){
  newmax_temp=max_temp;
  newmin_temp=min_temp;
}

if(unit=="Fahreinheit"){
  newmax_temp=max_temp_fehren;
  newmin_temp=min_temp_fehren;
}
  return (
    <>
    <div className='flex flex-col justify-center items-center bg bg-blue-200'>
     
    <div className='text text-3xl font-bold'>  {weatherdata?.city?.name}</div>
    <p className='mt-16 text-xl font-semibold'>Clouds and Rinfall</p>
<div className='flex mt-6 mb-16'>
{
  weatherdata?.list?.slice(0, 10)?.map((item:any)=>(
  <>
  
  <div className='flex-column'>
    <div className='w-16 h-14'>
      {item.weather[0].description=="clear sky"?
      <img className='w-16 h-14' src='/fewclouds.jpg'></img>:""}
       {item.weather[0].description=="scattered clouds"?
      <img className='w-16 h-14' src='/scatteredclouds.jpg'></img>:""}
        {item.weather[0].description=="few clouds"?
      <img className='w-16 h-14' src='/fewclouds.jpg'></img>:""}
  {item.weather[0].description=="overcast clouds"?
      <img className='w-16 h-14' src='/overcastcloud.jpg'></img>:""}
       {item.weather[0].description=="broken clouds"?
      <img className='w-16 h-14' src='/brokencloud.jpg'></img>:""}
       {item.weather[0].description=="light rain"?
      <img className='w-16 h-14' src='/lightrain.jpg'></img>:""}
    </div>
<div className='font-bold'>
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
<p className='text text-2xl'>Map Location</p>
    <div className='w-full h-[100px]   md:w-[800px] md:h-[250px]'>
<iframe src={`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`}  width="800"
        height="320"></iframe>
        </div>
    <div className='mt-72 md:mt-20'>
    <p className='text-2xl'>Today's latest Temperature</p>
<p className='font font-bold mt-4'>Min Temperature in °C: {max_temp && max_temp[0]} °C</p>
<p className='font font-bold'>Max Temperature in °C: {min_temp && min_temp[0]} °C</p>
    </div>
    
<button>Kelvin</button>
    <div className='w-[450px] h-[350px] md:w-[1000px] md:h-[650px] bg bg-white'>
<button className='mr-2 mt-1 ml-2 p-2 bg bg-green-500 rounded-lg' onClick={()=>setUnit("Kelvin")}>Kelvin</button>
<button className='mr-2 mt-1 ml-2 p-2 bg-green-500 rounded-lg' onClick={()=>setUnit("Centigrade")}>Centigrade</button>
<button className='mr-2 mt-1 ml-2  p-2 bg-green-500 rounded-lg' onClick={()=>setUnit("Fahreinheit")}>Fahreinheit</button>
<p className='ml-4'>Click on the desired unit button</p>

<Graphweather udates={usefuldata} max_temp={newmax_temp} min_temp={newmin_temp}/>
</div>



<p className='mt-16'> latest Wind Parameters</p>
<div  className='w-[500px] h-[350px] md:w-[1000px] md:h-[550px] bg bg-white'>
<Windgraph udates={usefuldata}  windspeed={windspeed} windgust={windgust} winddegree={winddegree}/>
</div>

</div>


   
    
     
    </>
  )
}

export default Weatherapp
