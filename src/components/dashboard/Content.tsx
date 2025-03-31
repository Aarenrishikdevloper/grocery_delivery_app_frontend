import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { adData, categories } from '@utils/dummyData'
import AddCarousel from './AddCarousel'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CategoryContainer from './CategoryContainer'

const Content = () => {
  return (
    <View style={styles.container}>
      <AddCarousel adData={adData}/> 
      <CustomText variant={'h5'} fontFamily={Fonts.SemiBold} >Grocery & Kitchen</CustomText> 
      <CategoryContainer data={categories}/> 
      <CustomText variant={'h5'} fontFamily={Fonts.SemiBold} >Bestseller</CustomText> 
      <CategoryContainer data={categories}/>
      
     
 

    </View>
  )
}

export default Content

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20, 
        
        
    }
})