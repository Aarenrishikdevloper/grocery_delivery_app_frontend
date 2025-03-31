import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import ProductItem from './ProductItem'
import { Colors } from '@utils/Constants'

const ProdcutList = ({data}:{data:any}) => {
    const renderItem =({item, index}:any)=>{
        return(
            <ProductItem item={item} index={index}/>
        )
    }
   return (
      <FlatList
      data={data} 
      keyExtractor={item=>item._id} 
      renderItem={renderItem} 
      style={styles.container} 
      contentContainerStyle={styles.content} 
      numColumns={2}
      />
   )
}

export default ProdcutList

const styles = StyleSheet.create({
    container:{
        flex:1, 
        height:"100%", 
        backgroundColor:Colors.backgroundSecondary
    }, 
    content:{
        paddingVertical:10, 
        paddingBottom:100
    }
})