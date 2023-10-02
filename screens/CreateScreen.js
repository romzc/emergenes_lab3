import React, { useState } from "react";
import { addTodo } from "../data/database/database";
import { View, StyleSheet, Text, SafeAreaView, TextInput } from "react-native";
import { title } from "process";

export const CreateScreen = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    priority: null,
  });

  const handleForm = (event) => {
    const { nativeID } = event;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.title}>Hello</Text>
        <Text style={styles.subTitle}>Add new task</Text>
      </View>

      <View>
        <TextInput
          nativeID="title"
          placeholder="Task title..."
          value={formState.title}
          onChangeText={handleForm}
        />
        <TextInput
          placeholder="Task description..."
          value={formState.description}
        />

        <TextInput
          onChangeText={handleForm}
          value={formState.priority}
          keyboardType="numeric"
          placeholder="priority Eg: 1"
        />
      </View>
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
});
