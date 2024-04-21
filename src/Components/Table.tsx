
import React,{useEffect, useState} from 'react';
import { LOCATION_API } from '../utils/Constants';
import { Link } from 'react-router-dom';
import Weatherapp from './Weatherapp';
import { newweather } from '../utils/Common';
import { LOCATION_API_new } from '../utils/Constants';
import { useParams } from 'react-router-dom';
function Table() {

const [filres,setFilres]=useState<string>("");
const [suggestions,setSuggestions]=useState<Location[]>();
const[selecteditem,setSelecteditem]=useState(-1);

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



  interface Location {
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

  
  const [location, setLocation]=useState<Location[]>([]);
const [newdata,setNewdata]=useState<Location[]>();
const [wedetail,setWedetail]=useState<newweather>();
const [datanum,setDatanum]=useState<number>(4);
useEffect(() => {
  locationdata()
}, [datanum]);


async function locationdata(){
// const data=await fetch(LOCATION_API+`${datanum}&timezone=Asia%2FKolkata&refine=cou_name_en%3A%22India%22`);
const data=await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${datanum}&timezone=Asia%2FKolkata&refine=cou_name_en%3A%22India%22`);
const newdataone=await data.json();
console.log("newdata", newdataone.results);
// setLocation(newdata.results);

setLocation(newdataone.results);

}

useEffect(()=>{setNewdata(location);},[location])

console.log("location",location);
console.log("newonedata",newdata);
console.log("newres",filres);

const handleinfiniteScroll=async()=>{

  console.log("scrollheight"+ document.documentElement.scrollHeight);
  console.log("innerheight"+window.innerHeight);
  console.log("scrolltop"+document.documentElement.scrollTop);
  try{
    if((window.innerHeight+  document.documentElement.scrollTop) +1 >=  document.documentElement.scrollHeight){

setDatanum((prev)=>prev+4);
    }


  }
  catch(error){

  }
}


useEffect(() => {
window.addEventListener("scroll", handleinfiniteScroll);
return()=>window.removeEventListener("scroll", handleinfiniteScroll);
}, [])




function handleinputandauto(e: React.ChangeEvent<HTMLInputElement>,status:number){
  setFilres(e.target.value);
  // let OPTION=location.map((item)=>{return {name:item?.ascii_name}});
  if(status==1){
  let newfildata=location?.filter((item)=>item?.ascii_name?.toLowerCase().includes(filres?.toLowerCase()));
setSuggestions(newfildata);
  }
}
console.log("filtered suggestions", suggestions);

const setFilresFromDiv = (e: React.MouseEvent<HTMLDivElement>) => {
  const newValue = e.currentTarget.getAttribute('data-value');
  if (newValue) {
      setFilres(newValue);
  }
};

function handlekeyup(e:React.KeyboardEvent<HTMLInputElement>){
console.log("events",e.key);

console.log("newevent",e.currentTarget.value)
if(e.key==="ArrowUp" && selecteditem>0){
setSelecteditem((prev)=>prev-1);
}
else if(e.key==="ArrowDown" && suggestions && selecteditem < (suggestions.length)-1){
setSelecteditem((prev)=>prev+1);
}
else if(e.key==="Enter" && selecteditem >=0){
 
  if (suggestions && suggestions[selecteditem]) {
    setFilres(suggestions[selecteditem].ascii_name);
    console.log("filresmenu",filres);
    setSuggestions([]);
    const fildatanew=location?.filter((item)=>item?.ascii_name?.toLowerCase().includes(filres?.toLowerCase()));
    console.log("fildatanew",fildatanew);
         setNewdata(fildatanew);


}else{
  setNewdata(location);
}
  
}
console.log("setitem",suggestions && suggestions[selecteditem]);
}


  return (
    <div className='w-11/12' onClick={()=>setSuggestions([])}>
      <div>
      <input className='border border-black w-11/12' value={filres} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleinputandauto(e,1)}  onKeyUp={handlekeyup}></input>
      <button onClick={()=>{ const fildata=location?.filter((item)=>item?.ascii_name?.toLowerCase().includes(filres?.toLowerCase()));
         setNewdata(fildata);
      console.log("filbutton",newdata);
        

      }}
      className='bg bg-green-500'
      >Submit</button>

<div className='fixed bg-white w-11/12'>
  <ul  className='w-11/12' >
    {
      suggestions?.map((item,index)=>
<>

<li    
            value={filres} key={index} onClick={(e)=>setFilres(e.currentTarget.textContent || '')} className={selecteditem==index?'py-2 shadow-sm bg-gray-100':'py-2 shadow-sm' }>
  {item.ascii_name}
</li>

</>
   ) }
  </ul>
</div>
</div>
<div className='flex justify-center items-center'>
      <table >
      <tr>
    <th>City</th>
    <th>Country</th>
    <th>TimeZone</th>
    <th>Lattitude</th>
    <th>Longitude</th>
  </tr>
{newdata?.map((item:Location)=>(
  <>
  <tr>
   <td className='border border-black  h-40 w-40 text text-3xl' onClick={()=>setWedetail({lat:item.coordinates.lat, lon:item.coordinates.lon})}><Link to=
    {"/weather/"+ item.coordinates.lat+item.coordinates.lon}state={{lat:item.coordinates.lat, lon:item.coordinates.lon }}  target="_blank" rel="noopener noreferrer"> {item.ascii_name}</Link></td>
    <td className='border border-black  h-40 w-40 text-3xl'>{item.cou_name_en}</td>
    <td className='border border-black flex justify-center items-center  h-40 w-40 text-3xl'>{item.timezone}</td>
    <td className='border border-black  h-40 w-40 text-3xl'>{item.coordinates.lat}</td>
    <td className='border border-black  h-40 w-40 text-3xl'>{item.coordinates.lon}</td>
  </tr>
  </>
  ))
}
 
      </table>
      </div>
    </div>
  )
}

export default Table
