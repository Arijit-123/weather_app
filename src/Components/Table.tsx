
import React,{useEffect, useState} from 'react';
import { LOCATION_API, MOD_LOCATION_API } from '../utils/Constants';
import { Link } from 'react-router-dom';
import Weatherapp from './Weatherapp';
import { newweather } from '../utils/Common';
import { LOCATION_API_new } from '../utils/Constants';
import { useParams } from 'react-router-dom';
import useWeatherdata from '../Customhooks/useWeatherdata';
import { useDispatch } from 'react-redux';
import { addInfo } from './weatherdataSlice';
import Recentsuggestion from './Recentsuggestion';

function Table() {

  const dispatch=useDispatch();

const [filres,setFilres]=useState<string>("");
const [suggestions,setSuggestions]=useState<Location[]>();
const[selecteditem,setSelecteditem]=useState(-1);

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
  try{

const data=await fetch(`${MOD_LOCATION_API}${datanum}&timezone=Asia%2FKolkata&refine=cou_name_en%3A%22India%22`);
const newdataone=await data.json();



setLocation(newdataone.results);
  }
  catch(error){
return (
  <>
  <div> Oops Something went wrong</div>
  </>
)
  }
}

useEffect(()=>{setNewdata(location);},[location])



const handleinfiniteScroll=async()=>{

  
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
  

  if(status==1){
  let newfildata=location?.filter((item)=>item?.ascii_name?.toLowerCase().includes(filres?.toLowerCase()));
setSuggestions(newfildata);
  }
}


const setFilresFromDiv = (e: React.MouseEvent<HTMLDivElement>) => {
  const newValue = e.currentTarget.getAttribute('data-value');
  if (newValue) {
      setFilres(newValue);
  }
};

function handlekeyup(e:React.KeyboardEvent<HTMLInputElement>){

if(e.key==="ArrowUp" && selecteditem>0){
setSelecteditem((prev)=>prev-1);
}
else if(e.key==="ArrowDown" && suggestions && selecteditem < (suggestions.length)-1){
setSelecteditem((prev)=>prev+1);
}
else if(e.key==="Enter" && selecteditem >=0){
 
  if (suggestions && suggestions[selecteditem]) {
    setFilres(suggestions[selecteditem].ascii_name);
  
   
    setSuggestions([]);
    const fildatanew=location?.filter((item)=>item?.ascii_name?.toLowerCase().includes(filres?.toLowerCase()));
   
         setNewdata(fildatanew);


}else{
  setNewdata(location);
}
  
}

}



  const weatherData = useWeatherdata(String(lat), String(lon));

  
  
function addrecentinfo(item:Location){

dispatch(addInfo(item));
  
}





  return (
    <div className='w-8/12 ' onClick={()=>setSuggestions([])}>
      <div>

        <div className='flex'>
      <input className='border border-black w-11/12  md:w-10/12 md:p-4 ' value={filres} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleinputandauto(e,1)}  onKeyUp={handlekeyup} ></input>
      <button onClick={()=>{ const fildata=location?.filter((item)=>item?.ascii_name?.toLowerCase().includes(filres?.toLowerCase()));
         setNewdata(fildata);

        

      }}
      className='bg bg-green-500 p-4 w-32'
      >Submit</button>
</div>
<div className='fixed bg-white w-7/12'>
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

<Recentsuggestion/>
<div className='flex justify-center items-center mt-16'>
      <table  >
      <tr className='bg bg-blue-800 h-32'>
    <th className="text text-lg md:text-3xl text-white">City</th>
    <th className="text text-lg md:text-3xl text-white">Country</th>
    <th className="text text-lg md:text-3xl text-white">TimeZone</th>
    <th className="text text-lg md:text-3xl text-white">Lattitude</th>
    <th className="text text-lg md:text-3xl text-white">Longitude</th>
   
  </tr>
{newdata?.map((item:Location)=>{
 
return(
  
  <>
  {   }
  <tr>
   <td className='border border-black  w-14  h-40 md:w-40 md:text md:text-3xl text-center' onClick={()=>addrecentinfo(item)}><Link to=
    {"/weather/"+ item.coordinates.lat+item.coordinates.lon}  target="_blank" rel="noopener noreferrer"> {item.ascii_name}</Link></td>
    <td className='border border-black  w-14  h-40 md:w-40 md:text-3xl'>{item.cou_name_en}</td>
    <td className='border border-black   w-14 h-40  md:w-40 md:flex md:justify-center md:items-center    md:text-3xl'>{item.timezone}</td>
    <td className='border border-black h-40 w-14  md:w-40 md:text-3xl'>{item.coordinates.lat}</td>
    <td className='border border-black h-40 w-14 md:w-40 md:text-3xl'>{item.coordinates.lon}</td>
   
  </tr>
  </>
)
})
}
 
      </table>
      </div>
    </div>
  )
}

export default Table
