import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet,TextInput,Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Ico from 'react-native-vector-icons/FontAwesome5';
import { connect, useSelector } from 'react-redux';
import { api } from '../../api.config';
import moment from 'moment';
import axios from 'axios';
import CircularProgress from '../components/CircularProgress';
import AnimatedLottieView from 'lottie-react-native';

const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';

function Charging({navigation,currentUser, route}) {

    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState(0);
    const deviceId = useSelector(state => state.user.device);
    const deviceTime = useSelector(state => state.user.time);
    const startTime = useSelector(state => state.user.startTime);

    const timer = (date = new Date(Date.now()+900000)) =>  {
        let totalTime = new Date(date).getTime()-Date.now();
        let interval = setInterval(() => {
            let progress = +((((Date.now()-new Date(startTime).getTime())/(new Date(date).getTime()-new Date(startTime).getTime()))*100).toFixed(2));
            setProgress(progress);
            setTime(parseInt((new Date(date).getTime()-Date.now())/1000));
        },1000);
        let close = setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            ToastAndroid.showWithGravity('Charging Completed',ToastAndroid.CENTER,ToastAndroid.LONG);
        },totalTime);
    }
    
    useEffect(() => {
        let interval;
        let close;
        const timer = (date = new Date(Date.now()+900000)) =>  {
            let totalTime = new Date(date).getTime()-Date.now();
                interval = setInterval(() => {
                let progress = +((((Date.now()-new Date(startTime).getTime())/(new Date(date).getTime()-new Date(startTime).getTime()))*100).toFixed(2));
                setProgress(progress);
                setTime(parseInt((new Date(date).getTime()-Date.now())/1000));
            },1000);
                close = setTimeout(() => {
                clearInterval(interval);
                setProgress(100);
                ToastAndroid.showWithGravity('Charging Completed',ToastAndroid.CENTER,ToastAndroid.LONG);
            },totalTime);
        }
        timer(deviceTime);
        return() => {
            clearInterval(interval);
            clearTimeout(close);
        }
    },[]);
    let remaining = `${parseInt((time/(60)))>9 ? parseInt((time/(60))) : "0"+parseInt((time/(60)))}:${parseInt((time%(60)))>9 ? parseInt((time%(60))) : "0"+parseInt((time%(60)))}`;
    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={35} />
                </TouchableOpacity>
                <Text style={styles.hText}>Charging</Text>
            </View>
            <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
        
            <View style={{flexDirection:'row', justifyContent:'center'}}>
            <CircularProgress percent={progress} size={200} wide={10} progressColor={themeColor2} backgroundColor="#D3D3D3" fontColor="grey" />
            </View>
            <View style={{alignSelf:'center', flexDirection:'column'}}>
                <Text style={{fontSize:30,textAlign:'center'}}>{remaining}</Text>
                <Text style={{fontSize:20,textAlign:'center'}}>Time Remaining</Text>
            </View>
            <AnimatedLottieView
                source={require('../../assets/preview2.json')}
                autoPlay
                style={{
                    position: 'relative',
                    width: '100%'
                }}
                loop
                />
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
        flex:2,
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


export default connect(mapStateToProps)(Charging);
