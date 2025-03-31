import CustomText from "@components/ui/CustomText";
import { useNavigationState } from "@react-navigation/native";
import { SOCKET_URL } from "@service/config";
import { getOrderByid } from "@service/OrderService";
import { useAuthStore } from "@state/authstore";
import { hocStyle } from "@styles/GlobalStyles";
import { Colors, Fonts } from "@utils/Constants";
import { navigate } from "@utils/NavigationUtils";
import { FC, useEffect } from "react";
import { StyleSheet, View , Image, TouchableOpacity, Text} from "react-native";
import { io } from 'socket.io-client';

const withLiveStatus =<P extends object>(WrappedComponent:React.ComponentType<P>):FC<P>=>{
    const WithLiveStatusComponent:FC<P>=(props)=>{ 
        const {currentOrder,setCurrentOrder} = useAuthStore(); 
        const routeName  = useNavigationState(state=>state.routes[state.index]?.name); 
        const fetchOrderdetails = async()=>{
            const data = await getOrderByid(currentOrder?._id as any); 
            setCurrentOrder(data)
        }
        useEffect(()=>{
           const socketInstance = io(SOCKET_URL,{
            transports:['websocket'], 
            withCredentials:true
           })
           socketInstance?.emit('joinRoom',currentOrder?._id) 
           socketInstance?.on('liveTrackingUpdates',(updateOrder)=>{
             fetchOrderdetails(); 
             console.log("RECIEVING LIVE UPDATES 🔴");
           })
           socketInstance.on("orderConfirmed", confirmOrder=>{
             fetchOrderdetails(); 
             console.log("Order Confirmation Live Update 🔴")
           })
           return()=>{
             socketInstance?.disconnect(); 
             console.log("Socket Disconnected ��");
           }
        },[currentOrder])
      return(
         <View style={styles.container}> 
          <WrappedComponent {...props}/> 
           {currentOrder && routeName ==="ProductDashboard" && (
             <View style={[hocStyle.cartContainer,{flexDirection:'row', alignItems:'center'}]}>  
               <View style={styles.flexRow}>
                <View style={styles.img}> 
                    <Image 
                       source={require("@assets/icons/bucket.png")} 
                       style={{width:20, height:20}}
                    />

                </View>
                <View style={{width:"60%"}}> 
              
                    <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                      Order is {currentOrder?.status}
                    </CustomText> 
                    <CustomText variant="h9" fontFamily={Fonts.Medium}> 
                        {currentOrder?.items[0]?.item.name}  {currentOrder?.items.length  > 1 ?`and ${currentOrder?.items.length -1} + items`:""}

                    </CustomText>  
                    
                  </View>
                  
                
               </View> 
               <TouchableOpacity 
                onPress={()=>navigate("LiveTracking")} 
                style={styles.btn} 
                > 
                <CustomText style={{color:Colors.secondary}} variant="h8" fontFamily={Fonts.Medium}>
                    View
                </CustomText>

                </TouchableOpacity>


             </View>
            
           )}

         </View>
      )
    }
    return WithLiveStatusComponent
  }
  export default withLiveStatus  

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