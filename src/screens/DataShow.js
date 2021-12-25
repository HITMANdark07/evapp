import React from 'react';
import { View, Text } from 'react-native';

const DataShow = ({route, navigation}) => {
    const {data} = route.params;
    console.log(data);
    return (
        <View style={{flex:1, justifyContent:'center', alignSelf:'center'}}>
            <Text>{data}</Text>
        </View>
    )
}

export default DataShow;
