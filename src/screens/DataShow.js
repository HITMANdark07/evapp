import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet,TextInput,Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Ico from 'react-native-vector-icons/FontAwesome5';
import { connect, useDispatch } from 'react-redux';
import { api } from '../../api.config';
import moment from 'moment';
import axios from 'axios';
import CircularProgress from '../components/CircularProgress';
import { setDevice, setDeviceTime, setStartTime } from '../redux/user/user.action';

const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';
const vals=[15,30,45,60,90,120];

function DataShow({navigation,currentUser, route}) {
    const [readyUse, setReadyUse] = useState(false);
    const {data} = route.params;
    const {deviceId} = JSON.parse(data);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [deviceCode, setDeviceCode] = useState('Loading...')
    const [deviceType, setDeviceType] = useState('');
    const [progress, setProgress] = useState(0);
    const [rate, setRate] = useState(0);
    const [time, setTime] = useState(15);
    const [sendingData,setSendingData] = useState({
        user:currentUser._id,
        device:deviceId,
        amount:0,
        time:15*60*1000
    })
    const dispatch = useDispatch();
    const timeHandler = (e) => {
        setTime(parseFloat(e/60000));
        setSendingData((prevData) => ({
            ...prevData,
            time:e,
            amount:+((rate*parseFloat((e/60000))).toFixed(2))
        }))
    }

    const startPolling = () => {
        setTimeout(() => {
            setLoading2(true);
            let timo;
            let intv = setInterval(() => {
              // request status 200 intv
              axios({
                method:'POST',
                url:`${api}/charge/confirm`,
                data:{
                    userId:currentUser._id,
                    deviceId:deviceId
                }
              }).then(({data}) => {
                dispatch(setDevice(data.device));
                dispatch(setDeviceTime(new Date(data.time)));
                dispatch(setStartTime(new Date()));
                setLoading2(false);
                clearInterval(intv);
                clearTimeout(timo);
                setTimeout(() => {
                    navigation.navigate('Charging');
                },100);
              }).catch((err) => {
                console.log(err);
                console.log("re requesting");
              })
              console.log("sending request");
            },2000);

            timo = setTimeout(() => {
              clearInterval(intv);
              setLoading2(false);
              ToastAndroid.showWithGravity("Server TimeOut...!",ToastAndroid.CENTER, ToastAndroid.LONG);
            },300000);
            
          },1000)
    }

    const init = () => {
        setLoading(true);
        axios({
            method:'GET',
            url:`${api}/device/get/${deviceId}`,
        }).then(({data}) => {
            if(!data.inuse){
                setDeviceCode(data.code);
                setReadyUse(true);
                setDeviceType(data.device_type);
                ToastAndroid.showWithGravity("Device is Ready to use", ToastAndroid.CENTER, ToastAndroid.LONG);
            }else{
                setDeviceCode("Unavailable");
                ToastAndroid.showWithGravity("Device is Unavailable", ToastAndroid.CENTER, ToastAndroid.LONG);
            }
            setRate(data.rate);
            setSendingData((prevState)=>({
                ...prevState,
                amount:+((data.rate*parseFloat((prevState.time/60000))).toFixed(2))
            }));
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    useEffect(() => {
        init();
    },[]);
    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={35} />
                </TouchableOpacity>
                <Text style={styles.hText}>Device {deviceCode}</Text>
            </View>
            <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color={appbar} />}
            <ScrollView showsVerticalScrollIndicator={false}>
                
            {!readyUse && !loading &&
            <>
            <Text style={styles.noh}>Service Unavailable</Text>
            <Ico name='sad-tear' color={appbar} size={70} style={{alignSelf:'center', marginTop:20}} />
            </>}
            <View style={{flexDirection:'row', justifyContent:'center'}}>
            {/* <CircularProgress percent={progress} size={200} wide={10} progressColor={themeColor2} backgroundColor="#D3D3D3" fontColor="grey" /> */}
            <Image source={{uri:`${api}/device/qr/image/${deviceId}`}} style={{width:'70%', height:250}} />
            </View>
            {readyUse && 
            <View>
            <View style={styles.amountContainer}>
                    <Text style={styles.label}>Select Time</Text>
                    <TextInput style={styles.input} value={`${time/60 > 1 ? (time/60).toFixed(1)+ " Hrs" : time +" mins"}`} keyboardType="default" editable={false}  />
                    <Text style={{textAlign:'center', marginTop:10}}>Minimum 15 Mins </Text>
            </View>
            <View style={styles.selectContainer}>
                    {vals.map((val) =>(
                        <TouchableOpacity style={styles.amountBox} key={val} activeOpacity={0.5} onPress={() => timeHandler(val*60*1000)}>
                        <Text style={{color:'#000', paddingLeft:5, paddingRight:5,}}>{val/60 > 1 ? (val/60).toFixed(1)+ " Hrs" : val +" mins"}</Text>
                        </TouchableOpacity>
                    ))}
            </View>
            </View>}
            {readyUse && !loading2 ? <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => {
                if(currentUser.balance>=sendingData.amount){
                    console.log(sendingData);
                    startPolling();
                }else{
                    ToastAndroid.showWithGravity("Please Recharge Your Wallet",ToastAndroid.CENTER, ToastAndroid.LONG);
                    navigation.navigate('Wallet');
                }
            }} >
                    <Text style={{textAlign:'center', fontWeight:'800', color:'#fff', fontSize:18}}>START CHARGING</Text>
            </TouchableOpacity>:
            <ActivityIndicator size="large" color={appbar} style={{alignSelf:'center'}} />}
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
    hText:{
        fontSize:25,
        marginLeft:20,
        fontWeight:'800',
        color:themeColor2,
        letterSpacing:4
    },
    button:{
        alignSelf:'center',
        marginTop:50,
        padding:10,
        backgroundColor:appbar,
        width:'70%',
        borderRadius:20,
        elevation:5
    },
    noh:{
        textAlign:'center',
        color: 'black',
        fontSize:20,
        fontWeight:'600'
    },
    container:{
        flex:1,
        width:'95%',
        flexDirection:'column',
        // justifyContent:'center',
        marginTop:80

    },
    selectContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
        marginTop:20,
        width:'85%',
        marginLeft:'7.5%'
    },
    label:{
        fontWeight:'700'
    },
    money:{
        fontSize:35,
        color:'#000',
        fontWeight:'700'
    },
    amountContainer:{
        marginTop:40,
        marginLeft:'15%',
        width: '70%'
    },
    input:{
        width:'100%',
        borderBottomColor:'#000',
        borderBottomWidth:1
    },
    amountBox:{
        padding:5,
        margin: 10,
        backgroundColor:'#ddd',
        borderRadius:15
    },
    moneyContainer:{
        flexDirection:'column',
        alignItems:'center'
    }
})

const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser
})


export default connect(mapStateToProps)(DataShow);
