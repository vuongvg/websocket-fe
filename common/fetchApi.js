import axios from "axios";
// import { url } from "./url";

const url = "http://localhost:5001/api";
//  const url = "https://websocket-yrjr.onrender.com/api"; 

export const fetchApiLogin = async (data) => {
    try {
       const result = await axios.post(`${url}/auth/login`, data);
       return result.data;
    } catch (error) {
       console.log(`  ~ error fetchApiLogin`, error);
       return { error: error.response.data };
    }
 };

 export const fetchApiRegister = async (data) => {
   try {
      const result = await axios.post(`${url}/auth/register`, data);
      return result.data;
   } catch (error) {
      console.log(`  ~ error fetchApiRegister`, error);
      return { error: error.response.data };
   }
};