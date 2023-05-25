import React,{useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomLabel from './CustomLabel';

export default function TwoWaySlider(props) {
  const [
    nonCollidingMultiSliderValue,
    setNonCollidingMultiSliderValue,
  ] = React.useState([0, 75]);

  useEffect(() => {
    props.callBack(nonCollidingMultiSliderValue[0],nonCollidingMultiSliderValue[1])
  },[nonCollidingMultiSliderValue[0],nonCollidingMultiSliderValue[1]])
  const nonCollidingMultiSliderValuesChange = values =>
    setNonCollidingMultiSliderValue(values);

  return (
    <View style={styles.container}>
      <MultiSlider
        values={[
          nonCollidingMultiSliderValue[0],
          nonCollidingMultiSliderValue[1],
        ]}
        sliderLength={280}
        onValuesChange={nonCollidingMultiSliderValuesChange}
        min={0}
        max={75}
        step={1}
        allowOverlap={false}
        trackStyle={{height:5,borderRadius:12}}
        snapped
        minMarkerOverlapDistance={40}
        isMarkersSeparated={true}
        // customMarker={() => {
        //     return(
        //         <View>
        //             <Text >{nonCollidingMultiSliderValue[0]} </Text>
        //         </View>
        //     )
        // }}
        customMarkerLeft={() => {
            return(
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',justifyContent:'center'}}>
                    <Text style={{color:'#121212',fontWeight:'bold', textAlign:'center'}}>{nonCollidingMultiSliderValue[0]} </Text>
                </View>
            )
        }}
        customMarkerRight={() => {
            return(
                <View style={{width:30,height:30,borderRadius:15,backgroundColor:'#ffffff',justifyContent:'center'}}>
                    <Text style={{color:'#121212',fontWeight:'bold', textAlign:'center'}}>{nonCollidingMultiSliderValue[1]}{nonCollidingMultiSliderValue[1] == 75 ? "+" : ""} </Text>
                </View>
            )
        }}
        customLabel={CustomLabel}
      />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliders: {
    margin: 20,
    width: 280,
  },
  text: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});