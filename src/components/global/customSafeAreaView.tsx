import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
interface props{
    children:ReactNode, 
    style?:ViewStyle
}
const CustomSafeAreaView = ({children, style}:props) => {
  return (
    <>
    <SafeAreaView style={styles.container}>
    <View style={[styles.container, style]}>
       
        {children}
       
       
      
       
    </View> 
    </SafeAreaView>
    </>
    
    
    
  )
}

export default CustomSafeAreaView

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:"#fff", 
        paddingTop:10
    }
})