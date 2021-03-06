import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet,TextInput,Image, TouchableOpacity, ActivityIndicator } from 'react-native';
const Paytm = require('paytmchecksum');
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Ico from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { api } from '../../api.config';
import moment from 'moment';
import axios, { Axios } from 'axios';


const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';


const HistoryCard = ({charging}) => {

    const getColor = (status) => {
        switch (status){
            case 'CHARGING':
                return '#FFFF00';
            case 'FAILED':
                return '#FF0000';
            case 'CHARGED':
                return 'green'
            default:
                return '#FFFF00';
        }
    }
    return(
        <TouchableOpacity activeOpacity={0.4}>
              <View style={{display:'flex',flexDirection:'row', margin:10, flex:1, backgroundColor:themeColor2, padding:10, borderRadius:20}}>
                <Image
                    source={{uri: `${api}/device/qr/image/${charging?.device?._id}`}}
                    style={{height: 60, width: 60, borderRadius: 50, alignSelf: 'center'}}
                />
                <View style={{flex:1, justifyContent:'center', flexDirection:'column'}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#fff', marginLeft:15, fontSize:18}}>Amount: ₹{charging.amount}/-</Text>
                    <Text style={{backgroundColor:getColor(charging.status), marginLeft:5, padding:10, paddingVertical:2, fontWeight:'500', borderRadius:10, color:'#fff'}}>
                        {charging.status}
                    </Text>
                    </View>
                    <Text style={{color:'#fff', marginLeft:15,fontSize:12, fontWeight:'300'}}>Device ID: {charging?.device?.code}</Text>
                    <Text style={{color:'#fff', marginLeft:15,fontSize:10, fontWeight:'300'}}>created on: {moment(charging.createdAt).fromNow()}</Text>
                </View>
              </View>
          </TouchableOpacity>
    )
}


function History({navigation,currentUser}) {
    const [histories, setHistories] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const limit = 10;
    const [skip, setSkip] = useState(0);
    const [shouldSendReq, setShouldSendReq] = useState(true);
    const init = (limit,skip) => {
        let cancelToken = axios.CancelToken.source();
        setLoading(true);
        axios({
            method:'GET',
            url:`${api}/charge/list/${currentUser._id}?limit=${limit}&skip=${skip}`,
            cancelToken:cancelToken.token
        }).then(({data}) => {
            // console.log(data)
            setHistories((prevData => [...prevData,...data.chargings]));
            if(data.chargings.length<limit) setShouldSendReq(false);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
        return cancelToken;
    }

    useEffect(() => {
        let cToken = init(limit,skip);
        return () => {
            cToken.cancel();
        }
    },[limit,skip]);
    const fetchMoreRecords = () => {
        if(shouldSendReq){
            setSkip((prev) => prev+limit);
        }else{
            console.log("No more records");
        }
    }
    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={35} />
                </TouchableOpacity>
                <Text style={styles.hText}>Charging History</Text>
            </View>
            <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} onEnded={fetchMoreRecords}>
                
            {histories.length===0 && !loading &&
            <>
            <Text style={styles.noh}>No History Available</Text>
            <Ico name='sad-tear' color={appbar} size={70} style={{alignSelf:'center', marginTop:20}} />
            </>}
            {histories.map((charging) => (
                <HistoryCard key={charging._id} charging={charging} />
            ))}
            {loading && <ActivityIndicator size="large" color={appbar} />}
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
})

const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser
})


export default connect(mapStateToProps)(History);
