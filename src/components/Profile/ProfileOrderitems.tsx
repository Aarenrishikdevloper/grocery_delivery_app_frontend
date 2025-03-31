import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { formatISOToCustom } from '@utils/DateUtils';
type CartItem ={
    _id: string; 
    item:any; 
    count:number;
}
type Order ={
    orderId:string; 
    items:CartItem[]; 
    totalPrice:any;  
    createdAt:string; 
    status :"Confirmed" | "Completed"

}
const ProfileOrderitems = ({item ,index}:{item:Order, index:number}) => {
  return (
    <View style={[styles.container,{borderTopWidth:index ===0?0.7:0}]}> 
      <View style={styles.flexROWBetween}> 
        <CustomText variant='h8' fontFamily={Fonts.Medium}>
            #{item.orderId}
        </CustomText>
        <CustomText variant={'h8'} fontFamily={Fonts.Medium} style={{textTransform:"capitalize"}}> 
            {item.status}

        </CustomText>

      </View> 
      <View style={styles.flexROWBetween}> 
        <View style={{width:"50%"}}> 
            {item?.items?.map((i, idx)=>{
               return(
                <CustomText variant={"h8"} numberOfLines={1} key={idx}> 
                {i?.count} * {i?.item?.name}

                </CustomText>
               )
            })}

        </View>
        <View style={{alignItems:"flex-end"}}>  
            <CustomText variant='h9'>
                {formatISOToCustom(item.createdAt)}
            </CustomText>


        </View>

      </View>
    </View>
  )
}

export default ProfileOrderitems

const styles = StyleSheet.create({
    container:{
        borderBottomWidth:0.7, 
        paddingVertical:15, 
        opacity:0.7
    }, 
    flexROWBetween:{
        justifyContent:"space-between", 
        alignItems:"center", 
        flexDirection:'row'
    }
})