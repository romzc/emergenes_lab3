import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { TodoItemSecond } from "../../components/TodoItemSecond";
import { getTodos, updateTodoDoneStatus, deleteTodo } from "../../data/database/database";

export const NoDoneScreen = () => {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      const todoList = await getTodos();
      setTodos(todoList.filter((todo) => !todo.done));
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

  console.log(todos)

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>{todoRenders}</View>
    </View>
  );
};
