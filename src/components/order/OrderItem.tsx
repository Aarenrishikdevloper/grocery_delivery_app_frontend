import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@utils/Constants'
import CustomText from '@components/ui/CustomText'
import UniversalAdd from '@components/ui/UniversalAdd'

const OrderItem = ({item}:{item:any}) => {
    var price =  item.item.discountedPrice !==0 ? item.item.discountedPrice :item.item.price
  return (
    <View style={styles.flexRow}>
        <View style={styles.imgContainer}>  
            <Image source={{uri:item?.item?.image}} style={styles.img}/>

        </View>
        <View style={{width:"55%"}}> 
            <CustomText numberOfLines={2} variant='h8' fontFamily={Fonts.Medium}>
                {item.item.name}
            </CustomText>
            <CustomText variant={"h9"}>{item.item.quantity}</CustomText>

        </View>
        <View style={{width:"20%", alignItems:"flex-end"}}> 
            <UniversalAdd item={item.item}/> 
            <CustomText fontFamily={Fonts.Medium} variant='h8' style={{alignItems:'flex-end', marginTop:4}}>
              ₹{item.count * price}
            </CustomText>

        </View>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    img:{
        width:40, 
        height:40, 
        
    }, 
    imgContainer:{
        backgroundColor:Colors.backgroundSecondary, 
        padding:10, 
        borderRadius:15, 
        width:"17%"
    }, 
    flexRow:{
        alignItems:'center', 
        flexDirection:"row", 
        gap:12, 
        paddingHorizontal:10, 
        paddingVertical:12, 
        borderTopWidth:0.6, 
        borderTopColor:Colors.border
    }
})