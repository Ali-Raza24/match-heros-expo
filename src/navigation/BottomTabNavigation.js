import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/dashboard';
import Matches from '../screens/matches/Game';
import Teammates from '../screens/teammates/Teams';
import Profile from '../screens/profile/Profile';
import { Image,StatusBar,TouchableOpacity,View, } from 'react-native';
import { Text } from 'react-native';
import Menue from '../screens/menue/Menue';
import { LinearGradient } from 'expo-linear-gradient';
import BadgeIcon from '../component/molecules/BadgeIcon';
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator screenOptions={({ navigation }) => ({
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#b4b4b4',
      // tabBarActiveBackgroundColor:'#0A5129',
      
      tabBarStyle: {
          backgroundColor: "#1E2646",
          height: 60,
          borderTopColor:'#0A5129',
        //   justifyContent:'center',
        //   alignItems:'center'
       
      },
      headerRight: () => <BadgeIcon onPress={() => navigation.navigate("Notifications")} />,
      headerTitleAlign: 'center',
      headerTitleContainerStyle: {
          justifyContent: "center",
          alignItems:'center'
      },
      headerTransparent: false,
      headerStyle: {
        // display:'flex',
        // flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        height:50,
        backgroundColor:'#11172D',
      },
      headerLeftContainerStyle: {
          paddingLeft: 26
      },
      headerRightContainerStyle: {
          paddingRight: 26
      },
      headerTitleStyle: {
          fontWeight: "normal",
        //   fontFamily: "AvenirNextLTPro-MediumCn",
          color: 'white'
      },
      headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('Token')}>
          <View style={{ paddingHorizontal: 10 }}>
              <Image source={require('../../assets/tokenStack.png')} style={{
                width: 22,
                height: 19.5
              }} />
          </View>
      </TouchableOpacity>,
  })
}
  >
      <Tab.Screen 
      options={() => ({
        // headerStyle:{justifyContent:'center',alignItems:'center',height:90,backgroundColor:'#11172D'},
tabBarShowLabel:false,
        tabBarIcon: ({ focused }) => {
            return <LinearGradient style={{height: 60,width:'100%',justifyContent:'center',alignItems:'center'}} colors={focused ? ["#0B8140", "#0A5129"] : ['#1E2646','#1E2646']}> 
            <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("../../assets/dashboardIcon.png")} style={{ width: 16, height: 16,resizeMode:'contain', }} />
                    <Text style={{fontSize:14,fontWeight:'bold',marginTop:6,color:'#ffffff'}}>Dashboard</Text>
            </View>
            </LinearGradient>
        },
    })}
    
      name="Dashboard" component={Dashboard} />
      <Tab.Screen
       options={() => ({
        tabBarShowLabel:false,
        tabBarIcon: ({ focused }) => {
            return <LinearGradient style={{height: 60,width:'100%',justifyContent:'center',alignItems:'center'}} colors={focused ? ["#0B8140", "#0A5129"] : ['#1E2646','#1E2646']}> 
            <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("../../assets/matchesIcon.png")} style={{ width: 16, height: 16,resizeMode:'contain' }} />
                    <Text style={{fontSize:14,fontWeight:'bold',marginTop:6,color:'#ffffff'}}>Matches</Text>
            </View>
            </LinearGradient>
        },

    })}
       name="Matches" component={Matches} />
      <Tab.Screen 
      options={() => ({
        tabBarShowLabel:false,
        tabBarIcon: ({ focused }) => {
            return <LinearGradient style={{height: 60,width:'100%',justifyContent:'center',alignItems:'center'}} colors={focused ? ["#0B8140", "#0A5129"] : ['#1E2646','#1E2646']}> 
            <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("../../assets/teammateIcon.png")} style={{ width: 16, height: 16,resizeMode:'contain' }} />
                    <Text style={{fontSize:14,fontWeight:'bold',marginTop:6,color:'#ffffff'}}>Teammates</Text>
            </View>
            </LinearGradient>
        },

    })}
      name="Teammates" component={Teammates} />
      <Tab.Screen 
      options={() => ({
        tabBarShowLabel:false,
        tabBarIcon: ({ focused }) => {
            return <LinearGradient style={{height: 60,width:'100%',justifyContent:'center',alignItems:'center'}} colors={focused ? ["#0B8140", "#0A5129"] : ['#1E2646','#1E2646']}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("../../assets/burgerMenuIcon.png")} style={{ width: 16, height: 16,resizeMode:'contain' }} />
                    <Text style={{fontSize:14,fontWeight:'bold',marginTop:6,color:'#ffffff'}}>Menu</Text>
            </View>
            </LinearGradient>
        },

    })}
      name="Menu" component={Menue} />
    </Tab.Navigator>
  );
}
export default BottomTab