import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';
interface CustomButtonProps{
    onpress:()=>void; 
    title:string; 
    disabled:boolean; 
    loading:boolean;
}
const CustomButton = ({onpress, title,disabled,loading}:CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onpress} disabled={disabled} activeOpacity={0.8} style={[styles.btn,{backgroundColor:disabled?Colors.disabled :Colors.secondary}]}>
      {loading?<ActivityIndicator size={"small"} color={"#fff"}/>:<CustomText style={styles.text} variant='h6' fontFamily={Fonts.SemiBold}>{title}</CustomText>}
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    btn:{
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius:10, 
        padding:15, 
        marginVertical:15, 
        width:"100%"
    },
    text:{
        color:"#fff"
    }
})