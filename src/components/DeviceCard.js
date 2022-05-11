import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const appbar = '#7Cb342';
const DeviceCard = () => {
    const [email, setEmail] = useState("");
    console.log(email)
    return (
        <View style={styles.main}>
            <Text style={styles.code}>DEVICE CODE: KOL220</Text>
        <View style={styles.details}>
        <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8kIvj19ydPyz9xLz239ld6OLICeVttaGNtw&usqp=CAU'}} style={{height: 100, width: 100, alignSelf: 'center'}} />
        <View style={styles.detail}>
            <Text style={styles.txt}>Device Code : KOL220</Text>
            <Text style={styles.txt}>Device Type : GSM</Text>
            <Text style={styles.txt}>Device Number : 9876543210</Text>
            <Text style={styles.txt}>PRIVATE</Text>
        </View>
        </View>
        <TouchableOpacity style={styles.button} activeOpacity={0.6}>
            <Icon name="doubleright" color="#fff" size={25} />
            <Text style={styles.btntxt}>CHANGE TO PRIVATE</Text>
        </TouchableOpacity>
        <Text style={{fontSize:16,fontWeight:'500', color:'black'}}>Members:</Text>
        <Text>shekharkumar235838@gmail.com</Text>
        <TextInput keyboardType='email-address' value={email} onChangeText={(e) => setEmail(e)} style={styles.inp} placeholder='Add members email address' /> 
        <TouchableOpacity style={styles.button2} activeOpacity={0.6}>
            <Icon name="addusergroup" color="#fff" size={25} />
            <Text style={styles.btntxt}>ADD MEMBERS</Text>
        </TouchableOpacity>
        </View>
    )
}

export default DeviceCard;

const styles = StyleSheet.create({
    main:{
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        padding: 15,
        borderWidth:1,
        borderColor:'grey',
        margin: 5
    },
    inp:{
        borderWidth:0.6,
        borderColor:'grey',
        borderRadius:5,
        padding: 5,
        marginTop:6
    },
    txt:{
        color: 'black',
        fontWeight:'500'
    },
    details:{
        display: 'flex',
        flexDirection:'row'
    },
    detail:{
        display: 'flex',
        flexDirection:'column',
        paddingHorizontal: 8,
        justifyContent:'space-between'
    },
    code:{
        color: 'black',
        fontWeight:'500'
    },
    btntxt:{
        marginLeft:10,
        fontWeight:'700',
        color: 'white',
        letterSpacing:3
    },
    button:{
        display: 'flex',
        flexDirection:'row',
        alignSelf:'center',
        alignItems:'center',
        padding:10,
        marginTop:5,
        backgroundColor:appbar,
        width:'100%',
        borderRadius:5
    },
    button2:{
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        marginTop:5,
        backgroundColor:appbar,
        width:'70%',
        borderRadius:5
    },
})