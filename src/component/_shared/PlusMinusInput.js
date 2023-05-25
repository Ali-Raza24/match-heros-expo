import React from "react";
import {Icon, Text} from "react-native-elements";
import {View} from "react-native";


const PlusMinusInput = (props) => {
  return (
    <View style={{height: 50, width: 100, flexDirection: "row"}}>
      <View style={{
        height: 50,
        width: 30,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#c2c2c2",
        borderWidth: 0.5
      }}>
        <Icon
          type='font-awesome'
          name={'plus'}
          color='#c2c2c2' size={15}
          iconStyle={{paddingLeft: 5, paddingRight: 5}}
          onPress={props.incrementNumber}
        />
      </View>
      <View style={{
        height: 50,
        width: 40,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#c2c2c2",
        borderWidth: 0.5
      }}>
        <Text style={{fontSize: 20, color: "red"}}>{props.goals}</Text>
      </View>
      <View style={{
        height: 50,
        width: 30,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#c2c2c2",
        borderWidth: 0.5
      }}>
        <Icon
          type='font-awesome'
          name={'minus'}
          color='#c2c2c2' size={15}
          iconStyle={{paddingLeft: 5, paddingRight: 5}}
          onPress={props.decrementNumber}
        />
      </View>
    </View>
  );
};

export default PlusMinusInput;