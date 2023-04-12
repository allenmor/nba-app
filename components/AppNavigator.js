import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import RealGm from './news/RealGm';
import Standings from './Standings';
import { Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stats from './Stats';



const Tab = createBottomTabNavigator();


const AppNavigator = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Standings') {
                iconName = focused ? 'list' : 'list-outline';
              }  else if (route.name === 'Stats') {
                iconName = focused ? 'list' : 'list-outline';
              }
  
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarStyle: {
              ...styles.tabBar,
              display: 'flex',
            },
          })}
        >
          <Tab.Screen name="Home" component={RealGm} />
          <Tab.Screen name="Standings" component={Standings} />
          <Tab.Screen name="Stats" component={Stats} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };
  
  
  

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: 'rgb(51,54,64)',
      borderTopWidth: 1,
      borderTopColor: 'black',
      paddingBottom: 10,
    },
    tabBarLabel: {
      fontSize: 12,
      fontWeight: '700',
    },
  });
  
  export default AppNavigator;
  
