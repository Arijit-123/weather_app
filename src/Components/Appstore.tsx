import { configureStore,  createSlice } from "@reduxjs/toolkit";
import weatherdataReducer from "./weatherdataSlice"

const appStore=configureStore({
  reducer:{
   weather: weatherdataReducer,
 
  },
});

export default appStore;
