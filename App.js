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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
    </Stack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component = {HomeStackScreen} />
        <Tab.Screen name="Hechos" component={DoneScreen}></Tab.Screen>
        <Tab.Screen name="No hechos" component={NoDoneScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
