import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@utils/Constants'
import CustomText from '@components/ui/CustomText';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { useAuthStore } from '@state/authstore';
import { storage, tokenStorage } from '@state/storage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
type Props ={
    name:string; 
    email:string
}
const DeliveryHeader = ({name,email}:Props) => {
    const {logout} = useAuthStore()
  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}> 
        <Image source={require("@assets/images/delivery_boy.png")} style={styles.img}/>

      </View>
      <View style={styles.infoContainer}> 
        <CustomText variant='h4' fontFamily={Fonts.SemiBold}>
            Hello {name}!
        </CustomText> 
        <CustomText variant='h4' fontFamily={Fonts.Medium}>
            {email}
        </CustomText>

      </View>
      <TouchableOpacity onPress={()=>{
        logout() 
        tokenStorage.clearAll()
        storage.clearAll()
        resetAndNavigate("CustomerLogin") 
        
      }}>
         <Icon name="logout" size={30} color="black"/>
      </TouchableOpacity>
    </View>
  )
}

export default DeliveryHeader

const styles = StyleSheet.create({
    flexRow:{
        justifyContent:'space-between', 
        alignItems:'center', 
        flexDirection:"row", 
        padding:10
    }, 
    imgContainer:{
        padding:4,  
        borderRadius:100, 
        height:60, 
        width:60, 
        overflow:'hidden', 
        backgroundColor:Colors.backgroundSecondary

    }, 
    img:{
        width:"100%", 
        bottom:-8, 
        height:"100%", 
        resizeMode:"contain"
    },
    infoContainer:{
        width:"70%"
    }
})