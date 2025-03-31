import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
const renderItems =(item:any[])=>{
  return(
    <>
      {item.map((item:any, index:number)=>(
           <ScalePress key={item.id} style={styles.item} onPress={()=>navigate("ProductCategories")} > 
           <View style={styles.imageContainer}> 
            <Image source={item?.image} style={styles.image}/>
           

           </View>
           <CustomText style={styles.text} variant='h8' fontFamily={Fonts.Medium}>
              {item?.name}
            </CustomText>
  
         </ScalePress>
       ))}
    </>
  )
}
const CategoryContainer = ({data}:{data:any}) => {
  const firstrowItems = data?.slice(0,4); 
  const secoundrow  = data?.slice(4,8)
  console.log(firstrowItems);
  console.log(secoundrow);
 
  return (
    <View style={styles.container}>
      <View style={styles.row}> 
       
            {renderItems(firstrowItems)}
      </View> 
      <View style={styles.row}> 
        {renderItems(secoundrow)}
      
      </View>
    </View>
  )
}

export default CategoryContainer

const styles = StyleSheet.create({
  container:{
    marginVertical:25,  
    
    
  }, 
  row:{
    flexDirection:'row', 
    justifyContent:"space-between", 
    alignItems:'flex-start', 
    marginBottom:25
  }, 
  text:{
    textAlign:'center'
  }, 
  item:{
    width:'22%', 
    justifyContent:'center', 
    alignItems:'center'
  }, 
  imageContainer:{
    width:"100%", 
    height:80, 
    justifyContent:'center', 
    alignItems:'center', 
    borderRadius:10, 
    padding:6, 
    backgroundColor:"#E5F3F3", 
    marginBottom:8
  }, 
  image:{
    width:"100%", 
    height:"100%", 
    resizeMode:'contain'
  }
})