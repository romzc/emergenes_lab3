import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const CardPriority = ({ color, quantity, title }) => {

  const cardStyle = {
    backgroundColor: color,
  };

  return (
    <View style={[style.cardContainer, cardStyle]}>
      <Text style={style.cartTitle}>{title}</Text>
      <Text style={style.cardPriority}>{quantity} Tareas</Text>
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderRadius: 8,
    width: 120,
    height: 120,
    marginHorizontal: 6,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#040c3a"
  },
  cardPriority: {
    color: "#040c3a",
    fontSize: 13
  }
});
