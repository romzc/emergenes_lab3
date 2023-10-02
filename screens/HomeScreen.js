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
import { CardPriority } from "../components/CardPriority";

export const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")

  const loadTodos = async () => {
    try {
      const todoList = await getTodos();
      setTodos(todoList);
    } catch (error) {
      console.error("Error loading todos", error);
    }
  };

  const todoRenders = todos.map((todo) => (
    <Text key={todo.id}>{todo.title}</Text>
  ));

  useEffect(() => {
    const controller = new AbortController();
    loadTodos();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      loadTodos();
    });
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.title}>Hello</Text>
        <Text style={styles.subTitle}>What will we do today?</Text>
        <SearchView onChangeTextQuery={setSearchQuery} value={searchQuery} />
      </View>

      <View style={styles.headContainer}>
        <Text style={styles.subTitle}>Priority</Text>
        <ScrollView style={styles.cardContainer} horizontal={true}>
          <CardPriority
            color={"#0ca6ff"}
            title={"High priority"}
            quantity={3}
          />
          <CardPriority
            color={"#ff5081"}
            title={"Normal priority"}
            quantity={3}
          />
          <CardPriority 
            color={"#ffc136"} 
            title={"Low priority"} 
            quantity={3} 
          />
        </ScrollView>
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
    rowGap: 20,
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
    color: "#000",
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
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10
  },
});
