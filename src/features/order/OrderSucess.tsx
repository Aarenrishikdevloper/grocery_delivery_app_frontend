import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { screenWidth } from '@utils/Scaling'
import { Colors, Fonts } from '@utils/Constants'
import { useAuthStore } from '@state/authstore'
import LottieView from 'lottie-react-native'
import CustomText from '@components/ui/CustomText'
import { replace } from '@utils/NavigationUtils'

const OrderSucess = () => {
  const {user} = useAuthStore()
  useEffect(() => {
    const timeoutId = setTimeout(()=>{
      replace("LiveTracking")
    },2300)
   return()=>clearTimeout(timeoutId)
    
  }, []);
  
  return (
    <View style={styles.container}>
      <LottieView  
       source={require("@assets/animations/confirm.json")} 
       autoPlay  
       loop={false} 
       speed={1} 
       style={styles.lottieView} 
       enableMergePathsAndroidForKitKatAndAbove  
       hardwareAccelerationAndroid
      /> 
      <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={styles.orderPlacedText}>
        ORDER PLACED
      </CustomText> 
      <View style={styles.deliveryContainer}> 
        <CustomText variant='h4' fontFamily={Fonts.SemiBold} style={styles.deliveryText}> 
          Delivering to Home

        </CustomText>  

         
      </View>
      <CustomText style={styles.adressText} fontFamily={Fonts.Medium}>
        {user?.address || "SomeWhere, Knowwhere 😊"}
      </CustomText>
    </View>
  )
}

export default OrderSucess

const styles = StyleSheet.create({
  container:{
    justifyContent:'center', 
    alignItems:'center', 
    flex:1,
  }, 
  lottieView:{
    width:screenWidth * 0.5, 
    height:150
  }, 
  orderPlacedText:{
    opacity:0.4
  }, 
  deliveryContainer:{
    borderBottomWidth:2, 
    paddingBottom:4, 
    borderColor:Colors.secondary
  }, 
  deliveryText:{
    marginTop:15, 
    borderColor:Colors.text
  }, 
  adressText:{
    opacity:0.5, 
    width:'80%', 
    textAlign:"center", 
    marginTop:10,
  }

})