import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "../screens/Home";
import FootballTableScreen from "../screens/FootballTableScreen";
import PickClub from "../screens/PickClub";
import Details from "../screens/Details";
import TeamStatistics from "../screens/TeamStatistics"

//Screen names
const homeName = "Home";
const detailsName = "Table";
const settingsName = "Settings";
const tableName = "Details";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
    <Stack.Navigator  screenOptions={{
      headerShown: false,
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
      labelStyle: { paddingBottom: 10, fontSize: 10 },
      style: { padding: 10, height: 70},
    }}>     
      <Stack.Screen name="Home" component={Root} /> 
      <Stack.Screen name="Details" component={Details}  initialParams={{ divisionid:  global.DivisionId  }} />
      <Stack.Screen name={"TeamStatistics"} component={TeamStatistics}  />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

function Root() { 
  return (    
 
      <Tab.Navigator
        initialRouteName={homeName}
          screenOptions={({ route }) => ({
          headerShown: false,
          activeTintColor: 'black',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70},
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
        })}
       >

        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={detailsName} component={FootballTableScreen} initialParams={{ divisionid:  global.DivisionId  }}   />
        <Tab.Screen name={settingsName} component={PickClub} />       
     </Tab.Navigator>

  );
}

export default MainContainer;