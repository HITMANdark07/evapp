import React from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';


const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';

const vals = ['100','500','1000','2500'];
function Profile({navigation,currentUser}) {
    const [amount, setAmount] = React.useState("");
    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={35} />
                </TouchableOpacity>
                <Text style={styles.hText}>Profile</Text>
            </View>
            <View style={styles.container}>
            {/* <ActivityIndicator size="large" color={appbar} /> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{uri:currentUser.photo}} style={styles.photo} />
                <View style={styles.moneyContainer}>
                    <Text style={styles.name}>{currentUser.name}</Text>
                    <Text>{currentUser.email}</Text>
                </View>

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
    photo:{
        alignSelf:'center',
        height:80,
        width:80,
        borderRadius:50
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
    name:{
        fontSize:30,
        color:'#000',
        fontWeight:'300'
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
});
const mapStateToProps = (state) => ({
    currentUser : state.user.currentUser
})


export default connect(mapStateToProps)(Profile);
