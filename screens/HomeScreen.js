import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getTodos } from "../data/database/database";
import { SearchView } from "../components/SearchView";

export const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      const todoList = await getTodos();
      setTodos(todoList);
    } catch (error) {
      console.error("Error loading todos", error);
    }
  };

  const todoRenders = todos.map((todo) => <Text>{todo.title}</Text>);

  useEffect(() => {
    const controller = new AbortController();
    loadTodos();
    return () => controller.abort();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.title}>Hello</Text>
        <Text style={styles.subTitle}>What will we do today?</Text>
        <SearchView />
      </View>

      <View style={styles.headContainer}>
        <Text style={styles.subTitle}>Category</Text>
      </View>


      <ScrollView style={styles.todoContainer}>{todoRenders}</ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate("Create")}
        style={styles.floatButtonContainer}
      >
        <Text style={styles.textFloatButton}>+</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    rowGap: 20
  },
  headContainer: {
    display: "flex",
    width: "100%",
    rowGap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  todoContainer: {
    flex: 2,
    color: "#000"
  },
  floatButtonContainer: {
    position: "absolute",
    display: "flex",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#083",
    zIndex: 1,
  },
  textFloatButton: {
    textAlign: "center",
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
});
