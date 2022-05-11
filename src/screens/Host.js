import React from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.action';
import DeviceCard from '../components/DeviceCard';


const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';

function Host({navigation,currentUser}) {

    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    
    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={35} />
                </TouchableOpacity>
                <Text style={styles.hText}>Manage Devices</Text>
            </View>
            <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <DeviceCard />
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
        width:'90%',
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


export default connect(mapStateToProps)(Host);
