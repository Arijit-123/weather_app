import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: Array<Location> = [
   
]
export const weatherdataSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addInfo: (state, action: PayloadAction<Location>) => {
      state.push(action.payload);
    },
  },
});
export const { addInfo } =
  weatherdataSlice.actions;

export default weatherdataSlice.reducer;