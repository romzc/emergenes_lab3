import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";

const data = [
  { key: "1", title: "Tarea 1" },
  { key: "2", title: "Tarea 2" },
];

const renderItem = ({ item }) => {
  return <Text>{item.title}</Text>;
};

export default function App() {
  return (
    <View style={styles.container}>
      {/* Título de la aplicación */}
      <Text style={styles.title}>TodoApp</Text>
      {/* Contenedor del card */}
      <View style={styles.card}>
        {/* Lista de tareas */}
        <FlatList data={data} renderItem={renderItem} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
});
