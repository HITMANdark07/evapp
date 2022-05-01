import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Text,
  Image,
  Vibration
} from 'react-native';
import usr from '../../assets/user.png'
import Geolocation from 'react-native-geolocation-service';
import RBSheet from 'react-native-raw-bottom-sheet';
import LottieView from 'lottie-react-native';
import Torch from 'react-native-torch';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {RNCamera} from 'react-native-camera';
import { api } from '../../api.config';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Entypo';
import Ic from 'react-native-vector-icons/Ionicons';
import Ico from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import { Marker } from 'react-native-maps';

const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';
const Home = ({navigation}) => {
  const [position, setPosition] = React.useState({
    latitude: 22.5509376,
    longitude: 88.3884032,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [devices, setDevices] = useState([]);
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // earth radius in km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  function toRad(Value) {
      return Value * Math.PI / 180;
  }

  const init = async(pos) => {
    try{
      const {data} = await axios({
        method:'GET',
        url:`${api}/device/list`
      });
      const dvs = [];
      data?.forEach((device) => {
        dvs.push({
          ...device,
          location:{
            latitude:device.location.lat,
            longitude:device.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          distance:+(calcCrow(pos.latitude, pos.longitude,device.location.lat,device.location.lng ).toFixed(2))
        })
      })
      dvs.sort((a,b) => {
        return a.distance - b.distance;
      })
      setDevices(dvs);
      // console.log(dvs);
    }catch(err){
      console.log(err);
    }
  }
  const [torchState, setTorchState] = React.useState(0);
  const refRBSheet = useRef();
  const deviceTime = useSelector(state => state.user.time);

  const shouldNavigate = (time) => {
    console.log(time);
    if(time && new Date(time).getTime()>Date.now()){
      return false;
    }
    return true;
  }
  const camRef = useRef();
  const requestPermission = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      Geolocation.getCurrentPosition(
        position => {
          var lat = parseFloat(position.coords.latitude);
          var long = parseFloat(position.coords.longitude);

          var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0822,
            longitudeDelta: 0.0621,
          };
          setPosition(initialRegion);
          init(initialRegion);
        },
        error => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'EvCharge App need Permission',
          message:
            'EvCharge App needs access to your GPS ' +
            'so you can see nearby stations.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    }
  };
  React.useEffect(() => {
    requestPermission();
    () => {
      Torch.switchState(false);
      setTorchState(false);
    };
  }, []);

  
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 4}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          zoomEnabled
          region={position}
        >
          <Marker
          image={usr}
          style={{width:50, height:50}}
          coordinate={position}
          title="YOU"
        />
        {
          devices.map((device) => {
            return(<Marker
              key={device.code}
              coordinate={device.location}
              title={device.code}
            />)
          })
        }
        </MapView>
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.menuhead}>
            <Ico name="arrow-back" size={25} color={themeColor1} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          if(shouldNavigate(deviceTime)){
            refRBSheet.current.open()
          }else{
            navigation.navigate('Charging');
          }
        }}>
          <View style={styles.menuhead}>
            <Ic name="qr-code" size={25} color={themeColor1} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: 110}}>
        <View style={{flexDirection: 'row'}}>
          {devices.map((device) => (
            <TouchableOpacity style={styles.hView} key={device.code} activeOpacity={0.5}>
            <View style={styles.cardContainer}>
              <Image style={{width: 60, height: 80, backgroundColor: '#fff'}} source={{uri:"https://www.eee.upd.edu.ph/sites/default/files/media/news/rapid-electric-vehicle-charging-%E2%80%93-charging-minutes-charm/5-charm-rapid-charging-station.jpg"}}/>
              <View style={styles.cardContents}>
                <Text style={styles.deviceId}>{device.code}</Text>
                <Text style={[styles.cardStatus,{backgroundColor:device?.inuse ? 'red':appbar}]}>{device.inuse ? 'NOT AVAILABLE': 'AVAILABLE'}</Text>
                <Text style={{color: themeColor1}}><Text style={{fontWeight:'700'}}>Distance:</Text> {device?.distance} Km</Text>
                {/* <Text style={{color: themeColor1}}><Text style={{fontWeight:'700'}}>Timings:</Text> open {device.timing}</Text> */}
                <Text style={{color: themeColor1}}><Text style={{fontWeight:'700'}}>Rate:</Text> ₹ {device.rate}/Unit</Text>
              </View>
              <View style={{padding:5}}>
                <Icons name="direction" size={45} color={themeColor1} />
              </View>
            </View>
          </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} >
          <View style={styles.menu}>
            <Ic name="home" size={25} color={themeColor1} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if(shouldNavigate(deviceTime)){
            refRBSheet.current.open()
          }else{
            navigation.navigate('Charging');
          }
        }}>
          <View style={styles.menuqr}>
            <Ic name="qr-code" size={30} color={themeColor1} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => requestPermission()}>
          <View style={styles.menu}>
            <Ico name="gps-fixed" size={25} color={themeColor1} />
          </View>
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={450}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <RNCamera
          ref={camRef}
          style={{
            flex: 1,
            marginTop: 10,
          }}
          // defaultTouchToFocus
          mirrorImage={false}
          flashMode={torchState}
          // aspect={RNCamera.Constants.Aspect.Fil}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
          onBarCodeRead={barcode => {
            if (barcode.type == 'QR_CODE') {
              refRBSheet.current.close();
              Vibration.vibrate(500);
              navigation.navigate('DataShow', {
                data: barcode.data,
              });
            } else {
              refRBSheet.current.close();
              Vibration.vibrate(1000);
              alert('Invalid QR Code');
            }
          }}
          // onGoogleVisionBarcodesDetected={(data) => {
          //   console.log(data);
          // }}
        />
        {/* <Image source={require('../../assets/qr.png')}  /> */}
        <LottieView
          source={require('../../assets/qr.json')}
          autoPlay
          style={{
            position: 'absolute',
            height: 400,
            width: 400,
            bottom: 40,
            alignSelf: 'center',
          }}
          loop
        />
        <TouchableOpacity
          style={{position: 'absolute', right: 0, padding: 15}}
          onPress={() => {
            refRBSheet.current.close();
          }}>
          <Ico name="close" size={35} color={'#fff'} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            padding: 40,
          }}>
          <TouchableOpacity
            onPress={() => {
              let tstate = torchState;
              if (tstate == RNCamera.Constants.FlashMode.off) {
                tstate = RNCamera.Constants.FlashMode.torch;
              } else {
                tstate = RNCamera.Constants.FlashMode.off;
              }
              setTorchState(tstate);
            }}>
            <View
              style={{
                backgroundColor: torchState ? themeColor2 : appbar,
                padding: 8,
                borderRadius: 50,
              }}>
              <Ic
                name={torchState ? 'flashlight' : 'flashlight-outline'}
                size={30}
                color={themeColor1}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                backgroundColor: appbar,
                padding: 10,
                borderRadius: 10,
                fontSize: 18,
              }}>
              Enter Device Id
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    top: 0,
  },
  deviceId:{
    color: themeColor1, 
    fontWeight: '700'
  },
  hView: {
    margin: 20,
    backgroundColor: themeColor2,
    padding: 10,
    borderRadius: 15,
  },
  cardStatus:{
    color: themeColor1,
    backgroundColor: appbar,
    padding: 3,
    borderRadius: 5,
  },
  cardContents:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  menuhead: {
    padding: 8,
    margin: 10,
    marginLeft:15,
    marginRight:15,
    backgroundColor: themeColor2,
    borderRadius: 50,
  },
  menu: {
    padding: 8,
    margin: 10,
    marginLeft:15,
    marginRight:15,
    backgroundColor: themeColor2,
    borderRadius: 30,
  },
  menuqr: {
    padding: 8,
    margin: 10,
    marginLeft:15,
    marginRight:15,
    backgroundColor: themeColor2,
    borderRadius: 30,
  },
  footer: {
    display: 'flex',
    paddingLeft:10,
    paddingRight:10,
    position: 'absolute',
    width: '100%',
    backgroundColor: appbar,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
    borderTopLeftRadius:30,
    borderTopRightRadius:30
  },
});

export default Home;
