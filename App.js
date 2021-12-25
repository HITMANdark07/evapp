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
LogBox.ignoreLogs(['Reanimated 2']);
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore  from './src/redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <Drawer.Navigator screenOptions={{drawerStyle:{backgroundColor:'transparent'}}} drawerContent={(props) => <CustomDrawer {...props}  /> }>
      <Drawer.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Drawer.Screen name="Profile" component={Profile} options={{headerShown:false}} />
      <Drawer.Screen name="Maps" component={Map} options={{headerShown:false}} />
      <Drawer.Screen name="DataShow" component={DataShow} options={{headerShown:false}} />
    </Drawer.Navigator>
  );
}
const App = () => {
    return (
      <Provider store={reduxStore.store}>
        <PersistGate loading={null} persistor={reduxStore.persistor}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown:false }}/>
                <Stack.Screen name="Intro" component={Intro} options={{headerShown:false}}/>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
        </PersistGate>
      </Provider>
    )
}

export default App;
