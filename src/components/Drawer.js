import React from 'react';
import {
  DrawerContentScrollView,
  //   DrawerItemList,
  //   DrawerItem
} from '@react-navigation/drawer';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ic from "react-native-vector-icons/Entypo";
import Ico from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.action';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

const themeColor1= "#fff";
function CustomDrawer({navigation,currentUser,setUser}) {

  const signOut = async() => {
    GoogleSignin.configure({
      androidClientId: '349564323951-n4rketc4oe2dto7a7ummonqbdnphopt3.apps.googleusercontent.com',
      webClientId:'349564323951-fgfh3g05vvjbl67o31jscuje2thni902.apps.googleusercontent.com'
      });
    try {
          await GoogleSignin.isSignedIn();
          await GoogleSignin.signOut();
          setUser(null);
       // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
}
  return (
    <DrawerContentScrollView style={{backgroundColor:'#7Cb342', borderTopRightRadius:35, borderBottomRightRadius:35}}>
      {/* <View style={styles.logo}> */}
        {/* <Image source={require('../../assets/logo.png')} /> */}
        <View style={{
          justifyContent:'center',
          alignSelf:'center',
          margin:10,
          marginBottom:20
        }}>
          <Text style={{fontSize:40, color:'#fff', fontWeight:'700'}}>
            Ero 
          <Ico name="flash-on" size={30}  />
           Ev</Text>
        </View>
      {/* </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
      <View style={styles.drawerMenu}>
          {currentUser && currentUser.photo ? (<Image source={{uri:currentUser.photo}} style={styles.photo} />) :
          (<Icon name="user-circle-o" style={styles.icon} color={themeColor1} size={30} />)}
          <Text style={styles.menuText}>Hi, {currentUser && currentUser.name ? currentUser.name.split(" ")[0] : "USER"}</Text>
      </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Host')}>
      <View style={styles.drawerMenu} >
          <Ic name="location" style={styles.icon} color={themeColor1} size={30} />
          <Text style={styles.menuText}>I am Host</Text>
      </View>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.navigate('Withdraw')}>
      <View style={styles.drawerMenu} >
          <Icon name="flash" style={styles.icon} color={themeColor1} size={30} />
          <Text style={styles.menuText}>Withdrawls</Text>
      </View>
      </TouchableOpacity>
      {/* <TouchableOpacity>
      <View style={styles.drawerMenu}>
          <Ico name="verified" style={styles.icon} color={themeColor1} size={30} />
          <Text style={styles.menuText}>Complete KYC</Text>
      </View>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
      <View style={styles.drawerMenu}>
          <Ico name="history" style={styles.icon} color={themeColor1} size={30} />
          <Text style={styles.menuText}>History</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
      <View style={styles.drawerMenu} >
          <Icons name="bank-transfer" style={styles.icon} color={themeColor1} size={30} />
          <Text style={styles.menuText}>Transactions</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
      <View style={styles.drawerMenu} >
          <Ic name="wallet" style={styles.icon} color={themeColor1} size={30} />
          <Text style={styles.menuText}>Wallet</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
      <View style={styles.drawerMenu} >
          <Ico name="logout" style={styles.icon} color={themeColor1} size={30} />
          <Text style={styles.menuText}>Logout</Text>
      </View>
      </TouchableOpacity>
      </ScrollView>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  logo: {
    margin: 0,
    marginTop: -30,
    top: 0,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  icon:{
    margin:5,
    marginRight:20
  },
  photo:{
    margin:5,
    marginRight:20,
    height:40,
    width:40,
    borderRadius:50
  },
  drawerMenu:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      margin:10,
      padding:2,
      borderBottomColor:themeColor1,
      borderBottomWidth:1,
      // borderLeftColor:themeColor1,
      // borderLeftWidth:1,
      borderRadius:5
  },
  menuText:{
      textAlignVertical:"center",
      color:themeColor1,
      fontSize:18,
      fontWeight:'700'
  }
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})
const mapDispatchToProps = (dispatch) => ({
  setUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(CustomDrawer);