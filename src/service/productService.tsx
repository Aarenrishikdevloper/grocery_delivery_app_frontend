import axios from "axios"
import { BASE_URL } from "./config"

export const getAllCategories =async()=>{
    try {
        const res = await axios.get(`${BASE_URL}/categories`) 
        return res.data
    } catch (error) {
        console.log("error", error); 
        return[]
    }
} 

export const getProductBycategoryId = async(id:string)=>{
    try {
      const res  = await axios.get(`${BASE_URL}/products/${id}`); 
     return res.data;
    } catch (error) {
        console.log("error", error); 
        return[]
    }
} 
export const SeachProduct = async(term:string)=>{
    try {
      const res  = await axios.get(`${BASE_URL}/search?searchterm=${encodeURIComponent(term)}`); 
      return res.data;
    } catch (error) {
        console.log("error", error); 
        return[]
    }
}