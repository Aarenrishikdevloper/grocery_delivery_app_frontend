
import React, { FC } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/splashscreen';
import CustomerLogin from '@features/auth/CustomerLogin';
import Deliverylogin from '@features/auth/Deliverylogin';
import ProductDashboarad from '@features/ProductDashboard/ProductDashboarad';
import DeliveryDashBoard from '@features/DeliveryDashBoard/DeliveryDashBoard';
import ProductCategory from '@features/category/ProductCategory';
import ProductOrder from '@features/order/ProductOrder';
import OrderSucess from '@features/order/OrderSucess';
import LiveTracking from '@features/livetracking/LiveTracking';
import Profile from '@features/Profile/Profile';
import DeliveryMap from '@features/DeliveryMap/DeliveryMap';
import Otpscreen from '@features/auth/otpScreen';
import Search from '@features/search/Search';


const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{
         headerShown:false,
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen options={{animation:"fade"}} name='CustomerLogin' component={CustomerLogin}/>  
        <Stack.Screen options={{animation:"fade"}} name='DeliveryLogin' component={Deliverylogin}/>  
        <Stack.Screen name='ProductDashboard' component={ProductDashboarad}/>   
        <Stack.Screen name='DeliveryDashboard' component={DeliveryDashBoard}/> 
        <Stack.Screen name='ProductCategories' component={ProductCategory}/>
         <Stack.Screen name='ProductOrder' component={ProductOrder}/> 
         <Stack.Screen name='OrderSucess' component={OrderSucess}/> 
         <Stack.Screen name='LiveTracking' component={LiveTracking}/> 
         <Stack.Screen name='Profile' component={Profile}/>
         <Stack.Screen name='Otpscreen' component={Otpscreen}/>
         <Stack.Screen name='deliveryMap' component={DeliveryMap}/> 
         <Stack.Screen name='search' component={Search}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;