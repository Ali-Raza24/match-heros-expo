import React from 'react'
import {SafeAreaView,ScrollView,StatusBar,View,TouchableOpacity,Text,Image,Dimensions} from 'react-native'
import SvgImage from "../../../assets/signIn.svg";
function TransactionHistory() {
  return (
    <>
    <SvgImage
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 16,
          bottom: 0,
        }}
      />
    <SafeAreaView style={{flex:1,height:Dimensions.get("window").height}}>
        <ScrollView  contentInsetAdjustmentBehavior="automatic" style={{}}>
            
        <StatusBar backgroundColor="#5E89E2" />
        <View style={{display:'flex',height:Dimensions.get("window").height/1.5,width:'80%',justifyContent:'center',alignItems:'center',alignSelf:'center'}}> 
            <Image source={require("../../../assets/smilyFace.png")} style={{height:64,width:64,resizeMode:'contain',marginBottom:14}}/>
            <Text style={{fontSize:20,lineHeight:26,color:'#ffffff',textAlign:'center'}}>You don’t have transaction history</Text>
        </View>
        </ScrollView>
        </SafeAreaView>
        </>
  )
}

export default TransactionHistory