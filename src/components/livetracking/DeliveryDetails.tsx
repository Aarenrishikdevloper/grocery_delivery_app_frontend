import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'
export default function DeliveryDetails({details}:{details:any}) {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}> 
        <View style={styles.iconcontainer}> 
          <Icon name='bike-fast' color={Colors.disabled} size={RFValue(20)}/>

        </View> 
        <View>
          <CustomText variant={"h5"} fontFamily={Fonts.SemiBold}>Your delivery details</CustomText> 
          <CustomText variant={"h8"} fontFamily={Fonts.Medium}>Details of your current order</CustomText>
        </View>
         
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconcontainer}>
          <Icon name='map-marker-outline' color={Colors.disabled} size={RFValue(20)}/> 
          
        </View>
        <View style={{width:"80%"}}>  
          <CustomText variant={'h8'} fontFamily={Fonts.Medium}>
            Delivery at Home
          </CustomText> 
          <CustomText variant={'h8'} numberOfLines={2} fontFamily={Fonts.Medium}>
            {details?.address || "somewhere"}
          </CustomText>

        </View>
        </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconcontainer}>
          <Icon name='phone-outline' color={Colors.disabled} size={RFValue(20)}/> 

        </View>
        <View style={{width:"80%"}}> 
          <CustomText variant={"h8"} fontFamily={Fonts.Medium}> 
            {details?.name || "Annoymous"} {details?.phone || "PPPPPPPP"}

          </CustomText> 
          <CustomText variant={'h8'} numberOfLines={2} fontFamily={Fonts.Medium}>
            Reciver Phone No
          </CustomText>

        </View>
         
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:"100%", 
    borderRadius:15, 
    marginVertical:10, 
    backgroundColor:"#fff"

  }, 
  flexRow:{
     flexDirection:'row', 
     alignItems:"center", 
     gap:10, 
     padding:10, 
     borderBottomWidth:0.7,
     borderColor:Colors.border
  },
  flexRow2:{
    flexDirection:"row", 
    alignItems:'center', 
    gap:10,  
    padding:10

  }, 
  iconcontainer:{
    backgroundColor:Colors.backgroundSecondary, 
    borderRadius:100, 
    padding:10, 
    justifyContent:'center', 
    alignItems:'center'
}, 

})