import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
/**
* Override styles that get passed from props
**/

const CircularProgress = ({percent, size=200, wide=10, progressColor='#fff', backgroundColor="grey", fontColor="grey"}) => {

    const propStyle = (percent, base_degrees) => {
        const rotateBy = base_degrees + (percent * 3.6);
        return {
        transform:[{rotateZ: `${rotateBy}deg`}]
        };
    }
    let firstProgressLayerStyle;
    if(percent > 50){
        firstProgressLayerStyle = propStyle(50, -135);
    }else {
        firstProgressLayerStyle = propStyle(percent, -135);
    }

    const styles = StyleSheet.create({
        container: {
          width: size,
          height: size,
          borderWidth: wide,
          borderRadius: size/2,
          borderColor: backgroundColor,
          justifyContent: 'center',
          alignItems: 'center'
        },
        firstProgressLayer: {
          width: size,
          height: size,
          borderWidth: wide,
          borderRadius: size/2,
          position: 'absolute',
          borderLeftColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: progressColor,
          borderTopColor: progressColor,
          transform:[{rotateZ: '-135deg'}]
        },
        display: {
            position: 'absolute',
            fontSize: size/4,
            color:fontColor,
            fontWeight: 'bold'
        },
        secondProgressLayer:{
          width: size,
          height: size,
          position: 'absolute',
          borderWidth: wide,
          borderRadius: size/2,
          borderLeftColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: progressColor,
          borderTopColor: progressColor,
          transform: [{rotateZ: '45deg'}]
        },
        offsetLayer: {
          width: size,
          height: size,
          position: 'absolute',
          borderWidth: wide,
          borderRadius: size/2,
          borderLeftColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: backgroundColor,
          borderTopColor: backgroundColor,
          transform:[{rotateZ: '-135deg'}]
        }
      });

  const renderThirdLayer = (percent) => {
    if(percent > 50){
      /**
      * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
      * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
      * before passing to the propStyle function
      **/
      return <View style={[styles.secondProgressLayer,propStyle((percent - 50), 45) ]}></View>
    }else{
      return <View style={styles.offsetLayer}></View>
    }
  }

  return(
    <View style={styles.container}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent)}
      <Text style={styles.display}>{percent.toFixed(1)}%</Text>
    </View>
  );
}



export default CircularProgress;