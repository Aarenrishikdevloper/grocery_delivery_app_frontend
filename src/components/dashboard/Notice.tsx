import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NoticeHeight } from '@utils/Scaling'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import Svg, {
    Circle,
    Ellipse,
    G,
    
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';
import { wavyData } from '@utils/dummyData'
const Notice = () => {
    
  return (
    <View style={{height:NoticeHeight}}>
       <View style={styles.container}> 
        <View style={styles.noticeContainer}> 
            <SafeAreaView style={{ paddingTop:5, padding:5}}> 
            <CustomText style={styles.heading} variant={'h8'} fontFamily={Fonts.SemiBold} >  
                     It's Raining near the Location

                </CustomText>  
                <CustomText style={styles.textCenter} variant='h9'> 
                    Our Delivery partner may take longer to reach you

                </CustomText>

            </SafeAreaView>

        </View>

       </View> 
       <Svg width={"100%"} height={'35'} fill={"#CCD5E4"} viewBox='0 0 4000 1000' preserveAspectRatio='none' style={styles.wave}>       
        <Defs> 
              <Path id='wavepath' d={wavyData}/> 

        </Defs> 
        <G>
            < Use href='#wavepath' y={"321"} />
        </G>

       </Svg>
    </View>
  )
}

export default Notice

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#CCD5E4"
    }, 
    noticeContainer:{
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"#CCD5E4"
    }, 
    textCenter:{
        textAlign:'center', 
        marginBottom:8
    }, 
    heading:{
        color:"#2D3875", 
        marginBottom:8, 
        textAlign:"center"
    }, 
    wave:{
        width:"100%", 
        transform:[{rotateX:"180deg"}]
    }
})