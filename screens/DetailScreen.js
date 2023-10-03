import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { getTodoById } from "../data/database/database";

export const DetailScreen = () => {
  const route = useRoute();
  const { idTodo } = route.params;
  const [todoDetail, setTodoDetail] = useState({
    title: "",
    description: "",
    priority: 0,
    start_date: "",
    end_date: "",
    done: false,
  });

  const { title, description, priority, start_date, end_date, done } =
    todoDetail;

  const getPriorityDescription = (priorityValue) => {
    switch (priorityValue) {
      case 1:
        return "Alta";
      case 2:
        return "Media";
      case 3:
        return "Baja";
      default:
        return "Desconocida";
    }
  };

  const getPriorityBadgeStyle = (priorityValue) => {
    switch (priorityValue) {
      case 1:
        return styles.highPriorityBadge;
      case 2:
        return styles.mediumPriorityBadge;
      case 3:
        return styles.lowPriorityBadge;
      default:
        return styles.unknownPriorityBadge;
    }
  };

  const loadTodo = async () => {
    try {
      const todoData = await getTodoById(idTodo);
      setTodoDetail(todoData);
    } catch (error) {
      console.error("Error loading todos", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadTodo();
    return () => controller.abort();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.priorityBadge, getPriorityBadgeStyle(priority)]}>
        <Text style={styles.priorityText}>
          {getPriorityDescription(priority)}
        </Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.label}>Título:</Text>
        <Text style={styles.value}>{title}</Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{description}</Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.label}>Fecha de inicio:</Text>
        <Text style={styles.value}>{start_date}</Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.label}>Fecha de fin:</Text>
        <Text style={styles.value}>{end_date}</Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={[styles.label]}>Estado:</Text>
        <Text style={[styles.value, !done ? styles.redText : styles.greenText]}>
          {!done ? "Pendiente" : "Hecho"}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  priorityBadge: {
    alignSelf: "flex-start",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  priorityText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  highPriorityBadge: {
    backgroundColor: "red",
  },
  mediumPriorityBadge: {
    backgroundColor: "yellow",
  },
  lowPriorityBadge: {
    backgroundColor: "green",
  },
  unknownPriorityBadge: {
    backgroundColor: "gray",
  },
  propertyContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
  },
  redText: {
    color: "red",
  },
  greenText: {
    color: "green",
  },
});
