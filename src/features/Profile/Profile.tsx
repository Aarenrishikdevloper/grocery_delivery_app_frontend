import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@state/authstore'
import { useCartStore } from '@state/cartstore'
import { fetchCustomerOrders } from '@service/OrderService'
import CustomHeader from '@components/ui/CustomHeader'
import ProfileOrderitems from '@components/Profile/ProfileOrderitems'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import ActionButton from '@components/Profile/ActionButton'
import { storage, tokenStorage } from '@state/storage'
import { resetAndNavigate } from '@utils/NavigationUtils'
import WalletSection from '@components/Profile/WalletSection'

const Profile = () => {
    const [orders, setOrders] = useState([]) 
    const {logout, user} = useAuthStore(); 
    const {clearCart} = useCartStore(); 
    const fetchOrders = async()=>{
         const data = await fetchCustomerOrders(user?._id); 
         setOrders(data);
    }
    useEffect(() => {
      fetchOrders();
    }, [])
    const renderOrders =({item,index}:any)=>{
        return (
            <ProfileOrderitems item={item} index={index}/>
        )
    }
    const renderHeader =()=>{
        return(
            <View>
                <CustomText variant='h3' fontFamily={Fonts.SemiBold}>Your Account</CustomText> 
                <CustomText variant='h2' fontFamily={Fonts.Medium}>{user?.phone}</CustomText> 
                <WalletSection/> 
                
                <CustomText variant='h8' style={styles.informativeText}>YOUR INFORMATION</CustomText> 
                <ActionButton icon='book-outline' label='Address book'/> 
                <ActionButton icon='information-circle-outline' label='About us'/>  
                <ActionButton icon='log-out-outline' label='Logout' onPress={()=>{
                    clearCart()
                    logout() 
                    tokenStorage.clearAll() 
                    //storage.clearAll() 
                    resetAndNavigate("CustomerLogin")
                }}/>
                <CustomText variant='h8' style={styles.pastText}>PAST ORDER</CustomText>
            </View>
        )
    }
  return (
    <View style={styles.container}>
       <CustomHeader title='Profile'/>
       
       <FlatList 
          data={orders} 
          ListHeaderComponent={renderHeader} 
          renderItem={renderOrders} 
          keyExtractor={(item:any)=>item.orderId} 
          contentContainerStyle={styles.scrollViewContainer}
       /> 
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:"#fff"
    }, 
    scrollViewContainer:{
        padding:10, 
        paddingTop:20, 
        paddingBottom:100
    }, 
    informativeText:{
        opacity:0.7, 
        marginBottom:20
    }, 
    pastText:{
        marginVertical:20, 
        opacity:0.7,
    }
})