import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TextInput,Image, TouchableOpacity, ActivityIndicator } from 'react-native';
const Paytm = require('paytmchecksum');
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Ico from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { api } from '../../api.config';


const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';

const TransactionCard = ({transaction}) => {
      return(
          <TouchableOpacity activeOpacity={0.4}>
                <View style={{display:'flex',flexDirection:'row', margin:10, flex:1, backgroundColor:themeColor2, padding:10, borderRadius:20}}>
                  <Image
                      source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8kIvj19ydPyz9xLz239ld6OLICeVttaGNtw&usqp=CAU'}}
                      style={{height: 60, width: 60, borderRadius: 50, alignSelf: 'center'}}
                  />
                  <View style={{flex:1, justifyContent:'center', flexDirection:'column'}}>
                      <View style={{flexDirection:'row'}}>
                      <Text style={{color:'#fff', marginLeft:15, fontSize:18}}>Amount: ₹{transaction.amount}/-</Text>
                      <Text style={{backgroundColor:transaction.status==='PENDING' ? 'yellow' : transaction.status==="SUCCESS" ? 'green' : 'red', marginLeft:5, padding:10, paddingVertical:2, fontWeight:'500', borderRadius:10, color:transaction.status==='PENDING' ? '#000':'#fff'}}>
                          {transaction.status}
                      </Text>
                      </View>
                      <Text style={{color:'#fff', marginLeft:15,fontSize:12, fontWeight:'300'}}>Transaction ID: {transaction._id}</Text>
                      <Text style={{color:'#fff', marginLeft:15,fontSize:10, fontWeight:'300'}}>created on: {moment(transaction.createdAt).fromNow()}</Text>
                  </View>
                </View>
            </TouchableOpacity>
      )
  }

function Transactions({navigation,currentUser}) {
    const [transactions, setTransactions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const limit = 10;
    const [skip, setSkip] = useState(0);
    const init = () => {
        setLoading(true);
        axios({
            method:'GET',
            url:`${api}/transactions/list/${currentUser._id}?limit=${limit}&skip=${skip}`
        }).then(({data}) => {
            setTransactions(data.transactions);
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
                <Text style={styles.hText}>Transactions History</Text>
            </View>
            <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color={appbar} />}
            <ScrollView showsVerticalScrollIndicator={false}>
                
            {transactions.length===0 && !loading &&
            <>
            <Text style={styles.noh}>No Transactions Available</Text>
            <Ico name='sad-tear' color={appbar} size={70} style={{alignSelf:'center', marginTop:20}} />
            </>}
            {transactions.map((transaction) => (
                <TransactionCard key={transaction._id} transaction={transaction} />
            ))}
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
        marginLeft:15,
        fontWeight:'800',
        color:themeColor2,
        letterSpacing:2
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


export default connect(mapStateToProps)(Transactions);
