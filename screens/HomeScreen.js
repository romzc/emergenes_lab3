import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getTodos, updateTodoDoneStatus } from "../data/database/database";
import { SearchView } from "../components/SearchView";
import { CardPriority } from "../components/CardPriority";
import { TodoItem } from "../components/TodoItem";
import { deleteTodo } from "../data/database/database";

export const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onTaskDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const onTaskCompleted = async (todoId, status) => {
    try {
      await updateTodoDoneStatus(todoId, status);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.done));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const loadTodos = async () => {
    try {
      const todoList = await getTodos();
      setTodos(todoList.filter((todo) => !todo.done));
    } catch (error) {
      console.error("Error loading todos", error);
    }
  };

  const todoRenders = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      task={todo}
      onTaskDelete={onTaskDelete}
      onTaskCompleted={onTaskCompleted}
    />
  ));

  useEffect(() => {
    const controller = new AbortController();
    loadTodos();
    return () => controller.abort();
  }, [todos.length]);

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
        <Text style={styles.title}>Hola</Text>
        <Text style={styles.subTitle}>¿Qué haremos hoy dia?</Text>
        <SearchView onChangeTextQuery={setSearchQuery} value={searchQuery} />
      </View>

      <View style={styles.headContainer}>
        <Text style={styles.subTitle}>Prioridad</Text>
        <ScrollView style={styles.cardContainer} horizontal={true}>
          <CardPriority
            color={"#FF5733"}
            title={"Prioridad\nalta"}
            quantity={1}
          />
          <CardPriority
            color={"#FFD633"}
            title={"Prioridad\nnormal"}
            quantity={2}
          />
          <CardPriority
            color={"#33FF57"}
            title={"Prioridad\nbaja"}
            quantity={3}
          />
        </ScrollView>
      </View>

      <View style={styles.taskContainer}>
        <Text style={styles.subTitle}>Tareas</Text>
        <ScrollView>{todoRenders}</ScrollView>
      </View>

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
  taskContainer: {
    display: "flex",
    width: "100%",
    rowGap: 12,
    flex: 1,
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
    columnGap: 10,
  },
});
