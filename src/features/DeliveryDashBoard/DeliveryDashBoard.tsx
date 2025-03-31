import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@utils/Constants'
import { useAuthStore } from '@state/authstore'
import DeliveryHeader from '@components/delivery/DeliveryHeader'
import TabBar from '@components/delivery/TabBar'
import Geolocation from '@react-native-community/geolocation'
import { reverseGeocode } from '@service/mapservice'
import { fetchOrders } from '@service/OrderService'
import DeliveryOrderItem from '@components/delivery/DeliveryOrderItem'

import CustomText from '@components/ui/CustomText'
import withLiveOrder from '@features/DeliveryMap/withLiveorder'

const DeliveryDashBoard = () => {
  const {user,setuser} = useAuthStore() 
  const [loading,setloading] = useState(true)  
  const[data,setdata] = useState<any[]>([])  
  const [selectedTab, setSelectedTab] = useState<"Pending"|"Completed">("Pending")
  const [refreshing,setrefreshing] = useState(false)
  const upDateUser =()=>{
    Geolocation.getCurrentPosition(
      position=>{
        const {latitude, longitude} = position.coords 
        reverseGeocode(latitude,longitude ,setuser)
      }, 
      err=>console.log(err), 
      {
        enableHighAccuracy:false, 
        timeout:15000
      }
    )
  }
  useEffect(() => {
     upDateUser()
  }, [])
  const fetchorder = async()=>{
    setdata([]); 
    setrefreshing(true); 
    setloading(true); 
    
    const data = await fetchOrders(selectedTab,user?._id, user?.branch); 
    setdata(data); 
    setrefreshing(false); 
    setloading(false);
  }
  useEffect(()=>{
    fetchorder()
  },[selectedTab])
  const renderItem =({item,index}:any)=>{
    return(
      <DeliveryOrderItem index={index} item={item}/>
    )
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email}/>
      </SafeAreaView>
      <View style={styles.subcontainer}> 
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab}/>
        <FlatList 
         data={data} 
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={async()=>await fetchorder()}/>
         } 
         ListEmptyComponent={()=>{
           if(loading){
             return (
              <View style={styles.center}>
                <ActivityIndicator color={Colors.secondary} size={"small"}/>
              </View>
             )
           }
           return(
            <View style={styles.center}>
             <CustomText>No Orders found</CustomText>
             </View>
           )
         }}
         renderItem={renderItem} 
         keyExtractor={item=>item.orderId} 
         contentContainerStyle={styles.flatlistContainer}
        />
      </View>
    </View>
  )
}

export default withLiveOrder( DeliveryDashBoard)

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.primary, 
    flex:1
  },
  subcontainer:{
    backgroundColor:Colors.backgroundSecondary, 
    flex:1, 
    padding:6,
  },
  flatlistContainer:{
    padding:2,
  },
  center:{
    flex:1, 
    marginTop:60, 
    justifyContent:'center', 
    alignItems:'center',
  }

})