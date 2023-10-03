import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { initializeDatabase, getTodos } from "./data/database/database";
import { HomeScreen } from "./screens/HomeScreen";
import { DoneScreen } from "./screens/done/DoneScreen";
import { NoDoneScreen } from "./screens/no_done/NoDoneScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { CreateScreen } from "./screens/CreateScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { UpdateScreen } from "./screens/UpdateScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// expo add expo-sqlite

/*
import { createStackNavigator } from "@react-navigation/stack";
*/


const Stack = createStackNavigator();

function HomeStackScreen() {
  useEffect(() => {
    initializeDatabase();
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="Home"
          options={{ title: null }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Create"
          options={{ title: null }}
          component={CreateScreen}
        />
        <Stack.Screen
          name="Detail"
          options={{ title: null }}
          component={DetailScreen}
        />
        <Stack.Screen
          name="Update"
          options={{ title: null }}
          component={UpdateScreen}
        />
      </Stack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (
              <Ionicons
                name={
                  focused
                    ? 'home'
                    : 'home-outline'
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Hechos') {
            return (
              <Ionicons
                name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'}
                size={size}
                color={color}
              />
            );
          }else if (route.name === 'No Hechos') {
            return (
              <Ionicons
                name={focused ? 'close-circle' : 'close-circle-outline'}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'tomato',
      })}
      >
        <Tab.Screen  name="Home" component = {HomeStackScreen} />
        <Tab.Screen name="Hechos" component={DoneScreen}></Tab.Screen>
        <Tab.Screen name="No Hechos" component={NoDoneScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
