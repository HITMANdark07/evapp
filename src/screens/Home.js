import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Text,
  ScrollView,
  Vibration,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import RBSheet from 'react-native-raw-bottom-sheet';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ico from 'react-native-vector-icons/MaterialIcons';
import Ic from 'react-native-vector-icons/Ionicons';
import Torch from 'react-native-torch';
import { connect } from 'react-redux';
import {RNCamera} from 'react-native-camera';

const themeColor1 = '#fff';
const themeColor2 = '#33691E';
const appbar = '#7Cb342';
const Home = ({navigation,currentUser}) => {
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
    }
  }, []);
  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 4, marginTop: 85, marginBottom: 90}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                width: '90%',
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: '600',
                color: '#000',
                marginBottom: 10,
              }}>
              Find Chargers
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
              navigation.navigate('Maps');
            }}>
              <Image
                style={{
                  width: '92%',
                  height: 200,
                  alignSelf: 'center',
                  borderColor: themeColor2,
                  borderWidth: 1,
                  borderRadius: 15,
                }}
                source={require('../../assets/images/maps.png')}
              />
              <LottieView
                source={require('../../assets/maps.json')}
                autoPlay
                loop
              />
            </TouchableOpacity>
          </View>
          
          <View style={{flex: 1, marginTop: 10}}>
            <Text
              style={{
                width: '90%',
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: '600',
                color: '#000',
              }}>
              Quick Actions
            </Text>

            <View style={styles.quickContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <View style={styles.quicklelem}>
                    <Ico
                      name="qr-code"
                      style={{alignSelf: 'center'}}
                      size={40}
                      color={themeColor1}
                    />
                    <Text style={styles.quickText}>Charge</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity >
                  <View style={styles.quicklelem}>
                    <Ico
                      name="account-balance-wallet"
                      style={{alignSelf: 'center'}}
                      size={40}
                      color={themeColor1}
                    />
                    <Text style={styles.quickText}>EV Wallet</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.quicklelem}>
                    <Ico
                      name="history"
                      style={{alignSelf: 'center'}}
                      size={40}
                      color={themeColor1}
                    />
                    <Text style={styles.quickText}>History</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.quicklelem}>
                    <Ico
                      name="support-agent"
                      style={{alignSelf: 'center'}}
                      size={40}
                      color={themeColor1}
                    />
                    <Text style={styles.quickText}>Support</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('Maps');
                  }}>
                  <View style={styles.quicklelem}>
                    <Ico
                      name="location-on"
                      style={{alignSelf: 'center'}}
                      size={40}
                      color={themeColor1}
                    />
                    <Text style={styles.quickText}>Locate</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </View>


        <View>
          <Text style={{fontSize:13, textAlign:'center'}}>{JSON.stringify(currentUser)}</Text>
        </View>
      </ScrollView>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={styles.menuhead}>
            <Icon name="menu" size={25} color={themeColor1} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 30, color: '#fff', fontWeight: '700'}}>
            EV
            <Ico name="flash-on" size={30} />
            APP
          </Text>
        </View>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <View style={styles.menuhead}>
            <Ic name="qr-code" size={25} color={themeColor1} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.menu}>
            <Ic name="home" size={25} color={themeColor1} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <View style={styles.menu}>
            <Ic name="qr-code" size={30} color={themeColor1} />
          </View>
        </TouchableOpacity >
        <TouchableOpacity onPress={() => {
              navigation.navigate('Maps');
            }}>
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
            if(barcode.type=='QR_CODE'){
              refRBSheet.current.close();
              Vibration.vibrate(500);
              navigation.navigate('DataShow', {
                data:barcode.data
              });
            }else{
              refRBSheet.current.close();
              Vibration.vibrate(1000);
              alert("Invalid QR Code")
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
            position:'absolute',
            height:400,
            width:400,
            bottom:40,
            alignSelf:'center'
          }}
          loop
        />
        <TouchableOpacity style={{position:'absolute',right:0, padding:15}} onPress={() => {
          refRBSheet.current.close();
        }}>
        <Ico name="close"  size={35} color={"#fff"} />
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
          <TouchableOpacity onPress={() => {
            let tstate = torchState;
            if (tstate == RNCamera.Constants.FlashMode.off){
               tstate = RNCamera.Constants.FlashMode.torch;
            } else {
               tstate = RNCamera.Constants.FlashMode.off;
            }
            setTorchState(tstate);
          }}>
          <View style={{ backgroundColor:torchState ? themeColor2 :appbar, padding:8, borderRadius:50}}><Ic name={torchState ? "flashlight":"flashlight-outline"} size={30} color={themeColor1} /></View>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text style={{color:'#fff', backgroundColor:appbar, padding:10, borderRadius:10, fontSize:18}}>Enter Device Id</Text>
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
    backgroundColor: appbar,
    width: '100%',
    justifyContent: 'space-between',
    top: 0,
  },
  quickContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quickText: {
    color: themeColor1,
    alignSelf: 'center',
    fontWeight: '700',
  },
  quicklelem: {
    backgroundColor: appbar,
    width: 100,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: themeColor2,
    borderWidth: 1.5,
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
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Home);
