import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { hocStyle } from '@styles/GlobalStyles';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
type props ={
    cartCount:number; 
    children:React.ReactNode
}
const CartAnimationWrapper = ({cartCount,children}:props) => {
    const slideAnim = useRef((new Animated.Value(0))).current; 
    const [hasanimate, setHasAnimate] = useState(false)
    useEffect(() => {
        if(cartCount >0 && !hasanimate){
            Animated.timing(slideAnim,{
                toValue:1, 
                duration:300, 
                useNativeDriver:true
            }).start(()=>{
                setHasAnimate(true)
            })
        }else if(cartCount ===0 && hasanimate){
            Animated.timing(slideAnim,{
                toValue:0, 
                duration:300, 
                useNativeDriver:true
            }).start(()=>{
                setHasAnimate(false);
            })
        }
    }, [cartCount,hasanimate])
    
    const slideUpStyle ={
       transform:[
         {
            translateY:slideAnim.interpolate({
                inputRange:[0,1], 
                outputRange:[100,0]
            })
         }
       ],
       opacity:slideAnim
    }
  return (
    <Animated.View style={[hocStyle.cartContainer, slideUpStyle]}>
        {children}
    </Animated.View>
  )
}

export default CartAnimationWrapper

const styles = StyleSheet.create({})