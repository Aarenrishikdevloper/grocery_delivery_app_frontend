import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Colors } from '@utils/Constants'
import Logo from "@assets/images/logo.jpeg"
import { screenHeight, screenWidth } from '@utils/Scaling'
import { navigate, resetAndNavigate } from '@utils/NavigationUtils'
import Icons from "react-native-vector-icons/MaterialCommunityIcons" 
import GeoLocation from "@react-native-community/geolocation"
import { useAuthStore } from '@state/authstore'
import { tokenStorage } from '@state/storage' 
import {jwtDecode} from "jwt-decode"
import { refetchUser, refresh_token } from '@service/authService'

GeoLocation.setRNConfiguration({
  skipPermissionRequests:false, 
  authorizationLevel:"always", 
  enableBackgroundLocationUpdates:true, 
  locationProvider:"auto"
})
interface DecodedType{
  exp:number
}
const SplashScreen:FC = () => { 
  const {user, setuser} = useAuthStore() 
  const tokencheck =async()=>{
    const acessToken = tokenStorage.getString("acessToken") as string; 
    const refreshToken = tokenStorage.getString("refreshToken") as string; 
    console.log(refreshToken);
    console.log(acessToken);
    if(acessToken){
       const  decodedAcessToken = jwtDecode<DecodedType>(acessToken); 
       const decodedRefreshToken =jwtDecode<DecodedType>(refreshToken); 
       const currentTime = Date.now() /1000; 
       if(decodedRefreshToken?.exp < currentTime){
        resetAndNavigate("CustomerLogin");
        Alert.alert("Session Expired, Please login again")
        return false; 

       }
       if(decodedAcessToken?.exp < currentTime){
         try {
            refresh_token(); 
            await refetchUser(setuser);  


         } catch (error) {
                 console.log(error); 
                 Alert.alert("There was eror refershing token, Please login again")
         }
       }
       if(user?.role === "Customer"){
        
        resetAndNavigate("ProductDashboard")
       }else{
        resetAndNavigate("DeliveryDashboard");
       }
       return true;

    }
        
    resetAndNavigate("CustomerLogin"); 
    return false;
    
  }
  useEffect(() => {
    const navigateUser=async()=>{
      try {
       GeoLocation.requestAuthorization(); 
       tokencheck();
      } catch (error) {
        Alert.alert("You need Location service to give you better Shopping experience");
      }
    }
   const timeoutId = setTimeout(navigateUser, 1000) 
   return ()=>clearTimeout(timeoutId);
    
  }, [])
  
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.primary,
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center',
  }, 
  logoImage:{
    height:screenHeight*0.4, 
    width:screenWidth*0.4, 
    resizeMode:'contain'
  }
})
export default SplashScreen