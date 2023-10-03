
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getTodos } from "../../data/database/database";
import { TodoItem } from "../../components/TodoItem";


export const DoneScreen = () => {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      const todoList = await getTodos();
      setTodos(todoList.filter((todo) => todo.done));
    } catch (error) {
      console.error("Error loading todos", error);
    }
  };

  const todoRenders = todos.map((todo) => {
    return <TodoItem key={todo.id} task={todo} />;
  });

  useEffect(() => {
    const controller = new AbortController();
    loadTodos();
    return () => controller.abort();
  }, []);


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Todo no hechos</Text>
      <View>{todoRenders}</View>
    </View>
  );
};
