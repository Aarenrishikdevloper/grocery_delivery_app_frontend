import { Alert, Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { deiiveryLogin } from '@service/authService';
import CustomSafeAreaView from '@components/global/customSafeAreaView';
import { screenHeight } from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import Custominput from '@components/ui/custominput';
import Icon from "react-native-vector-icons/Ionicons"
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';
const Deliverylogin = () => {
    const [loading, setloading] = useState(false);
    const [email, setemail] = useState(""); 
    const [password, setpassword] = useState("");
    async function handleAuth() {
       Keyboard.dismiss()
       setloading(true); 
       try {
           await deiiveryLogin(email, password);
         
       } catch (error) {
          Alert.alert("Login Failed")
       }finally{
        setloading(false);
       }
     }
  return (
    <CustomSafeAreaView>
      <ScrollView keyboardShouldPersistTaps={'handled'} keyboardDismissMode={'on-drag'}> 
        <View style={styles.container}> 
          <View style={styles.lottieConatiner}> 
            <LottieView  
             autoPlay 
             loop 
             style={styles.lottie} 
             source={require("@assets/animations/delivery_man.json")}
             hardwareAccelerationAndroid
            /> 
          

          </View>
          <CustomText variant={"h3"} fontFamily={Fonts.Bold}>
               Delivery Partner Portal
            </CustomText>
          <CustomText variant={'h6'} style={styles.text} fontFamily={Fonts.Light}>
            Faster than Flash
          </CustomText>
          <Custominput  
            onChangeText={setemail} 
            value={email}  
            left={
              <Icon  
              name="mail" 
              color={"#F8890E"} 
              style={{marginLeft:10}}  
              size={RFValue(18)}


              />
            } 
            placeholder='Email' 
            inputMode='email' 
            right={false}
          /> 
           <Custominput  
            onChangeText={setpassword}
            value={password}  
            left={
              <Icon  
              name="key-sharp" 
              color={"#F8890E"} 
              style={{marginLeft:10}}  
              size={RFValue(18)}


              />
            } 
            placeholder='password' 
            secureTextEntry
            right={false}
          />
          <CustomButton 
             disabled={email.length === 0 || password.length === 0} 
             onpress={()=>handleAuth()}   
             loading={loading} 
             title='Login'
  
          />

        </View>

      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default Deliverylogin

const styles = StyleSheet.create({
  container:{
    flex:1, 
    padding:20, 
    alignItems:'center'
  }, 
  lottie:{
    height:"100%", 
    width:"100%",
  },
  lottieConatiner:{
    height:screenHeight*0.12,
    width:"100%"
  }, 
  text:{
    marginTop:2, 
    marginBottom:25, 
    opacity:0.8
  }
})