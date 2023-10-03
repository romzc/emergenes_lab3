import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CheckBox } from "./CheckBox";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { updateTodoDoneStatus } from "../data/database/database";

export const TodoItemSecond = ({ task, onTaskDelete, onTaskCompleted }) => {

  const { id, title, description, done, end_date, start_date, priority } = task;
  const [isChecked, setIsChecked] = useState(done);

  const getPriorityColor = () => {
    switch (priority) {
      case 1:
        return "#FF5733"; // Alto: Rojo
      case 2:
        return "#FFD633"; // Medio: Amarillo
      case 3:
        return "#33FF57"; // Bajo: Verde
      default:
        return "#FFFFFF"; // Color predeterminado
    }
  };

  
  const textStyle = {
    textDecorationLine: isChecked ? "line-through" : "none",
  };

  const handleCheckedItem = async () => {
    await onTaskCompleted(id, !isChecked);
  };

  return (
    <View
      style={[style.todoItemContainer, { backgroundColor: getPriorityColor() }]}
    >
      <View style={style.checkboxContainer}>
        <CheckBox
          style={style.checkbox}
          checked={isChecked}
          onChange={handleCheckedItem}
          disabled={false}
        />
      </View>
      <View style={style.textContainer}>
        <Text style={[style.title, textStyle]}>Titulo</Text>
        <Text style={[style.description, textStyle]}>{description}</Text>
      </View>
      <View style={style.dateContainer}>
        <Text style={[style.endDate, textStyle]}>Fecha de fin: {end_date}</Text>
      </View>
      <View style={style.deleteContainer}>
        {isChecked ? (
          <TouchableOpacity onPress={() => onTaskDelete(id)}>
            <Text style={style.deleteIcon}>❎</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  todoItemContainer: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  textContainer: {
    flex: 2,
    marginRight: 16,
  },
  dateContainer: {
    flex: 1,
    marginRight: 16,
  },
  checkboxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#000",
  },
  endDate: {
    fontSize: 14,
    color: "#000",
  },
  checkbox: {
    margin: 8,
  },
  deleteContainer: {
    alignItems: "center", // Centrar verticalmente
  },
  deleteIcon: {
    fontSize: 24,
    color: "red",
  },
});
