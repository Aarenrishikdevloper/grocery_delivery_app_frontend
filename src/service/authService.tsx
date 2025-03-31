import axios from 'axios'
import { BASE_URL } from './config'
import { tokenStorage } from '@state/storage'
import { useAuthStore } from '@state/authstore'
import { navigate, resetAndNavigate } from '@utils/NavigationUtils'
import { Alert } from 'react-native'
import { appAxios } from './apiInterceptor'
export const customerLogin = async(phone:any, otp:string)=>{
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`,{phone, otp});
        const{acessToken,RefreshToken, customer} = response.data  
      
        if(response.status === 200){
            tokenStorage.set("acessToken", acessToken) 
            tokenStorage.set("refreshToken", RefreshToken); 
            const{setuser} = useAuthStore.getState(); 
            setuser(customer);
             resetAndNavigate("ProductDashboard");
        }
      
    } catch (error) {
        console.log("login error", error)
    }
} 
export const deiiveryLogin = async(email:string, password:string)=>{
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`,{email, password});
        const{acessToken,RefreshToken, DeliveryPartner} = response.data  
      
        if(response.status === 200){
            tokenStorage.set("acessToken", acessToken) 
            tokenStorage.set("refreshToken", RefreshToken); 
            const{setuser} = useAuthStore.getState(); 
            setuser(DeliveryPartner);
             resetAndNavigate("DeliveryDashboard");
        }
      
    } catch (error) {
        console.log("login error", error)
    }
} 
export const sentotp = async(phone:string)=>{
    try {
        const res =  await axios.post(`${BASE_URL}/customer/otp`,{phone:phone}); 
        if(res.status === 200){
            navigate("Otpscreen", {phone});
        }
    } catch (error) {
        console.log("something went wrong", error)

    }
}
export const refresh_token = async()=>{
    try {
        const refreshToken = tokenStorage.getString('refreshToken'); 
        const response = await axios.post(`${BASE_URL}/refresh-token`,{refreshToken}); 
        const new_acess_token = response.data.acessToken; 
        const new_refesh_token  = response.data.RefreshToken 
        tokenStorage.set("acessToken", new_acess_token) 
        tokenStorage.set("refreshToken", new_refesh_token);  
        return new_acess_token


    } catch (error:any) {
              resetAndNavigate("CustomerLogin");
              tokenStorage.clearAll();
                Alert.alert("Refresh token Error", error)
                 
    }
}
export const refetchUser = async(setUser:any) => {
    try {
        const response = await appAxios.get('/user');
        setUser(response.data.user);
    } catch (error) {
        
    }
}
export const updateUser = async(setUser:any ,data:any) => { 
    try {
        console.log(tokenStorage.getString('acessToken'));
        const response =  await appAxios.patch(`/user`,data, 
          
        ); 
        if(response.data.status === 200) {
            refetchUser(setUser);
            
        }
    } catch (error) {
        console.error("Error updating location", error);

    }

}