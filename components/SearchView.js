import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export const SearchView = () => {

  const [text, onChangeText] = useState("");

  return (
    <View style={style.searchContainer}>
      <TextInput
        placeholder="Search"
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  );
};

const style = StyleSheet.create({
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#9496a7",
    borderRadius: 12,
    height: 48
  }
});
