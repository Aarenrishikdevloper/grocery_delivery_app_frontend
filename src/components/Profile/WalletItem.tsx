import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';

type Props ={
    icon:string;
    label:string;
}
const WalletItem = ({icon,label}:Props) => {
  return (
    <View style={styles.walletItemContainer} >
    <Icon name={icon} size={RFValue(20)}/> 
    <CustomText variant='h8' fontFamily={Fonts.Medium}>{label}</CustomText>
   </View>
  )
}

export default WalletItem

const styles = StyleSheet.create({
    walletItemContainer:{
        alignItems:'center'
    }
})