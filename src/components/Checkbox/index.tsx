import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export function CustomCheckbox({ onPress}: { onPress?: () => void }) {
  const [checked, setChecked] = useState(false);

  const handlePress = () =>{
    onPress && onPress();
    setChecked(!checked);
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderWidth: 2,
          borderColor: "#3A797A",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 8,
          borderRadius: 12,
        }}
      >
        {checked && (
          <View
            style={{
              width: 14,
              height: 14,
              backgroundColor: "#3A797A",
              borderRadius: 12
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
