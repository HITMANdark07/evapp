import React from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import {
  View,Text,Image
} from 'react-native';

const slides = [
  {
    key: 1,
    title: 'WELCOME TO EV APP',
    data:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    text: 'Scan QR and charge.\nyour EV from Power Station nearby',
    image: require('../../assets/preview1.json'),
    backgroundColor: '#7Cb342',
  },
  {
    key: 2,
    data:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    title: 'EV APP Intro 2',
    text: 'Other cool stuff',
    image: require('../../assets/preview2.json'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'EV APP Intro 3',
    data:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    text: 'I\'m already out of descriptions \nLorem ipsum bla bla bla',
    image: require('../../assets/preview3.json'),
    backgroundColor: '#7Cb342',
  }
];
const styles = StyleSheet.create({
  slide:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    height: '100%',
  },
  image:{
    alignSelf:'center',
    position:'absolute',
    justifyContent:'center',
  },
  data:{
    position:'absolute',
    top:80,
    fontSize:18,
    alignSelf:'center',
    textAlign:'center',
    color:'#fff'
  },
  title:{
    alignSelf:"center",
    position:'absolute',
    fontSize:30,
    fontWeight:'700',
    top:20,
    color:'#ffffff',
    fontFamily:'Helvetica'
  },
  text:{
    alignSelf:"center",
    textAlign:'center',
    position:'absolute',
    color:"#ffffff",
    fontSize:18,
    bottom:150,
    fontFamily:'Helvetica'
  }
});

const Intro = ({navigation})  => {

  const [showApp, setShowApp] = React.useState(false);

  const screen = ({item}) => {
    return(
    <View style={{...styles.slide,backgroundColor:item.backgroundColor,flex:2}} >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.data} >{item.data}</Text>
      <LottieView
          source={item.image}
          autoPlay
          style={styles.image}
          loop
        />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  )};
  
    return (
        <AppIntroSlider renderItem={screen}  data={slides} onDone={() => {
            navigation.navigate('Login');
        }} />
    )

};


export default Intro;
