import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Components/Table';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Weatherapp from './Components/Weatherapp';
import { newweather } from './utils/Common';


const approuter=createBrowserRouter([{
  path:'/',
  element:<Table/>,
  },

{
  path:'/weather/:locid',
  element:<Weatherapp/>,
}
]);
function App() {
  return (
    <div className="text text-blue-800 flex justify-center items-center">
      <RouterProvider router={approuter}/>
     

    </div>
  );
}

export default App;
