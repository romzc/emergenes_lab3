import { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { TodoItemSecond } from "../../components/TodoItemSecond";
import {
  getTodos,
  updateTodoDoneStatus,
  deleteTodo,
} from "../../data/database/database";

export const NoDoneScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      const todoList = await getTodos();
      const filteredTodoList = todoList.filter((todo) => todo.done == 0);
      setTodos(filteredTodoList);
    } catch (error) {
      console.error("Error loading todos", error);
    }
  };

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
      loadTodos()
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };


  const todoRenders = todos.map((todo) => (
    <TodoItemSecond
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
    <View style={style.screenContainer}>
      <View style={style.contentContainer}>
        <ScrollView>{todoRenders}</ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    rowGap: 20,
  },
  contentContainer: {
    display: "flex",
    rowGap: 12,
    flex: 1,
  },
});
