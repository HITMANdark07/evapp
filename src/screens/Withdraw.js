import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity,Image, ActivityIndicator, ToastAndroid } from 'react-native';
import {api} from '../../api.config';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.action';


const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';


const RequestCard = ({requests}) => {
    const getColorFromStatus =  (status) => {
        if(status==="PENDING"){
            return 'yellow';
        }else if(status==="SUCCESS"){
            return '#7Cb342';
        }else{
            return '#FF0000';
        }
    }
      return(
          <TouchableOpacity activeOpacity={0.4}>
                <View style={{display:'flex',flexDirection:'row', margin:5, flex:1, backgroundColor:themeColor2, padding:10, borderRadius:20}}>
                  <Image
                      source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8kIvj19ydPyz9xLz239ld6OLICeVttaGNtw&usqp=CAU'}}
                      style={{height: 60, width: 60, borderRadius: 50, alignSelf: 'center'}}
                  />
                  {requests.accountNumber ? 
                  (
                    <View style={{flex:1, justifyContent:'center', flexDirection:'column'}}>
                    <Text style={{color:'#fff', marginLeft:15, fontSize:18}}>Amount : ₹{requests.amount}/-</Text>
                    <Text style={{color:'#fff', marginLeft:15,fontSize:12, fontWeight:'300'}}>Bank Name: {requests.bankName}</Text>
                    <Text style={{color:'#fff', marginLeft:15,fontSize:12, fontWeight:'300'}}>Account No.: {requests.accountNumber}</Text>
                    <Text style={{color:'#fff', marginLeft:15,fontSize:12, fontWeight:'300'}}>IFSC Code: {requests.ifsc}</Text>
                    <View style={{display:'flex',flexDirection:'row',marginLeft:15}}>
                    <Text style={{color:getColorFromStatus(requests.status)==='yellow' ? 'black' : '#fff',fontSize:12, fontWeight:'400',paddingHorizontal:8,paddingVertical:2,borderRadius:5, backgroundColor:getColorFromStatus(requests.status)}}>{requests.status}</Text>
                    </View>
                    <Text style={{color:'#fff', marginLeft:15,fontSize:10, fontWeight:'300'}}>{moment(requests.createdAt).fromNow()}</Text>
                    </View>
                  )
                  :
                  (
                    <View style={{flex:1, justifyContent:'center', flexDirection:'column'}}>
                    <Text style={{color:'#fff', marginLeft:15, fontSize:18}}>Amount : ₹{requests.amount}/-</Text>
                    <Text style={{color:'#fff', marginLeft:15,fontSize:12, fontWeight:'300'}}>UPI ID: {requests.upiId}</Text>
                    <View style={{display:'flex',flexDirection:'row',marginLeft:15}}>
                    <Text style={{color:getColorFromStatus(requests.status)==='yellow' ? 'black' : '#fff',fontSize:12, fontWeight:'400',paddingHorizontal:8,paddingVertical:2,borderRadius:5, backgroundColor:getColorFromStatus(requests.status)}}>{requests.status}</Text>
                    </View>
                    <Text style={{color:'#fff', marginLeft:15,fontSize:10, fontWeight:'300'}}>{moment(requests.createdAt).fromNow()}</Text>
                    </View>
                  )}
                </View>
            </TouchableOpacity>
      )
}

function Withdraw({navigation,currentUser}) {

    const dispatch = useDispatch();
    const [withdrawls, setWithDrawls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [upiId, setUpiId] = useState('');
    const [coin, setCoin]  = useState('');
    const [screen , setScreen] = useState('UPI');
    const [requests,setRequests] = useState([]);
    const [accountno, setAccountno] = useState('');
    const [bankName, setBankName] = useState('');
    const [ifsc, setIfsc] = useState('');

    const init = () => {
        setLoading(true);
        axios({
            method:'GET',
            url:`${api}/withdrawl/list?user=${currentUser._id}`
        }).then(({data}) => {
            setWithDrawls(data.withdrawlRequests);
            setLoading(false);
        }).catch((err) =>{
            console.log(err);
            setLoading(false);
        })
    }

    const createUpiRequest = () => {
        if(!upiId){
            ToastAndroid.showWithGravity("Please Enter Required Details",ToastAndroid.CENTER,ToastAndroid.LONG);
            return;
        }
        setLoading2(true);
        axios({
            method:'POST',
            url:`${api}/withdrawl/create`,
            data:{
                user:currentUser._id,
                upiId:upiId
            }
        }).then(({data}) => {
            if(data._id) init();
            setLoading2(false);
            setUpiId('');
        }).catch((err) => {
            ToastAndroid.showWithGravity(err?.response?.data?.message,ToastAndroid.CENTER,ToastAndroid.LONG);
            setLoading2(false);
        })
    }
    const createBankRequest = () => {
        if(!bankName || !accountno || !ifsc){
            ToastAndroid.showWithGravity("Please Enter Required Details",ToastAndroid.CENTER,ToastAndroid.LONG);
            return;
        }
        setLoading2(true);
        axios({
            method:'POST',
            url:`${api}/withdrawl/create`,
            data:{
                user:currentUser._id,
                bankName:bankName,
                accountNumber:accountno,
                ifsc:ifsc
            }
        }).then(({data}) => {
            if(data._id) init();
            setLoading2(false);
            setBankName('');
            setAccountno('');
            setIfsc('');
        }).catch((err) => {
            ToastAndroid.showWithGravity(err?.response?.data?.message,ToastAndroid.CENTER,ToastAndroid.LONG);
            setLoading2(false);
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
                <Text style={styles.hText}>Withdraw Money</Text>
            </View>
            <View style={styles.container}>
            <View style={{marginBottom:10}}>

            <View style={{display:'flex',alignItems:'center', flexDirection:'column'}}>
                <Icon name="wallet" size={60} color={appbar} />
                <Text style={styles.moneytxt}>₹{currentUser?.balance?.toFixed(2)}/-</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly',marginTop:15}}>
                <TouchableOpacity style={{backgroundColor:'green', minWidth:80, borderRadius:10, padding:10,borderColor:appbar,borderWidth: screen==='UPI'? 3 :0}}
                onPress={() => setScreen('UPI')}>
                <Text style={{color:'white', fontWeight:'700', fontSize:22, textAlign:'center'}}>UPI</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'green', minWidth:80, borderRadius:10, padding:10,borderColor:appbar,borderWidth: screen==='BANK' ? 3: 0}}
                onPress={() => setScreen('BANK')}>
                <Text style={{color:'white', fontWeight:'700', fontSize:22,textAlign:'center'}}>BANK</Text>
                </TouchableOpacity>
            </View>
            {screen==='UPI' ?
            (<View style={{display:'flex', flexDirection:'column', marginTop:20}}>
                <TextInput keyboardType='default' value={upiId} onChangeText={(e) => {
                    setUpiId(e);
                }} placeholder='Enter UPI Id' style={styles.inp} />
                {loading2 ?
                (<ActivityIndicator size="large" color={appbar} />)
                :
                (<TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={createUpiRequest} >
                    <Text style={{textAlign:'center', fontWeight:'800', color:'#fff', fontSize:18}}>SEND REQUEST</Text>
                </TouchableOpacity>)
                }
            </View>)
            :
            (<View style={{display:'flex', flexDirection:'column'}}>
                <TextInput keyboardType='default' value={bankName} onChangeText={(e) => {
                    setBankName(e);
                }} placeholder='Bank Name' style={styles.inp} />
                <TextInput keyboardType='numeric' value={accountno} onChangeText={(e) => {
                    setAccountno(e);
                }} placeholder='Account Number' style={styles.inp} />
                <TextInput keyboardType='default' value={ifsc} onChangeText={(e) => {
                    setIfsc(e);
                }} placeholder='IFSC Code' style={styles.inp} />
                {loading2 ?
                (<ActivityIndicator size="large" color={appbar} />)
                :
                (<TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={createBankRequest}>
                    <Text style={{textAlign:'center', fontWeight:'800', color:'#fff', fontSize:18}}>SEND REQUEST</Text>
                </TouchableOpacity>)}
            </View>)        
            }
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            {loading && <ActivityIndicator size="large" color={appbar} />}
            {
                withdrawls.map((requests) => (
                    <RequestCard key={requests._id} requests={requests} />
                ))
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
    button:{
        alignSelf:'center',
        marginTop:50,
        padding:10,
        backgroundColor:appbar,
        width:'70%',
        borderRadius:20
    },
    inp:{
        borderWidth:0.6,
        borderColor:'grey',
        borderRadius:5,
        padding: 5,
        marginTop:8
    },
    moneytxt:{
        fontSize:18,
        fontWeight:'500',
        color: 'black'
    },
    wallet:{
        alignSelf:'center'
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
    selectContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:20
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
        marginTop:80,
    },
    input:{
        width:'100%',
        borderBottomColor:'#000',
        borderBottomWidth:1
    },
    amountBox:{
        padding:5,
        backgroundColor:'#ddd',
        borderRadius:15
    },
    hText:{
        fontSize:25,
        marginLeft:20,
        fontWeight:'800',
        color:themeColor2,
        letterSpacing:4
    },
    container:{
        flex:1,
        width:'80%',
        flexDirection:'column',
        // justifyContent:'center',
        marginTop:50

    },
    moneyContainer:{
        flexDirection:'column',
        alignItems:'center'
    }
})

const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser
})


export default connect(mapStateToProps)(Withdraw);
