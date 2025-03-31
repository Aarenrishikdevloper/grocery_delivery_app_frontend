import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants'
import CustomText from '@components/ui/CustomText'
import Icon from "react-native-vector-icons/MaterialIcons"
import { RFValue } from 'react-native-responsive-fontsize'
const ReportItem:FC<{
  iconName:string; 
  underline?:boolean; 
  title:string; 
  price:number
}>=({iconName,underline, title,price})=>{ 
  return(
    <View style={[styles.flexRowBetween, {marginBottom:10}]}> 
    <View style={styles.flexRow}> 
      <Icon name={iconName} style={{opacity:0.7}} size={RFValue(12)} color={Colors.text}/>
      <CustomText style={{textDecorationLine:underline?"underline":"none", textDecorationStyle:"dashed"}}>
        {title}
      </CustomText>
    </View>
     <CustomText variant='h8'>₹{price}</CustomText>
    </View>
  )

}
const BillDetails = ({ totalItemPrice}:{totalItemPrice:any}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>Bill Details</CustomText>
      <View style={styles.billcontainer}> 
         <ReportItem iconName='article' title='Item total' price={totalItemPrice}/> 
         <ReportItem iconName='pedal-bike' title='Delivery Charge' price={10}/>  
         <ReportItem iconName='shopping-bag' title='Handling Charge' price={4}/>  
         <ReportItem iconName='cloudy-snowing' title='Surge Charge' price={2}/> 
         

         

      </View>
      <View style={[styles.flexRowBetween,{marginBottom:15}]}> 
        <CustomText variant='h7' style={styles.text} fontFamily={Fonts.SemiBold}> 
           Grand Total
        </CustomText>
        <CustomText style={styles.text} fontFamily={Fonts.SemiBold}> 
              ₹{totalItemPrice + 16}
       
        </CustomText>
      </View>
    </View>
  )
}

export default BillDetails

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff", 
        borderRadius:15, 
        marginVertical:15
    },
    text:{
        marginHorizontal:10, 
        marginTop:15
    }, 
    billcontainer:{
        padding:10, 
        paddingBottom:0, 
        borderBottomColor:Colors.border, 
        borderBottomWidth:0.7
    },
    flexRowBetween:{
        justifyContent:'space-between', 
        alignItems:'center', 
        flexDirection:'row',
    }, 
    flexRow:{
      alignItems:'center', 
      flexDirection:'row', 
      gap:5
    }, 
   
})