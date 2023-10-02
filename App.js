import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { initializeDatabase, getTodos } from "./data/database/database";
import { HomeScreen } from "./screens/HomeScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { CreateScreen } from "./screens/CreateScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// expo add expo-sqlite

/*
import { createStackNavigator } from "@react-navigation/stack";
*/
const Stack = createStackNavigator();

export default function App() {


  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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
    </NavigationContainer>
  );
}
