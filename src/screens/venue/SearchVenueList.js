import React from "react";
import {
      View,
      RefreshControl,
      StyleSheet,
      Picker,
      FlatList,
      ActivityIndicator,
      StatusBar,
      TouchableOpacity,
      Image,
      SafeAreaView,
      Text
    } from "react-native";
    import {
      ListItem,
      SearchBar,
      Button,
      FormLabel,
      Avatar,
    } from "react-native-elements";
import SvgImage from "../../../assets/signIn.svg";
function SearchVenueList(props) {
  const venuesList = props?.route?.params?.venues;
  const routes = props.navigation.getState()?.routes;
  const prevRoute = routes[routes?.length - 2];
  console.log("previous route name is:#@#@#@", prevRoute?.name);
  renderEmptyList = () => {
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
    <SafeAreaView style={{ flex: 1 }}>
      <SvgImage
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 16,
          bottom: 0,
        }}
      />
      {venuesList?.length > 0 ? (
        <FlatList
        style={{
          backgroundColor: "transparent",
          paddingHorizontal: 26,
        }}
        data={venuesList}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            containerStyle={{
              alignItems: "center",
              backgroundColor: "transparent",
              borderBottomColor: "#0B8140",
              borderBottomWidth: 0.5,
              justifyContent: "center",
              paddingTop: 10,
              flex: 1,
              flexDirection: "row",
              paddingBottom: 10,
              height: 100,
            }}
            activeOpacity={1}
            style={{ backgroundColor: "transparent" }}
            onPress={() =>
              prevRoute?.name == "Dashboard"
                ? props.navigation.navigate("VenuesInfo", {
                    item: item,
                  })
                : prevRoute?.name == "EditGameScreen"
                ? props.navigation.navigate("EditGameScreen", {
                    item: item,
                  })
                : prevRoute?.name == "VenueSearchScreen" 
                ? props.navigation.navigate("VenuesInfo", {
                  item: item,
                }) 
                : props.navigation.navigate("CreateMatch", {
                    item: item,
                  })
            }
          >
            <Avatar
              containerStyle={{ height: 70, width: 70, borderRadius: 35 }}
              avatarStyle={{
                height: 70,
                width: 70,
                borderRadius: 35,
                resizeMode: "cover",
              }}
              source={require("../../../assets/image/default_avatar.jpg")}
              //    source={ this.ImageService.getVenueUri(item.id, item.image)}
            />
            <ListItem.Content>
              <ListItem.Title style={{ color: "#ffffff", fontSize: 16 }}>
                {item.name}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{ color: "#ffffff", fontSize: 14 }}
              >
                {item?.location?.county?.name +
                  ", " +
                  item.location?.city?.name}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron
              color={"#0B8140"}
              size={28}
              style={{ color: "#ffffff", alignSelf: "center" }}
            />
          </ListItem>
        )}
        keyExtractor={(item, index) => index.toString()}
      //   onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.2}
      //   ListFooterComponent={renderFooter}
      //   onRefresh={this.onRefresh}
      //   refreshing={this.state.refreshing}
        ListEmptyComponent={renderEmptyList}
      />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#ffffff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Venue not found!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default SearchVenueList;
