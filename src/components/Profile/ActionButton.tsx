import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@utils/Constants'
import Icon from "react-native-vector-icons/Ionicons"
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'
type props={
   icon:string; 
   label:string; 
   onPress?:()=>void;
}
const ActionButton = ({icon,label,onPress}:props) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}> 
    <View style={styles.iconContainer}>
        <Icon name={icon} color={Colors.text} size={RFValue(14)}/> 

    </View> 
    <CustomText variant='h7' fontFamily={Fonts.Medium}>
        {label}
    </CustomText>

    </TouchableOpacity>
  )
}

export default ActionButton

const styles = StyleSheet.create({
    btn:{
        flexDirection:'row', 
        alignItems:'center', 
        gap:10, 
        marginVertical:10
    }, 
    iconContainer:{
        justifyContent: 'center', 
        alignItems:'center', 
        padding:8, 
        borderRadius:100, 
        backgroundColor:Colors.backgroundSecondary
    }
})