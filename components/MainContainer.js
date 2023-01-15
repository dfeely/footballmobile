import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "../screens/Home";
import FootballTableScreen from "../screens/FootballTableScreen";
import PickClub from "../screens/PickClub";
import Details from "../screens/Details";
 

//Screen names
const homeName = "Home";
const detailsName = "Table";
const settingsName = "Settings";
const tableName = "Details";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      
      <Stack.Screen name="PickClub" component={PickClub} />
      <Stack.Screen name={tableName} component={Details}  />
    </Stack.Navigator>
  );
}

function MainContainer() { 
  return (    
    <NavigationContainer>
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
        <Tab.Screen name={settingsName} component={Root} />
     </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;