import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import { FeColorMatrix } from 'react-native-svg';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { formatISOToCustom } from '@utils/DateUtils';
import { navigate } from '@utils/NavigationUtils';
type CartItem ={
    _id:string|number; 
    item:any; 
    count:number;
} 
type order ={
    orderId:string; 
    items:CartItem[]; 
    deliverylocation:any; 
    totalPrice:number; 
    createdAt:string; 
    status:"Completed"|"Pending"
}
function getStatusColor(status: string) {
    switch (status) {
        case "Pending":
            return "#281745";
        case "Confirmed":
            return "#007bff";
        case "Completed":
            return "#17a2b8";
        case "Cancelled":
            return "#dc3545";
        case "arriving": // Add this case to handle the "arriving" status
            return "#ffc107"; // Assign a color for "arriving" (e.g., yellow)
        default:
            return "#6c757d"; // Default color for unknown statuses
    }
}
const DeliveryOrderItem = ({item,index}:{item:order, index:number}) => {
  return (
    <View style={styles.container}>
       <View style={styles.flexRowContainer}> 
         <CustomText variant='h8' fontFamily={Fonts.Medium}>
            #{item.orderId}
         </CustomText>
         <View style={styles.statusContainer}> 
            <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={[styles.statusContainer,{color:getStatusColor(item.status)}]}>
                {item.status}
            </CustomText>

         </View>
       </View>
       <View style={styles.itemContainer}> 
        {item.items.slice(0,2).map((i,idx)=>{
            return(
                < CustomText variant='h8' numberOfLines={1} key={idx}>
                    {i.count} x {i.item.name}
                </CustomText>
            )
        })}

       </View>
       <View style={[styles.flexRowContainer, styles.addressContainer]}> 
         <View style={styles.adressTextContainer}> 
            <CustomText variant='h8' numberOfLines={1}>
                {item?.deliverylocation.address}
            </CustomText>
            <CustomText style={styles.dateText}>{formatISOToCustom(item?.createdAt)}</CustomText>

         </View>
         <TouchableOpacity style={styles.iconContainer} onPress={()=>{navigate("deliveryMap",{...item})}}>
            <Icon name='arrow-right-circle' size={RFValue(24)} color={Colors.primary}/>
         </TouchableOpacity>
         
       </View>
    </View>
  )
}

export default DeliveryOrderItem

const styles = StyleSheet.create({
    container:{
           borderWidth:0.7, 
           padding:10, 
           borderColor:Colors.border, 
           borderRadius:10, 
           paddingVertical:15, 
           marginVertical:10, 
           backgroundColor:"white"
    },
    flexRowContainer:{
           justifyContent:'space-between', 
           alignItems:'center', 
           flexDirection:'row'
    },
    statusContainer:{
        paddingVertical:4, 
        paddingHorizontal:10, 
        borderRadius:20,
    },
    statusText:{
        textTransform:"capitalize", 
        color:"white"
    }, 
    itemContainer:{
        width:"50%", 
        marginTop:10
    }, 
    addressContainer:{
       marginTop:10
    },
    adressTextContainer:{
        width:"78%"
    }, 
    dateText:{
        marginTop:2, 
        fontSize:RFValue(8)
    }, 
    iconContainer:{
        alignItems:'flex-end'
    }
})

