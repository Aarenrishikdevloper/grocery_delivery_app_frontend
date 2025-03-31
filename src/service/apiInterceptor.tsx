import axios from "axios";  
import { BASE_URL } from "./config";
import { tokenStorage } from "@state/storage";
import { refresh_token } from "./authService";
import { Alert } from "react-native";
export const appAxios = axios.create({
    baseURL:BASE_URL
}) 
appAxios.interceptors.request.use(async config =>{
    const acesss_token = tokenStorage.getString("acessToken"); 
    console.log(acesss_token);
    if(acesss_token){
        config.headers.Authorization =`Bearer ${acesss_token}`; 

    }
    return config;
})  
appAxios.interceptors.response.use(
    response => response, 
    async error=>{
        if(error.response && error.response.status === 401){
            try {
                const newAcessToken = await refresh_token(); 
                if(newAcessToken){
                    error.config.headers.Authorization = `Bearer ${newAcessToken}`; 
                    return axios(error.config)
                }
            } catch (error) {
                console.log("error refreshing token")
            }
        }
        if(error.response && error.response.status != 401){
            const errMessage = error.response.data.msg ||"something went wrong";
            Alert.alert(errMessage)
        }
        return Promise.reject(error);
    }
)