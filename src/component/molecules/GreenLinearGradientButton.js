import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

function GreenLinearGradientButton({
  title,
  onSelect,
  height,
  loading,
  disabled,
  color,
}) {
  return (
    <LinearGradient
      style={{
        height: height,
        width: "100%",
        marginTop: 20,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
      colors={color}
    >
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <TouchableOpacity
          disabled={disabled}
          onPress={onSelect}
          style={{
            height: 45,
            width: "100%",
            borderRadius: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              lineHeight: 21.8,
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

export default GreenLinearGradientButton;
