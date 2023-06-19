import React from "react";
import { Text, TextInput } from "react-native";

function TextInputField({
  placeHolder,
  profile,
  placeHolderColor,
  inputFieldBackColor,
  inputColor,
  borderBottomColor,
  onSubmitEditing,
  value,
  onChangeText,
  borderBottomWidth,
  secureEntry,
  nonEditAble,
  keyboardType,
  onKeyPress,
}) {
  return (
    <>
      <Text
        style={{ fontSize: 16, lineHeight: 19.36, color: placeHolderColor }}
      >
        {placeHolder}
      </Text>
      <TextInput
        secureTextEntry={secureEntry}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="next"
        value={value}
        onChangeText={onChangeText}
        editable={nonEditAble ? false : true}
        keyboardType={keyboardType}
        style={{
          height: profile ? 30 : 45,
          borderRadius: profile ? 0 : 6,
          backgroundColor: inputFieldBackColor,
          marginTop: profile ? 0 : 6,
          marginBottom: profile ? 28 : 10,
          color: inputColor,
          paddingHorizontal: 5,
          borderBottomWidth: profile ? 1 : borderBottomWidth | 0,
          borderBottomColor: borderBottomColor,
        }}
        onKeyPress={onKeyPress}
      />
    </>
  );
}

export default TextInputField;
