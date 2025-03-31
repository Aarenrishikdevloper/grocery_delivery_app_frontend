import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@utils/Constants'; 
import Icon from "react-native-vector-icons/Ionicons" 
import {goBack} from "@utils/NavigationUtils"
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from './CustomText';
type Props ={
    title:string; 
    search?:boolean;
}
const CustomHeader = ({title,search}:Props) => {
  return (
    <SafeAreaView>
      <View style={styles.flexRow}> 
         <Pressable onPress={()=>goBack()} >
            <Icon name="chevron-back" color={Colors.text} size={RFValue(26)}  /> 
          

         </Pressable> 
         <CustomText style={styles.text} variant={"h5"} fontFamily={Fonts.SemiBold}>{title}</CustomText> 
         <View>
            {search && <Icon name="search" color={Colors.text} size={RFValue(16)}/>}
         </View>

      </View>
    </SafeAreaView>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    flexRow:{
        justifyContent:"space-between", 
        padding:10, 
        height:60, 
        flexDirection:'row', 
        alignItems:'center', 
        backgroundColor:"white", 
        borderBottomWidth:0.6, 
        borderColor:Colors.border
    }, 
    text:{
        textAlign: 'center',
    }
})