import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CheckBox = ({ checked, onChange, disabled }) => {
  const toggleCheckbox = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} disabled={disabled}>
      <View style={[styles.checkboxContainer, disabled && styles.disabled]}>
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
  disabled: {
    opacity: 0.5, // Cambia la opacidad cuando está deshabilitado
  },
});
