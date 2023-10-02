import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Checkbox } from "./Checkbox";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const TodoItem = ({ task, navigation }) => {
  const { id, title, description, done, end_date, start_date, priority } = task;
  const [isChecked, setIsChecked] = useState(done);
  const navigation = useNavigation();

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
    textDecorationLine: done ? "line-through" : "none",
  };

  const handleTitlePress = () => {
    // Navegar a la pantalla de detalle pasando los datos que desees
    navigation.navigate("Detail", { idTodo: id });
  };

  return (
    <View
      style={[style.todoItemContainer, { backgroundColor: getPriorityColor() }]}
    >
      <View style={style.checkboxContainer}>
        <CheckBox
          style={style.checkbox}
          checked={isChecked}
          onChange={setIsChecked}
        />
      </View>
      <View style={style.textContainer}>
        <TouchableOpacity onPress={handleTitlePress}>
          <Text style={[style.title, textStyle]}>{title}</Text>
        </TouchableOpacity>
        <Text style={[style.description, textStyle]}>{description}</Text>
      </TouchableOpacity>
      <View style={style.dateContainer}>
        <Text style={[style.endDate, textStyle]}>Fecha de fin: {end_date}</Text>
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
    color: "#FFFFFF",
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  endDate: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  checkbox: {
    margin: 8,
  },
});
