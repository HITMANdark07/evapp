import React from 'react';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';

const Splash = ({navigation,currentUser}) => {

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if(currentUser){
        navigation.navigate('HomeScreen')
      }else{
        navigation.navigate('Intro')
      }
    },1500);
    () => timer;
  },[currentUser]);

  return (
    <LottieView
      source={require('../../assets/splash.json')}
      autoPlay
      loop={false}
      onAnimationFinish={()=> {
        if(currentUser){
          navigation.navigate('HomeScreen')
        }else{
          navigation.navigate('Intro')
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  currentUser : state.user.currentUser
})

export default connect(mapStateToProps)(Splash);
