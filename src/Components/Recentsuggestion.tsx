import React from 'react'
import { Link } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux'
import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({})
export type IRootState = ReturnType<typeof rootReducer>

export interface Location {
    admin1_code: string;
    admin2_code: string;
    admin3_code: string;
    admin4_code: string;
    alternate_names:string[];
    ascii_name: string;
    coordinates:{
      lat:number;
      lon:number;
    };
    cou_name_en:string;
    country_code:string;
    country_code_2:string;
    dem:string;
    elevation:string;
    feature_class:string;
    feature_code:string;
    geoname_id:string;
    label_en:string;
    modification_date:string;
    name:string;
    population:number;
    timezone:string;
  }

function Recentsuggestion() {
    let weatherinfo=useSelector((state: IRootState)=>state.weather);


if(weatherinfo?.length>=8){
  weatherinfo=weatherinfo.slice(weatherinfo?.length - 8);
}

    
  return (
    <>
    {weatherinfo.length?<div className='mb-8 flex justify-center items-center mt-6 font-bold text-2xl'>Recently Viewed</div>:"" }
    <div className='flex  justify-center items-center'>
    {weatherinfo.map((item:Location)=>
      <div className='shadow-lg md:w-22 md:h-20 mr-4'>
       
<p><Link to=
    {"/weather/"+ item.coordinates.lat+item.coordinates.lon}  target="_blank" rel="noopener noreferrer">{item.ascii_name}</Link></p>
<p className='hidden md:block'>{item.cou_name_en}</p>
<p className='hidden md:block'>{item.timezone}</p>

    </div>
    )
}
</div>
    </>

  )
}

export default Recentsuggestion
