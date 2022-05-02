// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './src/components/Drawer';
import Home from './src/screens/Home';
import Splash from "./src/screens/Splash";
import Intro from "./src/screens/Intro";
import Profile from './src/screens/Profile';
import {LogBox } from 'react-native';
import DataShow from './src/screens/DataShow';
import Login from './src/screens/Login';
import Map from './src/screens/Map';
import Wallet from './src/screens/Wallet';
import History from './src/screens/History';
import Transactions from './src/screens/Transactions';
LogBox.ignoreLogs(['Reanimated 2']);
import { connect } from 'react-redux';
import Support from './src/screens/Support';
import VerifyOTP from './src/screens/VerifyOTP';
import Charging from './src/screens/Charging';
import SplashScreen from  "react-native-splash-screen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <Drawer.Navigator screenOptions={{drawerStyle:{backgroundColor:'transparent'}}} drawerContent={(props) => <CustomDrawer {...props}  /> }>
      <Drawer.Screen name="Home" component={Home} options={{headerShown:false,unmountOnBlur:true}} />
      <Drawer.Screen name="Profile" component={Profile} options={{headerShown:false,unmountOnBlur:true}} />
      <Drawer.Screen name="Maps" component={Map} options={{headerShown:false,unmountOnBlur:true}} />
      <Drawer.Screen name="Wallet" component={Wallet} options={{headerShown:false,unmountOnBlur:true}} />
      <Drawer.Screen name="History" component={History} options={{headerShown:false,unmountOnBlur:true}} />
      <Drawer.Screen name="DataShow" component={DataShow} options={{headerShown:false,unmountOnBlur:true}} />
      <Drawer.Screen name="Support" component={Support} options={{headerShown:false,unmountOnBlur:true}} />
      <Drawer.Screen name="Transactions" component={Transactions} options={{headerShown:false,unmountOnBlur:true}} />
      <Drawer.Screen name="Charging" component={Charging} options={{headerShown:false,unmountOnBlur:true}} />
    </Drawer.Navigator>
  );
}
const Router = ({currentUser}) => {

  React.useEffect(() => {
    SplashScreen.hide();
  },[]);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                {
                    currentUser ?
                    currentUser.phone && currentUser.email ? 
                    <>
                    <Stack.Screen name="Splash" component={Splash} options={{ headerShown:false }}/>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
                    </>
                    :
                    <>
                    <Stack.Screen name="Verify" component={VerifyOTP} options={{headerShown:false}} />
                    </>
                    :
                    <>
                    <Stack.Screen name="Splash" component={Splash} options={{ headerShown:false }}/>
                    <Stack.Screen name="Intro" component={Intro} options={{headerShown:false}}/>
                    <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const mapStateToProps = (state) => ({
  currentUser : state.user.currentUser
})
export default connect(mapStateToProps)(Router);
