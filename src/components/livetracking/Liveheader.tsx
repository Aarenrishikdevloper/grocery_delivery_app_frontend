import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuthStore } from '@state/authstore'
import { navigate } from '@utils/NavigationUtils'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import { useRoute } from '@react-navigation/native'
type Props ={
    type:"Customer" | "Delivery", 
    title:string, 
    secoundTitle:string,

}
const Liveheader = ({title, type,secoundTitle}:Props) => {
    const isCustomer = type === "Customer"
    const {currentOrder,setCurrentOrder} = useAuthStore()
    const route = useRoute();
  return (
     <SafeAreaView style={{paddingTop:16, paddingBottom:16}}>
        <View style={styles.headerContainer}> 
            <Pressable  
            style={styles.backButton} 
            onPress={()=>{
                if(isCustomer){
                    navigate("ProductDashboard")
                    if(currentOrder?.status ==="Completed"){
                        navigate("ProductDashboard")
                        setCurrentOrder(null);
                       
                    }
                }else if(route.name==="deliveryMap"){
                    navigate("DeliveryDashboard")
                }
            }}
            >
              <Icon name='chevron-back' size={RFValue(16)} color={isCustomer?"#fff":"#000"}/>
            </Pressable>
             <CustomText variant='h6' fontFamily={Fonts.Medium} style={isCustomer?styles.titletextWhite:styles.titleTextBlack}>
                {title}
             </CustomText> 
             <CustomText variant='h4' fontFamily={Fonts.SemiBold} style={isCustomer?styles.titletextWhite:styles.titleTextBlack}>
                {secoundTitle}
             </CustomText>
        </View>
     </SafeAreaView>
  )
}

export default Liveheader

const styles = StyleSheet.create({
    headerContainer:{
        justifyContent: 'center', 
        paddingHorizontal:10, 
        alignItems:'center', 
        
    }, 
    backButton:{
        position:'absolute',  
        left:20
    },
    titleTextBlack:{ 
        color:"black"

    }, 
    titletextWhite:{
        color:'white'
    }
})