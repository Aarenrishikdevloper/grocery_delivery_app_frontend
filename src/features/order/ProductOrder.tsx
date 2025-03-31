import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import { Colors, Fonts } from '@utils/Constants'
import OrderList from '@components/order/OrderList'
import CustomText from '@components/ui/CustomText'
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from 'react-native-responsive-fontsize'
import BillDetails from '@components/order/BillDetails'
import { useCartStore } from '@state/cartstore'
import { useAuthStore } from '@state/authstore'
import { hocStyle } from '@styles/GlobalStyles'
import ArrowButton from '@components/ui/ArrowButton'
import { createOrder, createTransaction } from '@service/OrderService'
import { navigate, replace, resetAndNavigate } from '@utils/NavigationUtils'
const ProductOrder = () => {
  const {getTotalprice,cart, clearCart} = useCartStore()
  const totalItemPrice = getTotalprice()
  const {user, setCurrentOrder,currentOrder} =useAuthStore()
  const [loading, setloading] = useState(false) 
  const handleOrder =async()=>{
      if(currentOrder !== null){
        Alert.alert("Let Your first order to be delivered");  
        return
      } 
      const formattedData = cart.map(item=>({
        id:item._id, 
        item:item._id, 
        count:item.count
      }))
      if(formattedData.length === 0){
         Alert.alert("Add any Items to place order"); 
         return;
      } 
      setloading(true)
      const userId = user?._id
     try {
      const price  = Number(totalItemPrice) + 16
      const data = await createTransaction(price, user?._id)
      console.log(data);
      if(data){
          const response = await createOrder(formattedData, Number(totalItemPrice),userId,  data?.order_id, data?.key, user?.phone); 
          if(response){
            setCurrentOrder(response)
            clearCart()
           
             
            replace("OrderSucess",{...data})
      }
      
       //if(data != null){
         
       }else{
         Alert.alert("Failed to place order");
       }
     } catch (error) {
       console.log("error", error); 
       Alert.alert("Failed to place order");
     }finally{
        setloading(false)
     }
  }
  return (
    <View style={styles.container}>
       <CustomHeader title='Checkout'/>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
          <OrderList/>
          <View style={styles.flexRowBetween}> 
           <View style={styles.flexRow}>
           <Image source={require("@assets/icons/coupon.png")} style={{width:25, height:25}}/> 
           <CustomText variant='h8' fontFamily={Fonts.SemiBold}>Use Coupons</CustomText>
           </View>
           <Icon name='chevron-right' size={RFValue(16)} color={Colors.text}/>
          </View>
          <BillDetails totalItemPrice={totalItemPrice}/>
          <View style={styles.flexRowBetween}> 
            <View>
              <CustomText variant='h8' fontFamily={Fonts.SemiBold}> 
                 Cancellation Policy

              </CustomText> 
              <CustomText variant='h9' fontFamily={Fonts.SemiBold} style={{marginTop:4, opacity:0.4}}>
                Orders Can't be camcelled onced packed for delivery,In case of unexpected delays, refund will be provided if applicable
              </CustomText>
            </View>
             
          </View>
       </ScrollView>
       <View style={hocStyle.cartContainer}> 
         <View style={styles.absolutecontainer}>  
          <View style={styles.adressContainer}> 
            <View style={styles.adressContainer}>
               <View style={styles.flexRow}> 
                <Image source={require("@assets/icons/home.png")} style={{width:20,height:20}}/>  
                <View style={{width:"75%"}}> 
                  <CustomText variant='h8' fontFamily={Fonts.Medium}>Delivering to Home</CustomText> 
                  <CustomText variant='h9' numberOfLines={2} style={{opacity:0.6}} > 
                    {user?.address}
                     
                  </CustomText>

                </View>
          
               </View>
               </View>
               <TouchableOpacity>
                 <CustomText variant='h8' style={{color:Colors.secondary}} fontFamily={Fonts.Medium}>
                    Change
                 </CustomText>
               </TouchableOpacity>
            </View>
            <View style={styles.paymentGateway}> 
              <View style={{width:"30%"}}> 
                <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Regular}>
                   💵 PAY USING
                </CustomText>
                <CustomText fontFamily={Fonts.Regular} variant='h9' style={{marginTop:2}}>
                    As You Like
                </CustomText>
                 
              
             
              

            </View> 
            <View style={{width:"70%"}}>
                 <ArrowButton  
                  loading={loading} 
                  price={totalItemPrice}  
                  title="Place order" 
                  onPress ={handleOrder}
                  
                 />
                </View>

          </View>

         </View>
         
       
    </View>
    </View>
  )
}

export default ProductOrder

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:"#fff"
    }, 
    scrollContainer:{
        backgroundColor:Colors.backgroundSecondary, 
        padding:10, 
        paddingBottom:250
    },
    flexRow:{
      alignItems:'center', 
      flexDirection:'row', 
      gap:10
    }, 
    flexRowBetween:{
      backgroundColor:"#fff", 
      alignItems:'center', 
      justifyContent:"space-between", 
      padding:10, 
      flexDirection:'row', 
      borderRadius:15,
    }, 
    paymentGateway:{
      flexDirection:'row', 
      justifyContent:'space-between', 
      alignItems:'center', 
      paddingLeft:14, 
      paddingTop:10, 
      borderTopWidth:0.7, 
      borderColor:Colors.border
    }, 
    adressContainer:{
      justifyContent:'space-between', 
      alignItems:"center", 
      flexDirection:'row', 
      paddingHorizontal:10, 
      paddingBottom:10, 
      
    }, 
    absolutecontainer:{
      marginVertical:15, 
      marginBottom:Platform.OS ==="ios"?30:10
    }
})