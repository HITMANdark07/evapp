import React from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
const Paytm = require('paytmchecksum');
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Ico from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';


const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';

function History({navigation,currentUser}) {
    const [histories, setHistories] = React.useState("");
    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={35} />
                </TouchableOpacity>
                <Text style={styles.hText}>Charging History</Text>
            </View>
            <View style={styles.container}>
            {/* <ActivityIndicator size="large" color={appbar} /> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                
            {histories.length===0 && 
            <>
            <Text style={styles.noh}>No History Available</Text>
            <Ico name='sad-tear' color={appbar} size={70} style={{alignSelf:'center', marginTop:20}} />
            </>}

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
        width:'80%',
        flexDirection:'column',
        // justifyContent:'center',
        marginTop:100

    },
})

const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser
})


export default connect(mapStateToProps)(History);
