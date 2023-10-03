import React, { useState } from "react";
import { addTodo, initializeDatabase } from "../data/database/database";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "@react-native-community/datetimepicker";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";

export const CreateScreen = ({navigation}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority: "1",
    endDate: today,
  });
  const { title, description, priority, endDate } = todo;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateFieldClick = () => {
    setShowDatePicker(true);
  };

  const handleInputChange = (nombreCampo, valor) => {
    const newTodo = { ...todo, [nombreCampo]: valor };
    setTodo(newTodo);
  };

  const handleDatePickerChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = new Date(selectedDate);
      handleInputChange("endDate", formattedDate);
    }
  };

  const handleCrearTarea = async () => {
    // Validación #1: El título no debe estar vacío
    if (!title.trim()) {
      alert("Por favor, ingresa un título válido para la tarea.");
      return;
    }

    // Validación #2: La fecha seleccionada no debe ser menor a la del día actual
    const today = new Date();

    if (endDate < today) {
      alert("La fecha de fin no puede ser anterior a la fecha actual.");
      return;
    }

    await addTodo(
      title,
      description,
      endDate.toISOString().split("T")[0],
      Number(priority)
    );
    cleanForm();
    navigation.navigate("Home")
  };

  const cleanForm = () => {
    // Limpia los campos después de crear la tarea
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setTodo({
      title: "",
      description: "",
      priority: "1",
      endDate: today,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear tarea</Text>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => handleInputChange("title", text)}
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => handleInputChange("description", text)}
        multiline
      />

      <Text style={styles.label}>Prioridad:</Text>
      <Picker
        style={styles.picker}
        selectedValue={priority}
        onValueChange={(itemValue) => handleInputChange("priority", itemValue)}
      >
        <Picker.Item label="Alta" value="1" />
        <Picker.Item label="Media" value="2" />
        <Picker.Item label="Baja" value="3" />
      </Picker>

      <Text style={styles.label}>Fecha de fin:</Text>
      <View style={styles.dateInputContainer}>
        <View style={styles.dateInputWrapper}>
          <TouchableOpacity
            onPress={handleDateFieldClick}
            style={styles.calendarIcon}
          >
            <FontAwesome5Icon name="calendar" size={30} color="#333" />
          </TouchableOpacity>
          <TextInput
            style={styles.dateInput}
            value={endDate.toISOString().split("T")[0]}
            placeholder="Selecciona una fecha"
            readOnly
          />
        </View>
      </View>

      {showDatePicker && (
        <DatePicker
          style={styles.datePicker}
          value={endDate ? new Date(endDate) : new Date()}
          mode="date"
          placeholder="Selecciona una fecha"
          format="YYYY-MM-DD"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
              borderWidth: 0,
            },
          }}
          onChange={handleDatePickerChange}
        />
      )}

      <Button title="Crear Tarea" onPress={handleCrearTarea} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    color: "#333",
  },
  dateInputContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    color: "#333",
  },
  calendarIcon: {
    marginRight: 8,
  },
  datePicker: {
    width: 200,
    marginBottom: 16,
  },
});
