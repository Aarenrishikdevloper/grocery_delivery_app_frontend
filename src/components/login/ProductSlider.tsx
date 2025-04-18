import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useMemo } from 'react'
import { imageData } from '@utils/dummyData';
import AutoScroll from "@homielab/react-native-auto-scroll"
import { screenWidth } from '@utils/Scaling';
const ProductSlider = () => {
    const rows = useMemo(()=>{
     const results  = []; 
     for(let i=0; i < imageData.length; i+=4){
       results.push(imageData.slice(i,i+4));
     }
     return results;
    },[])
  return (
    <View pointerEvents='none'>
       <AutoScroll duration={10000} endPaddingWidth={0} style={styles.autoscroll}>
          <View style={styles.gridContainer}>
           {rows?.map((row:any, index:number)=>{
              return(
                <MemorizeRow key={index} row={row} rowIndex={index}/>
              )
         })}
          </View>
       </AutoScroll>
    </View>
  )
}

export default ProductSlider
const Row:FC<{row:typeof imageData, rowIndex:number}>=({row, rowIndex})=>{
  return(
    <View style={styles.row}>
         {row?.map((image,ImageIndex)=>{
          const horizontalShift = rowIndex % 2 === 0 ?-18:18 
          return(
            <View key={ImageIndex}  style={[styles.itemCountainer,{transform:[{translateX:horizontalShift}]}]}>
              <Image source={image}  style={styles.image}/>
            </View>
          )
       })}
    </View>
  )

}
const MemorizeRow = React.memo(Row);
const styles = StyleSheet.create({
  autoscroll:{
    position:"absolute", 
    zIndex:-2
  }, 
  gridContainer:{
    justifyContent:'center', 
    overflow:'hidden', 
    alignItems:'center',
  }, 
  row:{
      flexDirection:'row', 
      marginBottom:10
  }, 
  itemCountainer:{
    marginBottom:12,  
    marginHorizontal:10, 
    width:screenWidth*0.26, 
    height:screenWidth*0.26, 
    backgroundColor:"#f2f2f2", 
    justifyContent: 'center', 
    borderRadius:25, 
    alignContent: 'center',
  }, 
  image:{
    height:"100%",  
    width:"100%", 
    resizeMode:'contain'
  }
})
