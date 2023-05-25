import React,{useRef} from 'react'
import {SafeAreaView,ScrollView,StatusBar,View,TouchableOpacity,Text,Image,Dimensions, TextInput} from 'react-native'
import SvgImage from "../../../assets/signIn.svg";
import TextInputField from '../../component/molecules/TextInputField';
import GreenLinearGradientButton from '../../component/molecules/GreenLinearGradientButton';
function WithdrawFunds() {
    const inputRefs = useRef(null);
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
        <View style={{flex:1,width:'80%',alignSelf:'center'}}>
              <View style={{display:'flex',alignItems:'center',marginVertical:24}}>
              <Text style={{fontSize:18,lineHeight:21,color:'#ffffff'}}>Withdraw Amount</Text>
              {/* <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:12}}> */}
              {/* </View> */}
              </View>
              <View style={{display:'flex',flexDirection:'row'}}>
                <View style={{
                    height:  50,
                    width:44,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                    backgroundColor: 'transparent',
                    borderWidth:0.7,
          borderColor: '#636C92',
          justifyContent:'center',
          alignItems:'center'
                }}><Text style={{color:'#ffffff',textAlign:'center',fontSize:18}}>€</Text></View>
                <View style={{width:'80%'}}>
                <TextInput  returnKeyType="next"
      value={'0'}
      textAlign='center'
    //   onChangeText={onChangeText}
        style={{
          height:  50,
          fontSize:16,
          borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
          backgroundColor: 'transparent',
        //   marginTop:6,
        //   marginBottom: profile ? 28 : 10,
          color: '#ffffff',
        //   paddingHorizontal: 5,
          borderWidth:0.7,
          borderColor: '#636C92'
        }}/>
        </View>
              </View>
              <View style={{marginTop:8}}>
            <Text style={{fontSize:16,color:'#ffffff',textAlign:'center'}}>
            In Euro
            </Text>
          </View>
          <View style={{marginTop:18}}>
            <Text style={{fontSize:16,lineHeight:22,fontWeight:'bold', color:'#ffffff',textAlign:'center'}}>
            Withdraw Amount must be a minimum of €10
            </Text>
          </View>
          <View style={{marginTop:32}}>
          <TextInputField placeHolder={"Full Name"} placeHolderColor={"#ffffff"} inputFieldBackColor= {"transparent"} inputColor='#ffffff' borderBottomColor={'#636C92'} profile={true}
            ref={inputRefs}
            onSubmitEditing={()=>console.log('first')}
            value={''} onChangeText={text => console.log('first')}
            />
            <TextInputField placeHolder={"Phone Number"} placeHolderColor={"#ffffff"} inputFieldBackColor= {"transparent"} inputColor='#ffffff' borderBottomColor={'#636C92'} profile={true}
            ref={inputRefs}
            onSubmitEditing={()=>console.log('first')}
            value={''} onChangeText={text => console.log('first')}
            />
            <TextInputField placeHolder={"Ibn"} placeHolderColor={"#ffffff"} inputFieldBackColor= {"transparent"} inputColor='#ffffff' borderBottomColor={'#636C92'} profile={true}
            ref={inputRefs}
            onSubmitEditing={()=>console.log('first')}
            value={''} onChangeText={text => console.log('first')}
            />
          </View>
          <View style={{marginVertical:32}}>
          <GreenLinearGradientButton
            title={"WITHDRAW FUNDS"} 
            // onSelect={() => this.props.navigation.navigate("TopUp")}
            // onSelect={() => this.props.navigation.navigate("Profile")} 
            height={45} 
            loading={false}
            color={["#0B8140", "#0A5129"]}
            />
          </View>
          </View>
          
        </ScrollView>
        </SafeAreaView>
        </>
  )
}

export default WithdrawFunds