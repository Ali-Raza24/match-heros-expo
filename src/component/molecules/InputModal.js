import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import TextInputField from "./TextInputField";
function InputModal(props) {
  const [dob, setDob] = useState("");
  // const [modaVisible,setModalVisible] = useState(props.isModal)
  return (
    <View style={StyleSheet.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModal}
        onRequestClose={() => {
          props.setIsModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 18, lineHeight: 21, fontWeight: "bold" }}
              ></Text>
              <Text
                style={{ fontSize: 18, lineHeight: 21, fontWeight: "bold" }}
              >
                Year of Birth
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.setIsModal(false);
                }}
                activeOpacity={0.6}
                style={{ height: 20, width: 20, zIndex: 999 }}
              >
                <Image
                  source={require("../../../assets/crossIcon.png")}
                  style={{ resizeMode: "contain", width: 16, height: 16 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: "80%", marginTop: 32, marginBottom: 32 }}>
              <TextInputField
                placeHolder={"Year"}
                placeHolderColor={"#11172D"}
                inputFieldBackColor={"#E3E6EA"}
                inputColor="#11172D"
                borderBottomColor={"#E3E6EA"}
                keyboardType={"default"}
                value={dob}
                onChangeText={(text) => setDob(text)}
              />
            </View>
            <TouchableOpacity
              style={{
                width: "100%",
                height: 45,
                borderTopWidth: 0.6,
                borderColor: "#0B8140",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 0,
              }}
              onPress={() => props.setIsModal(false)}
            >
              <Text style={styles.textStyle}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(17,23,45,0.95)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingTop: 10,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 4,
  },
  buttonClose: {
    // backgroundColor:'#2196f3'
  },
  textStyle: {
    color: "#0B8140",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default InputModal;
