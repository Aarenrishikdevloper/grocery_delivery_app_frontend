import   OTPTextInput from 'react-native-otp-textinput';
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
import { useRoute } from '@react-navigation/native';
import { windowHeight, windowWidth } from '@utils/Scaling';
const Otpscreen = () => {
     const route  = useRoute();
     const phone =route?.params as Record<string,any> 
    const [gestureSequence, setGestureSequence] = useState<string[]>([]);
    const bottomcolors = [...lightColors].reverse();
    const [otp, setOtp] = useState('');
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
          //resetAndNavigate('DeliveryLogin');
        }
      }
    };
   async function handleAuth() {
     Keyboard.dismiss()
     setloading(true); 
     try {
         await customerLogin(phone.phone,otp ); 
       
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
                    OTP Verification
                  </CustomText> 
                  <OTPTextInput handleTextChange={(code)=>setOtp(code)} textInputStyle={styles.otpINputStyle} inputCount={4} tintColor={"#F5F5F5"} autoFocus={false}/>
                  
                  <CustomButton   
                     disabled={otp?.length != 4}  
                     onpress={()=>handleAuth()}   
                     loading={loading} 
                     title='verify'
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
         
        </View>
      </GestureHandlerRootView>
    );
  
}

export default Otpscreen

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
      }, 
      otpINputStyle:{
        backgroundColor:"#F5F5F5", 
        borderColor:"#F5F5F5", 
        borderRadius:6, 
        width:windowWidth(60), 
        height:windowHeight(40), 
        borderBottomWidth:0.6, 
        color:Colors.text, 
        textAlign:'center', 
        fontFamily:Fonts.SemiBold, 
        fontSize:windowWidth(22), 
        marginTop:windowHeight(10),
      }
    });
    
