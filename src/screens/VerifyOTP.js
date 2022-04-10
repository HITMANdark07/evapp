import React, { useState } from 'react';
import { View, Text, StyleSheet,TextInput,Image,Linking, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Ico from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { api } from '../../api.config';
import axios from 'axios';
import { setCurrentUser } from '../redux/user/user.action';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';
const phoneNumber = '+919786759870';


function VerifyOTP({setUser, currentUser}) {
    console.log(currentUser);
    const [code , setCode] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
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
    const handleChange = (val) => {
        if(val.length<7){
            setCode(val);
        }
    }
    const handlePhone= (e) => {
        setPhone(e);
    }
    const sendOtp = () => {
        if(loading) return;
        if(!(/^[6-9][0-9]{9}$/.test(phone))){
            ToastAndroid.showWithGravity("Please Enter a Valid Phone Number", ToastAndroid.CENTER, ToastAndroid.LONG);
            return;
        }
        setLoading(true);
        axios({
            method:'POST',
            url:`${api}/user/send-otp`,
            data:{
                user:currentUser._id,
                phone:phone
            }
        }).then(({data}) => {
            if(data.message){
                setSent(true);
            }
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            ToastAndroid.showWithGravity(err?.response?.data?.message, ToastAndroid.CENTER, ToastAndroid.LONG);
        })
    }

    const verifyOtp = () => {
        if(loading) return;
        if(!(/^[6-9][0-9]{9}$/.test(phone)) && code.length!==6){
            ToastAndroid.showWithGravity("Please Enter Valid data", ToastAndroid.CENTER, ToastAndroid.LONG);
            return;
        }
        setLoading(true);
        axios({
            method:'POST',
            url:`${api}/user/verify-otp`,
            data:{
                user:currentUser._id,
                phone:phone,
                code:code
            }
        }).then(({data}) => {
            setLoading(false);
            setUser(data.user);
        }).catch((err) => {
            setLoading(false);
            ToastAndroid.showWithGravity(err?.response?.data?.message, ToastAndroid.CENTER, ToastAndroid.LONG);
        })
    }

    const [histories, setHistories] = React.useState("");
    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity onPress={signOut}>
                <Icon name="arrow-back" size={35} />
                </TouchableOpacity>
                <Text style={styles.hText}>Verify Mobile</Text>
            </View>
            <View style={styles.container}>
            {/* <ActivityIndicator size="large" color={appbar} /> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                
            {
                sent ?
                <>
                <View style={styles.mobip}>
                        <TextInput keyboardType='number-pad' value={code} onChangeText={handleChange} placeholder="--- ---" style={{fontSize:30,fontWeight:'800',color:'grey',width:250, textAlign:'center',letterSpacing:5}} autoFocus  />
                </View>
                <TouchableOpacity style={styles.buv} activeOpacity={0.5} onPress={verifyOtp} >
                        {
                            loading ?
                            <ActivityIndicator size={30} color="#fff" style={{marginRight:8}} />
                            :
                            <Icons name="verified" style={{marginRight:20}} size={30} color="#fff" />
                        }
                        <Text style={{color:'#fff', fontWeight:'600', fontSize:20}}>Verify</Text>
                </TouchableOpacity>
                </>
                :
                <>
                <View style={styles.vip}>
                    <Ico name="mobile-phone" size={40} color={appbar} />
                    
                    <Text style={{fontSize:20, marginLeft:15, fontWeight:'600'}}>+91</Text>
                    <TextInput keyboardType='phone-pad' val={phone} onChangeText={handlePhone} placeholder="Enter Phone Number" style={styles.phoneip} />
                </View>
                <TouchableOpacity style={styles.buv} activeOpacity={0.5} onPress={sendOtp}>
                        {
                            loading ?
                            <ActivityIndicator size={30} color="#fff" style={{marginRight:8}} />
                            :
                            <Icons name="verified" style={{marginRight:20}} size={30} color="#fff" />
                        }
                        <Text style={{color:'#fff', fontWeight:'600', fontSize:20}}>SEND OTP</Text>
                </TouchableOpacity>
                </>
            }
            

            </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    head:{
        position:'absolute',
        top:0,
        left:0,
        padding:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    buv:{
        display:'flex', 
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:50,
        backgroundColor:themeColor2,
        borderRadius:10,
        paddingVertical:8,
        paddingHorizontal:15
    },
    vip:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        padding: 5,
        borderWidth:1.5,
        borderColor:'grey',
        borderStyle:'solid',
        borderRadius:10
    },
    mobip:{
        display:'flex',
        flexDirection:'row',
        alignSelf:'center',
        borderColor:'green', 
        borderBottomWidth:2,
        width:250
    },
    callbu:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#4285F4',
        alignItems:'center',
        color: '#ffffff',
        borderRadius:5,
        width: '90%',
        padding: 5,
        margin: '5%',
    },
    phoneip:{
        padding: 5,
        fontSize:20
    },
    hText:{
        fontSize:25,
        marginLeft:20,
        fontWeight:'800',
        color:themeColor2,
        letterSpacing:4
    },
    noh:{
        textAlign:'center',
        color: 'black',
        fontSize:20,
        fontWeight:'600'
    },
    btntx:{
        fontSize:22,
        fontWeight:'600',
        color: '#ffffff',
        marginLeft:10
    },
    container:{
        flex:1,
        width:'100%',
        flexDirection:'column',
        // justifyContent:'center',
        marginTop:100

    },
})

const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser
})
const mapDispatchToProps = (dispatch) => ({
    setUser : (user) => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);
