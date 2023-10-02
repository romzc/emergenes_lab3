import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const CardPriority = ({ color, quantity, title }) => {

  const cardStyle = {
    backgroundColor: color,
  };

  return (
    <View style={[style.cardContainer, cardStyle]}>
      <Text>{title}</Text>
      <Text>{quantity}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderRadius: 8,
    width: 120,
    height: 120,
    marginHorizontal: 6
  },
});
