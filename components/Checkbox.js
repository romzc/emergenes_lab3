import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CheckBox = ({ checked, onChange }) => {
  const toggleCheckbox = () => {
    onChange(!checked);
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox}>
      <View style={styles.checkboxContainer}>
        {checked ? (
          <Ionicons name="md-checkbox" size={24} color="blue" />
        ) : (
          <Ionicons name="md-square-outline" size={24} color="blue" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    borderWidth: 1,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});


