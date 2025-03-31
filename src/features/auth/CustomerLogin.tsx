import {
  Alert,
  Animated,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  GestureHandlerRootView,
  State,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/customSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {Colors, Fonts, lightColors} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {resetAndNavigate} from '@utils/NavigationUtils';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import LinearGradient from 'react-native-linear-gradient';
import Custominput from '@components/ui/custominput';
import CustomButton from '@components/ui/CustomButton';
import { customerLogin, sentotp } from '@service/authService';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
const CustomerLogin = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const bottomcolors = [...lightColors].reverse();
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setloading] = useState(false);
  const hanldegesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };
 async function handleAuth() {
   Keyboard.dismiss()
   setloading(true); 
   try {
       await sentotp(phoneNumber); 
     
   } catch (error) {
      Alert.alert("Please check your Phone Number");
   }finally{
    setloading(false);
   }
 }
  const animatedValue = useRef(new Animated.Value(0)).current;
  const keyboardOffsetheight = useKeyboardOffsetHeight();
  useEffect(() => {
    if (keyboardOffsetheight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetheight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetheight]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={hanldegesture}>
            <Animated.ScrollView
              bounces={false}
              style={{transform:[{translateY:animatedValue}]}}
              keyboardDismissMode={'on-drag'}
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={styles.subcontainer}>
              <LinearGradient colors={bottomcolors} style={styles.gradient} />
              <View style={styles.content}>
                <Image
                  source={require('@assets/images/logo.jpeg')}
                  style={styles.logo}
                />
                <CustomText variant={'h2'} fontFamily={Fonts.Bold}>
                  Grocery Delivery App
                </CustomText>
                <CustomText
                  variant={'h5'}
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}>
                  Log in or Sign up
                </CustomText>
                <Custominput   
                   onChangeText={(text)=>setPhoneNumber(text.slice(0,10))}  
                   onClear={()=>setPhoneNumber("")}  
                   left={
                    <CustomText style={styles.phonetext} variant='h6' fontFamily={Fonts.SemiBold}>  
                        +91
                    </CustomText>
                   }  
                   placeholder='Enter phone number' 
                   inputMode='numeric'
                   value={phoneNumber}
                />
                <CustomButton   
                   disabled={phoneNumber?.length != 10}  
                   onpress={()=>handleAuth()}   
                   loading={loading} 
                   title='Continue'
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
        <View style={styles.footer}>
          <SafeAreaView />
          <CustomText fontSize={RFValue(7)}>
            By Continuing, you agree to the terms of services & Privacy Policy
          </CustomText>

          <SafeAreaView />
        </View> 
        <TouchableOpacity style={styles.absoluteDelivery} onPress={()=>resetAndNavigate("DeliveryLogin")}>
          <Icon name='bike-fast' color={"#000"} size={RFValue(18)}/>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default CustomerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    zIndex: 22,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  subcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  phonetext:{
    marginLeft:10
  }, 
  absoluteDelivery:{
    position:"absolute", 
    top:30, 
    zIndex:99, 
    backgroundColor:"#fff", 
    shadowColor:"#000", 
    shadowOffset:{width:1,height:1}, 
    shadowOpacity:0.5, 
    shadowRadius:12, 
    elevation:20, 
    padding:10,  
    height:55, 
    width:55,
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:50, 
    right:20
  }
});
