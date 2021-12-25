import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    GoogleSignin,
  } from '@react-native-google-signin/google-signin';
import { connect } from 'react-redux';
import {setCurrentUser} from '../redux/user/user.action';

const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';



const Login = ({navigation,setUser}) => {
    
    const signIn = () => {
        GoogleSignin.configure({
            androidClientId: '349564323951-n4rketc4oe2dto7a7ummonqbdnphopt3.apps.googleusercontent.com',
            webClientId:'349564323951-fgfh3g05vvjbl67o31jscuje2thni902.apps.googleusercontent.com'
            });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
                if (hasPlayService) {
                    GoogleSignin.signIn().then((userInfo) => {
                            const {email , name, photo} = userInfo.user;
                            setUser(userInfo.user);
                            // navigation.navigate('HomeScreen');
                            console.log(name,email);
                    }).catch((e) => {
                    console.log("ERROR IS : " + JSON.stringify(e));
                    })
                }
        }).catch((e) => {
            console.log("ERROR IS : " + JSON.stringify(e));
        })
    }
    
    return (
        <View style={styles.head}>
            <LottieView
                source={require('../../assets/login.json')}
                autoPlay
                loop
              />
            <View style={styles.headView}>
                <Text style={styles.headText}>LOGIN TO EV APP</Text>
            </View>
            <TouchableOpacity style={{padding:15,position:'absolute', left:0, margin:5, borderRadius:50}} activeOpacity={0.5}
            onPress={() => {
                navigation.goBack();
            }}>
                    <Icon name="arrow-back" size={35} color={"#fff"}  />
            </TouchableOpacity>
            <View style={{flex:1,flexDirection:'column', justifyContent:'flex-end',bottom:50,alignSelf:'center'}}>
            <TouchableOpacity activeOpacity={0.5} style={styles.bView} onPress={signIn} >
            {/* <Icon name='google-plus-square' style={{justifyContent:'center'}} size={70} color={themeColor1} /> */}
            <View style={{backgroundColor:'#fff', padding:8, borderRadius:10,}}>
            <Image style={{height:40, width:40}} source={require("../../assets/images/google.png")} />
            </View>
            <Text style={styles.button} >Sign in with Google</Text>
            </TouchableOpacity>
            </View>
            {/* <GoogleSigninButton
                style={{ width: '70%', height: 48, padding:10 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signOut}
                /> */}
            <View style={styles.footView} >
            <Text style={styles.footText}>Made in India with <Icon name="favorite" size={25} color={'red'} /></Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    head:{
        flex:1,
        top:0,
        flexDirection:'column',
        alignItems:'center'
    },
    bView:{
        padding:8,
        paddingLeft:20,
        paddingRight:20,
        flexDirection:'row',
        // justifyContent:'space-between',
        backgroundColor:'#4285F4',
        borderRadius:15
    },
    button:{
        color:themeColor1,
        justifyContent:'center',
        textAlignVertical:'center',
        fontWeight:'500',
        margin:10,
        fontSize:20,
    },
    headText:{
        fontSize:24,
        fontWeight:'700',
        textAlign:'center',
        color:'#fff'
    },
    footText:{
        fontSize:20,
        fontWeight:'400',
        textAlign:'center',
        color:'#fff'
    },
    headView:{
        padding:25,
        backgroundColor:appbar,
        width:'100%',
        borderBottomLeftRadius:70,
        borderBottomRightRadius:70
    },
    footView:{
        padding:25,
        backgroundColor:appbar,
        width:'100%',
        borderTopLeftRadius:70,
        borderTopRightRadius:70
    }
})

const mapDispatchToProps = (dispatch) => ({
    setUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(Login);
