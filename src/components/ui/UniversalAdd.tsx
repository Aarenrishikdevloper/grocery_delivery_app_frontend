import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCartStore } from '@state/cartstore'
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { goBack } from '@utils/NavigationUtils';
const UniversalAdd = ({item}:{item:any}) => {
  const count = useCartStore(state=>state.getItemCount(item._id)); 
  const{removeItem,addItem} = useCartStore()
   const route = useRoute();
   const handleRemove =()=>{
    removeItem(item._id)
    if(route.name === "ProductOrder" && count === 1){
      goBack()
    }
   }
  return (
    <View style={[styles.container, {backgroundColor:count===0?"#fff":Colors.secondary}]}>
      {count===0? <Pressable onPress={()=>addItem(item)} style={styles.add}> 
        <CustomText variant='h9' fontFamily={Fonts.SemiBold} style={styles.addText}>
          ADD
        </CustomText>

      </Pressable>:(
        <View style={styles.counterContainer}>
        <Pressable onPress={()=>{
          handleRemove() 
         
         
        }
          }>
          <Icon name='minus' color={"#fff"} size={RFValue(13)}/>
             
        </Pressable> 
        <CustomText fontFamily={Fonts.SemiBold} style={styles.text} variant='h8'>
          {count}
        </CustomText>
        <Pressable onPress={()=>addItem(item)}>
          <Icon name='plus' color={"#fff"} size={RFValue(13)}/>
             
        </Pressable> 
        </View>
      )}
    </View>
  )
}

export default UniversalAdd

const styles = StyleSheet.create({
  container:{
    alignItems:'center', 
    justifyContent:'center', 
    borderWidth:1, 
    borderColor:Colors.secondary, 
    width:65, 
    borderRadius:8
  }, 
  add:{
    width:"100%", 
    alignItems:"center", 
    justifyContent:'center', 
    paddingHorizontal:4, 
    paddingVertical:6
  }, 
  addText:{
    color:Colors.secondary
  }, 
  counterContainer:{
     flexDirection:"row", 
     alignItems:"center", 
     width:"100%", 
     paddingHorizontal:4, 
     paddingVertical:6, 
     justifyContent:'space-between'
  }, 
  text:{
    color:"#fff",
  }
}) 