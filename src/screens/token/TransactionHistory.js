import React, { useState, useRef } from 'react'
import { SafeAreaView, StatusBar, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native'
import { ScrollView as InnerScrollView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import SvgImage from "../../../assets/signIn.svg";
function TransactionHistory() {
  const scrollRef = useRef()
  const [innerScroll, setInnerScroll] = useState(false);
  const [outerScroll, setOuterScroll] = useState(false)
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    scrollRef.current
    const paddingToBottom = contentSize.height;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
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
      <SafeAreaView style={{ flex: 1, height: Dimensions.get("window").height }} >
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}} horizontal={true}>
          {/* <ScrollView
          ref={}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setOuterScroll(false)
            }
          }}
          scrollEnabled={outerScroll}
          scrollEventThrottle={400}
          contentInsetAdjustmentBehavior="automatic" style={{}} horizontal={true} nestedScrollEnabled={true}>

          <StatusBar backgroundColor="#5E89E2" />
          {["1", "2", "3", "4", "6", "7", "8", "9", "0", "5", "1", "2", "3", "4", "6", "7", "8", "9", "0", "5", "1", "2", "3", "4", "6", "7", "8", "9", "0", "5"].map((data, index) => <View key={index} style={{ height: 220, width: 320, marginLeft: 22, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
            <InnerScrollView
              onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  setOuterScroll(true)
                }
              }}
              contentInsetAdjustmentBehavior="automatic" style={{}} horizontal={true} >
              {["1", "2", "3", "4", "6"].map((data, index) => <View key={index} style={{ height: 120, width: 120, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' }}>
                <Text style={{ color: '#121212' }}>{data}</Text>
              </View>
              )}
            </InnerScrollView>
          </View>
          )} */}
          <View style={{ display: 'flex', marginLeft: 12, marginRight: 12, marginTop: 22, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-evenly' }}>
            {["Sr#", "Name of Sender", "Name of Receiver", "Date of Transfer", "Date of Receiver", "Transfer Amount"].map((data, index) =>
              <View style={{ width: index == 0 ? 60 : 180, borderWidth: 0.5, borderColor: '#203761', }} key={index}>
                <View style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#0B8140', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{data}</Text>
                </View>
                {
                  index == 0 && <>
                    <View style={{ display: 'flex', marginTop: 22, borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                      <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>1</Text>
                    </View>
                    {["2", "3", "4", "5"].map((data, index) => <View key={index} style={{ display: 'flex', borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                      <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{data}</Text>
                    </View>
                    )}
                  </>
                }
                {index == 1 && <>
                  <View style={{ display: 'flex', marginTop: 22, borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>Awais</Text>
                  </View>
                  {["Usman", "Danish", "Saad", "Atif"].map((data, index) => <View key={index} style={{ display: 'flex', borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{data}</Text>
                  </View>
                  )}
                </>
                }
                {index == 2 && <>
                  <View style={{ display: 'flex', marginTop: 22, borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>Ali</Text>
                  </View>
                  {["Usama", "Umar", "Zaigham", "Nawaz"].map((data, index) => <View key={index} style={{ display: 'flex', borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{data}</Text>
                  </View>
                  )}
                </>
                }
                {index == 3 &&
                  <>
                    <View style={{ display: 'flex', marginTop: 22, borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                      <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>12/12/2023</Text>
                    </View>
                    {["03/10/2023", "19/11/2023", "15/07/2023", "22/02/2023"].map((data, index) => <View key={index} style={{ display: 'flex', borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                      <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{data}</Text>
                    </View>)}
                  </>}
                {index == 4 && <>
                  <View style={{ display: 'flex', marginTop: 22, borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>12/12/2023</Text>
                  </View>
                  {["03/10/2023", "19/11/2023", "15/07/2023", "22/02/2023"].map((data, index) => <View key={index} style={{ display: 'flex', borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{data}</Text>
                  </View>)}
                </>
                }
                {index == 5 && <>
                  <View style={{ display: 'flex', marginTop: 22, borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>$52</Text>
                  </View>
                  {["$23", "$12", "$9", "$6"].map((data, index) => <View key={index} style={{ display: 'flex', borderWidth: 0.5, borderColor: '#203761', paddingVertical: 12 }}>
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{data}</Text>
                  </View>)}
                </>}
              </View>
            )}

          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default TransactionHistory