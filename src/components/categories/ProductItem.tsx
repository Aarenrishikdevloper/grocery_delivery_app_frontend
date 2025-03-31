import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@utils/Constants'
import { screenHeight } from '@utils/Scaling';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import UniversalAdd from '@components/ui/UniversalAdd';

const ProductItem = ({item,index}:{item:any,index:any}) => {
    const isSecoundColumn = index%2 !==0;
   return(
    <View style={[styles.container,{marginRight:isSecoundColumn?10:0}]}> 
    <View style={styles.imageContainer}>
       <Image source={{uri:item?.image}} style={styles.image}/>
    </View>
    <View style={styles.content}> 
        <View style={styles.flexRow}>
           <Image source={require("@assets/icons/clock.png")} style={styles.clockIcon}/>
           <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Medium}>
              15 MINS
           </CustomText>
        </View>
        <CustomText fontFamily={Fonts.Medium} variant={'h8'} numberOfLines={2} style={{marginVertical:4}}> 
            {item.name}
        </CustomText> 
        <View style={styles.priceContainer}> 
            <View>
                <CustomText variant='h8' fontFamily={Fonts.Medium} style={{textDecorationLine:item.discountedPrice?"line-through":"none"}}>
                  ₹{item.price}
                </CustomText>
              {item.discountedPrice != 0 &&item.discountedPrice != null && <CustomText fontFamily={Fonts.Medium} variant={"h8"} style={{opacity:0.8}}>₹{item.discountedPrice}</CustomText>}
            </View>
            <UniversalAdd item={item}/>

        </View>

    </View>
    </View>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    container:{
        width:"45%", 
        borderRadius:10, 
        backgroundColor:"#fff",  
        marginBottom:10, 
        marginLeft:10, 
        overflow:"hidden"

    }, 
    imageContainer:{
        height:screenHeight*0.13, 
        width:"100%", 
        justifyContent:"center", 
        alignItems:"center", 
        padding:12, 

    }, 
    image:{
        width:"100%", 
        height:"100%", 
        resizeMode:"contain", 
        aspectRatio:1/1
    }, 
    content:{
        flex:1, 
        paddingHorizontal:10
    }, 
    flexRow:{
        flexDirection:"row", 
        padding:2, 
        borderRadius:4, 
        alignItems:'center', 
        gap:2, 
        backgroundColor:Colors.backgroundSecondary, 
        alignSelf:"flex-start"
    }, 
    clockIcon:{
        height:15,
        width:15,
    }, 
    priceContainer:{
        flexDirection:"row", 
        alignItems:"center",  
        justifyContent:'space-between', 
        paddingVertical:10, 
        marginTop:'auto'
    }


})