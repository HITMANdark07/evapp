import React from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
const Paytm = require('paytmchecksum');
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { api, callbackUrl,production_callbackUrl, mid } from '../../api.config';
import { connect, useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.action';


const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';

const vals = ['100','500','1000','2500'];
function Wallet({navigation,currentUser}) {

    const dispatch = useDispatch();
    const [amount, setAmount] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const updateTransaction = (success, data) => {
        axios({
            method:'POST',
            url:`${api}/transaction/status`,
            data:{
                orderId:data.orderId,
                checksum:data.checksum,
                success:success,
                amount:data.amount
            }
        }).then(({data}) => {
            console.log({data});
            dispatch(setCurrentUser(data.user));
        }).catch((err) => {
            console.log(err);
        })
    }

    const startTransaction = async() => {
        setLoading(true);
        if(amount<25){
            setLoading(false);
            ToastAndroid.showWithGravity("Please Enter amount greater than 25", ToastAndroid.CENTER, ToastAndroid.LONG);
            return;
        }
        try{
            let { data }  = await axios({
                method:'POST',
                url:`${api}/transaction/create`,
                data:{
                    userId:currentUser._id,
                    amount:parseFloat(amount).toFixed(2)
                }
            });
            setLoading(false);
            const { orderId, tranxToken } = data;
            console.log(orderId,tranxToken);
            AllInOneSDKManager.startTransaction(
                orderId,
                mid,
                tranxToken,
                amount,
                production_callbackUrl+orderId,
                false,
                false,
                'paytm'+mid
               )
               .then((result) => {
                   console.log(result,"result");
                   let data ={
                    orderId:result["ORDERID"],
                    checksum:result["CHECKSUMHASH"],
                    amount:result["TXNAMOUNT"]
                   }
                    if(result["STATUS"]==="TXN_SUCCESS"){
                        updateTransaction(true,data);
                        ToastAndroid.showWithGravity("Transaction Successfull", ToastAndroid.CENTER, ToastAndroid.LONG);
                    }else if(result["STATUS"]==="TXN_FAILURE"){
                        updateTransaction(false,data);
                        ToastAndroid.showWithGravity("Transaction Failed", ToastAndroid.CENTER, ToastAndroid.LONG)
                    }else{
                        updateTransaction(false,data);
                        ToastAndroid.showWithGravity("Something Went Wrong", ToastAndroid.CENTER, ToastAndroid.LONG)
                    }
                    setAmount("");
               })
               .catch((err) => {
                console.error(err);
               });
        }catch(err){
            setLoading(false);
            console.log("here...!",err);
        }
    }

    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={35} />
                </TouchableOpacity>
                <Text style={styles.hText}>Wallet</Text>
            </View>
            <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Icon name="wallet" size={60} style={styles.wallet} color={appbar} />
                <View style={styles.moneyContainer}>
                    <Text style={styles.money}>??? {currentUser.balance?.toFixed(2)}</Text>
                    <Text>Current Balance</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.label}>Enter Amount</Text>
                    <TextInput style={styles.input} value={amount}  onChangeText={(e) => setAmount(e)}  keyboardType='numeric'/>
                    <Text style={{textAlign:'center', marginTop:10}}>Min ???25/- </Text>
                </View>
                <View style={styles.selectContainer}>
                    {vals.map((val) =>(
                        <TouchableOpacity style={styles.amountBox} key={val} activeOpacity={0.5} onPress={() => setAmount(val)}>
                        <Text style={{color:'#000', paddingLeft:5, paddingRight:5,}}>+ ???{val}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {loading ? 
                    <ActivityIndicator size="large" color={appbar} />
                    :
                    <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={startTransaction}>
                    <Text style={{textAlign:'center', fontWeight:'800', color:'#fff', fontSize:18}}>ADD  MONEY</Text>
                    </TouchableOpacity>
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
        marginTop:100

    },
    moneyContainer:{
        flexDirection:'column',
        alignItems:'center'
    }
})

const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser
})


export default connect(mapStateToProps)(Wallet);
