import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '@utils/Scaling'
import { Colors, Fonts } from '@utils/Constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { navigate } from '@utils/NavigationUtils'
type props ={
    cartCount:number, 
    cartImage:string,
}
const CartSummary = ({cartCount,cartImage}:props) => {
  return (
    <View style={styles.container}> 
      <View style={styles.flexRowGap}> 
         <Image source={
            cartImage === null ?require("@assets/icons/bucket.png"):{
                uri:cartImage
            }
            
         } style={styles.image}/>
          <CustomText fontFamily={Fonts.SemiBold}> 
            {cartCount} ITEM{cartCount >1 ?'S':''}

          </CustomText>
          <Icon name='arrow-drop-up' color={Colors.secondary} size={RFValue(25)}/>
      </View>
      <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={()=>navigate("ProductOrder")}>  
         <CustomText style={styles.btnText} fontFamily={Fonts.Medium}>
            Next
         </CustomText> 
         <Icon name='arrow-right' color={"#fff"} size={RFValue(25)}/>

      </TouchableOpacity>
    </View>
  )
}

export default CartSummary

const styles = StyleSheet.create({
    container:{
        justifyContent:"space-between", 
        alignItems:'center', 
        flexDirection:'row', 
        paddingHorizontal:screenWidth*0.05, 
        paddingBottom:screenHeight*0.03, 
        paddingTop:screenHeight*0.014
    }, 
    flexRowGap:{
        alignItems:'center', 
        flexDirection:'row', 
        gap:screenWidth*0.03
    }, 
    image:{
        width:screenWidth*0.1, 
        height:screenWidth*0.1, 
        borderRadius:screenWidth*0.025, 
        borderColor:Colors.border, 
        borderWidth:1,
    }, 
    btn:{
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:"center", 
        paddingVertical:screenHeight*0.01, 
        borderRadius:screenWidth*0.025, 
        backgroundColor:Colors.secondary, 
        paddingHorizontal:screenWidth*0.1
    }, 
    btnText:{
        color:"#fff", 
        marginLeft:screenWidth*0.07
    }
})