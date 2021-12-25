import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Text,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import RBSheet from 'react-native-raw-bottom-sheet';
import LottieView from 'lottie-react-native';
import Torch from 'react-native-torch';
import {RNCamera} from 'react-native-camera';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Entypo';
import Ic from 'react-native-vector-icons/Ionicons';
import Ico from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';

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
  const [torchState, setTorchState] = React.useState(0);
  const refRBSheet = useRef();
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

  const dummy = [
    {
      deviceId:"f313db",
      distance:"3.0 KM",
      status:'Available',
      timing: '24/7',
      rate: '17'
    },
    {
      deviceId:"f123db",
      distance:"6.0 KM",
      status:'Not Available',
      timing: '24/7',
      rate: '8'
    },
    {
      deviceId:"f313fb",
      distance:"12.0 KM",
      status:'Available',
      timing: '24/7',
      rate: '10'
    },
    {
      deviceId:"f456db",
      distance:"11.0 KM",
      status:'Available',
      timing: '24/7',
      rate: '11'
    },
    {
      deviceId:"f323jb",
      distance:"12.2 KM",
      status:'Available',
      timing: '24/7',
      rate: '12'
    },
    {
      deviceId:"f313de",
      distance:"13.0 KM",
      status:'Not Available',
      timing: '24/7',
      rate: '18'
    },
  ]
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
        />
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.menuhead}>
            <Ico name="arrow-back" size={25} color={themeColor1} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
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
          {dummy.map((dum) => (
            <TouchableOpacity style={styles.hView} key={dum.deviceId} activeOpacity={0.5}>
            <View style={styles.cardContainer}>
              <Image style={{width: 60, height: 80, backgroundColor: '#fff'}} source={{uri:"https://www.eee.upd.edu.ph/sites/default/files/media/news/rapid-electric-vehicle-charging-%E2%80%93-charging-minutes-charm/5-charm-rapid-charging-station.jpg"}}/>
              <View style={styles.cardContents}>
                <Text style={styles.deviceId}>{dum.deviceId}</Text>
                <Text style={[styles.cardStatus,{backgroundColor:dum.status==='Not Available' ? 'red':appbar}]}>{dum.status}</Text>
                <Text style={{color: themeColor1}}><Text style={{fontWeight:'700'}}>Distance:</Text> {dum.distance}</Text>
                <Text style={{color: themeColor1}}><Text style={{fontWeight:'700'}}>Timings:</Text> open {dum.timing}</Text>
                <Text style={{color: themeColor1}}><Text style={{fontWeight:'700'}}>Rate:</Text> ₹ {dum.rate}/Unit</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.menu}>
            <Ic name="home" size={25} color={themeColor1} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <View style={styles.menuqr}>
            <Ic name="qr-code" size={30} color={themeColor1} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.menu}>
            <Ic name="location-outline" size={25} color={themeColor1} />
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
    borderRadius: 5,
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
  },
});

export default Home;
