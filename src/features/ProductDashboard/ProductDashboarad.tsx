import { View, Text, StyleSheet, Animated as RNAnimated, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { NoticeHeight, screenWidth } from '@utils/Scaling';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,  
  useCollapsibleContext, 
  withCollapsibleContext
} from '@r0b0t3d/react-native-collapsible';
import Geolocation from '@react-native-community/geolocation';
import { reverseGeocode } from '@service/mapservice';
import { useAuthStore } from '@state/authstore';
import NoticeAnimation from './NoticeAnimation';
import Visuals from '@components/dashboard/Visuals';
import  Icon  from 'react-native-vector-icons/Ionicons';
import Animated, { useAnimatedRef, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import AnimatedValue from '@components/dashboard/AnimatedValue';
import AnimatedHeader from '@components/dashboard/AnimatedValue';
import Content from '@components/dashboard/Content';
import StickySearchBar from '@components/dashboard/StickySearchBar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import withCart from '@features/cart/WithCart';
import withLiveStatus from '@features/livetracking/withLiveStatus';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboarad = () => {
  const noticeposition = useRef(new RNAnimated.Value(NOTICE_HEIGHT));
  const { user, setuser } = useAuthStore();

  
  const { scrollY, expand } = useCollapsibleContext(); 
  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp = scrollY.value < previousScroll.current && scrollY.value > 180;  
    const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 }); 
    const translateY = withTiming(isScrollingUp ? 0 : 16, { duration: 300 }); 
    previousScroll.current = scrollY.value; 
    return {
      opacity, 
      transform: [{ translateY }]
    };
  }); 

  const slideUp = () => {
    RNAnimated.timing(noticeposition.current, {
      toValue: NOTICE_HEIGHT, 
      duration: 1200, 
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticeposition.current, {
      toValue: 0, 
      duration: 1200, 
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
     slideDown();
     const timeoutId = setTimeout(()=>{
      slideUp()
     },3500)
  
    return () => clearTimeout(timeoutId);
  }, [])
  
  return (
    <NoticeAnimation noticePosition={noticeposition.current}>  
    <> 
    <Visuals/>  
    <SafeAreaView/> 
    <Animated.View style={[styles.backToTopButton, backToTopStyle]}> 
        <TouchableOpacity onPress={()=>{
          scrollY.value = 0; 
          expand()
        }} 
        style={{flexDirection:'row', alignItems:'center', gap:6}}
        >
         <Icon name='arrow-up-circle-outline' color="white" size={RFValue(12)}/> 
         <CustomText variant='h9' style={{color:'white'}} fontFamily={Fonts.SemiBold}>
            Back to top
         </CustomText>
        </TouchableOpacity>
        </Animated.View> 
        <CollapsibleContainer style={[styles.planeContainer, {marginTop:20}]}> 
        <CollapsibleHeaderContainer containerStyle={styles.transparent}> 
           <AnimatedHeader showNotice={()=>{
            slideDown(); 
            const timeoutId = setTimeout(()=>{
              slideUp()
            },3500)
            return()=>clearTimeout(timeoutId)
           }}/>
           <StickySearchBar/>
          
        </CollapsibleHeaderContainer>
          
        
        <CollapsibleScrollView style={styles.planeContainer}  nestedScrollEnabled showsHorizontalScrollIndicator={false}>
         <Content/>
         <View style={{backgroundColor:"f8f8f8", padding:20}}>  
          <CustomText style={{opacity:0.2}} fontSize={RFValue(32)} fontFamily={Fonts.Bold}>
            Grocery Deliverty App 🛒
          </CustomText>  
          <CustomText style={{marginTop:10,paddingBottom:100, opacity:0.2}} fontFamily={Fonts.Bold}>
            Developed By ❤️ RISHIK  Kashyap
          </CustomText>

         </View>
          
        </CollapsibleScrollView>
        </CollapsibleContainer>


    </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  planeContainer: {
    flex: 1, 
  }, 
  transparent: {
    backgroundColor: "transparent"
  }, 
  backToTopButton: {
    position: "absolute", 
    alignSelf: 'center', 
    top: 100, 
    flexDirection: 'row', 
    alignItems: "center", 
    gap: 4, 
    backgroundColor: "black",  
    borderRadius: 20, 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    zIndex: 999
  }
});

export default withLiveStatus(withCart(withCollapsibleContext(ProductDashboarad)));