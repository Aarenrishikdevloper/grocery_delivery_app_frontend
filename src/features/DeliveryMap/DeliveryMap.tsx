import { Alert, BackHandler, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@state/authstore'
import { confirmorder, getOrderByid, sendLiveOrderUpdate } from '@service/OrderService';
import { Colors, Fonts } from '@utils/Constants';
import Liveheader from '@components/livetracking/Liveheader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import OrderSummary from '@components/livetracking/OrderSummary';
import DeliveryDetails from '@components/livetracking/DeliveryDetails';
import LiveMap from '@components/livetracking/LiveMap';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { goBack } from '@utils/NavigationUtils';
import { hocStyle } from '@styles/GlobalStyles';
import CustomButton from '@components/ui/CustomButton';
import reactNativeConfig from '../../../react-native.config';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("Location permission granted");
        return true;
      } else {
        console.log("Location permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true; // iOS handles permissions differently
  }
};

const DeliveryMap = () => {
    const user = useAuthStore(state=>state.user)
  const { setCurrentOrder,currentOrder} = useAuthStore(); 
  const [orderdata,setorderData] = useState<any>(null); 
  const [location, setLocation] = useState<any>(null); 
  const route  = useRoute()
  const orderdetails =route?.params as Record<string,any> 
  const [loading , setloading] = useState(false);
  const watchIdRef = useRef<any|null>(null)
  const fetchedOrderDetails =async()=>{
    setloading(true);
    try {
      const data = await getOrderByid(orderdetails?._id as any); 
      setorderData(data); 
      setCurrentOrder(data);
    } catch (error) {
       console.log(error)
    }finally{
      setloading(false);
    }
   

  }
  useEffect(() => {
     fetchedOrderDetails();
  }, [])
 
  const updateUser = () => {
    Geolocation.getCurrentPosition(
      position=>{
        const {latitude,longitude} = position.coords 
        setLocation({latitude,longitude})

      }, 
      err=>console.log(err),
      {
        enableHighAccuracy:false, 
        timeout:15000
      }
    )
    watchIdRef.current = Geolocation.watchPosition(
      position=>{
        const{longitude,latitude} = position.coords; 
        setLocation({latitude,longitude})
        console.log("New Location"+location); 

      },
      (err)=>console.log("Error watching position:", err),
      {
        enableHighAccuracy:true, 
        distanceFilter:10, 
        timeout:15000
      }

    )
    console.log(location)
   }
   
  useEffect(()=>{
       updateUser();
       return () => {
        if (watchIdRef.current !== null) {
          Geolocation.clearWatch(watchIdRef.current);
        }
      };
  },[])


  
  let msg = "Start this order" 
  //let time = "Arriving in 10 minutes"
  if(orderdata?.status === "Confirmed"){
     msg = "Grab your order" 
     //time ="Arriving in 8 minutes"
  }
  else if( orderdata?.status == "arriving"){
    msg = "Complete Your Order"  
    //time ="Arriving in 6 minutes"
  } 
  else if(orderdata?.status === "Completed"){
    msg = "Your mileStone" 
    //time = "Fastest Delivery "
  }
  else if(orderdata?.status !== "Pending"){
    msg = "You Misses it" 
    //time = "Fastest Delivery "
  }
   const acceptOrder =async()=>{
    const data = await confirmorder(orderdata?._id, location);
    if(data){
      setCurrentOrder(data);
      Alert.alert("😊 Order accepted Deliver your pacckage"); 

    }else{
      Alert.alert("🔴 There was an Error");
    }
    fetchedOrderDetails()
  }
   const orderPickedUp =async()=>{
    const data = await sendLiveOrderUpdate(orderdata?._id, location, "arriving");
    if(data){
      setCurrentOrder(data);
      Alert.alert("🚲 Lets delivery It as soon as Possible"); 

    }else{
      Alert.alert("🔴 Something Went Wrong")
    }
  }
  const orderDelivered=async()=>{
    const data = await sendLiveOrderUpdate(orderdata?._id, location, "Completed");
    if(data){
      setCurrentOrder(null);
      goBack()
      Alert.alert("😊 You Unlock a new Milestone"); 

    }else{
      Alert.alert("🔴 Something Went Wrong")
    }
  }
  useEffect(() => {
    async function SendLiveUpdate() {
        if (orderdata?.deliveryPartner?._id === user?.id && orderdata?.status !== 'Completed' && orderdata?.status !== 'Cancelled' && orderdata?.status === "Confirmed") {
            if (orderdata?._id) {
                await sendLiveOrderUpdate(orderdata._id, location, orderdata.status);
                fetchedOrderDetails();
            }
        }
    }
    SendLiveUpdate();
}, [requestLocationPermission]);
  return (
    <>
   
    <View style={styles.container}>
    
       <Liveheader  title={msg} secoundTitle={"Delivery in 10 mins"} type={'Delivery'}/>
       
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
        {currentOrder !== null &&  <LiveMap 
             pickupLocation={currentOrder?.pickuplocation || 0}   
             deliveryLocation={currentOrder?.deliverylocation || 0} 
             deliveryPersonLocation={currentOrder?.deliveryPersonLocation || 0} 
             hasAccepted={orderdata?.status === "Comfirmed"  } 
             haspickedUp ={currentOrder?.status === "arriving" }
          />}
          
            <DeliveryDetails details={orderdata?.customer}/>
            <OrderSummary order={orderdata}/>
            
           
            <View style={[styles.flexRow, {marginTop:10, marginBottom:10}]}> 
              <View style={styles.iconContainer}> 
                <Icon name='cards-heart-outline' color={Colors.disabled} size={RFValue(20)}/>  
               
                 

              </View> 
            <View style={{width:"82%"}}> 
              <CustomText variant='h7' fontFamily={Fonts.SemiBold}> 
              Your Delivery, Your Way – Track & Manage with Ease!

              </CustomText> 
              <CustomText variant='h9' fontFamily={Fonts.Medium}> 
              Real-Time Updates, Flexible Options, and Seamless Control at Your Fingertips!

              </CustomText>

            </View>

            </View>
            <CustomText fontFamily={Fonts.SemiBold} variant='h6' style={{opacity:0.6, marginTop:20}}>
                 Rishik Kashyap X Grocery Delivery App
            </CustomText>
        </ScrollView> 
        {currentOrder?.status !="Completed" && currentOrder?.status !="Canceled" &&(
          <View style={[hocStyle.cartContainer, {padding:10}]}> 
          {currentOrder?.status == 'Pending' &&(
             <CustomButton 
              disabled={false} 
              title='Accept Order' 
              onpress={acceptOrder} 
              loading={false}
             />
          )} 
           {currentOrder?.status == 'Confirmed'  &&(
             <CustomButton 
              disabled={false} 
              title='Order Picked Up' 
              onpress={orderPickedUp} 
              loading={false}
             />
          )}
           {currentOrder?.status == 'arriving' && (
             <CustomButton 
              disabled={false} 
              title='Order Delivered' 
              onpress={orderDelivered} 
              loading={false}
             />
          )}

          </View>
        )}
    </View>
    
    </>
  )
}

export default DeliveryMap

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor:Colors.primary
  }, 
  scrollContent:{
    paddingBottom:150, 
    backgroundColor:Colors.backgroundSecondary, 
    padding:15
  },  
  flexRow:{
    flexDirection:'row', 
    alignItems: 'center', 
    gap:10,  
    width:"100%",  
    borderRadius:15, 
    marginTop:15, 
    paddingVertical:10, 
    backgroundColor:"#fff", 
    padding:10, 
    borderBottomWidth:0.7, 
    borderColor:Colors.border

  }, 
  iconContainer:{
    backgroundColor:Colors.backgroundSecondary, 
    borderRadius:100, 
    padding:10, 
    justifyContent:'center', 
    alignItems:'center',
  }

})