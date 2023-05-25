import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import {View,Text,TouchableOpacity} from 'react-native';

function BlueLinearGradientButton({title,onSelect,height}) {
  return (
    <LinearGradient style={{height: height,width:'100%',marginTop: 20,borderRadius:60,justifyContent:'center',alignItems:'center'}} colors={["#1F436E", "#4272B8"]}>
              <TouchableOpacity onPress={onSelect} style={{height: 45, width:'100%',borderRadius:60,justifyContent:'center',alignItems:'center'}}>
<Text style={{fontSize:18,fontWeight:'bold',lineHeight:21.8,textAlign:'center',color:'#ffffff'}}>
  {title}
</Text>
              </TouchableOpacity>
            </LinearGradient>
  )
}

export default BlueLinearGradientButton