import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CheckBox, ListItem } from "react-native-elements";
import ImageService from "../../../services/ImageService";
import TextBold from "../../../component/_shared/TextBold";
const imageService = new ImageService();

const { width, height } = Dimensions.get("window");
export const TabComponent = ({
  data,
  addItemFn,
  players,
  removeItemFn,
  renderFooter,
  handleLoadMore,
}) => {
  const handleTogglePlayer = (id) => {
    if (players.includes(id)) {
      removeItemFn(id);
      return;
    }
    addItemFn(id);
  };

  const renderEmptyList = () => {
    return (
      <View
        style={{
          paddingVertical: 100,
          paddingHorizontal: 26,
          width: "100%",
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <TextBold
          style={{
            color: "white",
            paddingVertical: 20,
            lineHeight: 30,
            fontSize: 20,
            // fontFamily: 'SourceSansPro-Bold',
            textAlign: "center",
          }}
          text="No Results found"
        />
      </View>
    );
  };
  return (
    <LinearGradient
      style={styles.flatListContainer}
      colors={["#5E89E2", "#0E1326"]}
    >
      <FlatList
        data={data}
        showsVerticallScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <ListItem
              chevronColor={"white"}
              containerStyle={{
                alignItems: "center",
                backgroundColor: "transparent",
                borderBottomColor: "rgba(255,255,255,0.35)",
                justifyContent: "center",
                paddingTop: 10,
                flex: 1,
                paddingBottom: 10,
                height: 100,
              }}
              avatar={require("../../../../assets/image/default_avatar.jpg")}
              avatarStyle={{
                borderRadius: 100,
                borderWidth: 0,
                width: 45,
                height: 45,
                resizeMode: "cover",
              }}
              titleContainerStyle={{ paddingLeft: 20 }}
              titleStyle={{
                color: "white",
                fontSize: 16,
                // fontFamily: "SourceSansPro-Regular",
              }}
              rightIcon={
                <CheckBox
                  containerStyle={{
                    backgroundColor: "transparent",
                    borderWidth: 0,
                  }}
                  checkedColor={"white"}
                  checked={players.includes(item.id)}
                  center
                  onPress={() => handleTogglePlayer(item.id)}
                />
              }
              key={item.id}
              title={item.name}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    height: 205,
    flex: 1,
    marginLeft: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: "white",
    width: width - 52,
  },
  flatListContainer: {
    backgroundColor: "transparent",
    height: height - 250,
    borderRadius: 6,
    marginTop: 5,
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: "auto",
    marginLeft: "auto",
  },
  rightIconContainer: {
    paddingHorizontal: 2,
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: "#56c1ff",
    justifyContent: "center",
  },
});
