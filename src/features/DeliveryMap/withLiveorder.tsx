import CustomText from "@components/ui/CustomText";
import Geolocation from "@react-native-community/geolocation";
import { sendLiveOrderUpdate } from "@service/OrderService";
import { useAuthStore } from "@state/authstore";
import { hocStyle } from "@styles/GlobalStyles";
import { Colors, Fonts } from "@utils/Constants";
import { navigate } from "@utils/NavigationUtils";
import { FC, useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";


 const withLiveOrder =<P extends object>(WrappedComponent:React.ComponentType<P>):FC<P>=>{
   const WithLiveOrderComponent:FC<P>=(props)=>{
    const{currentOrder,user} = useAuthStore() 
    const [location, setlocation] = useState<any>(null); 
    useEffect(() => {
       if(currentOrder){
          const watchId =Geolocation.watchPosition(
            async(position)=>{
                const {latitude,longitude} = position.coords; 
                setlocation({latitude, longitude})
            }, 
            (err)=>console.log(err), 
            {enableHighAccuracy:true, distanceFilter:10}

          )
          return ()=>Geolocation.clearWatch(watchId)
       }
       
      
    }, [])
    useEffect(() => {
        async function SendLiveUpdate() {
            if (currentOrder?.deliveryPartner?._id === user?.id && currentOrder?.status !== 'Completed' && currentOrder?.status !== 'Cancelled' && currentOrder?.status === "Confirmed") {
                if (currentOrder?._id) {
                    await sendLiveOrderUpdate(currentOrder._id, location, currentOrder.status);
                    
                }
            }
        }
        SendLiveUpdate();
    }, []);
    
    return(
      <View style={styles.container}> 
      <WrappedComponent {...props}/>
        {currentOrder?.status  === "Confirmed" || currentOrder?.status === "arriving"  && (
            <View style={[hocStyle.cartContainer, {flexDirection:'row', alignItems:'center', paddingHorizontal:20}]}>
               <View style={styles.flexRow}> 
                <View style={styles.img}>
                    < Image source={require("@assets/icons/bucket.png")} style={{width:20, height:20}} />
                </View> 
                <View style={{width:"62%"}}> 
                    <CustomText variant="h4" fontFamily={Fonts.SemiBold}> 
                        #{currentOrder?.orderId}

                    </CustomText>
                    <CustomText variant="h9" fontFamily={Fonts.Medium}>
                        {currentOrder?.deliverylocation?.address}{" "}
                    </CustomText>

                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>{
                    navigate("deliveryMap",{...currentOrder})
                }}> 
                    <CustomText variant="h8" style={{color:Colors.secondary}}>
                        Continue
                    </CustomText>

                </TouchableOpacity>

               </View>
            </View>
        )}
      </View>
    )
   }
   return WithLiveOrderComponent
 }
  const styles = StyleSheet.create({
     container:{
         flex:1
     }, 
     flexRow:{
         flexDirection:'row', 
         alignItems:'center', 
         gap:10, 
         borderRadius:15, 
         marginBottom:15, 
         paddingVertical:10, 
         padding:10
     }, 
     img:{
         backgroundColor:Colors.backgroundSecondary, 
         borderRadius:100, 
         padding:10, 
         justifyContent:'center', 
         alignItems:'center'
     }, 
     btn:{
         paddingHorizontal:10, 
         paddingVertical:2, 
         borderWidth:0.7, 
         borderColor:Colors.secondary, 
         borderRadius:5,
     }
   })
   export default withLiveOrder