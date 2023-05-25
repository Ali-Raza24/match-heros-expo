import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { getCities, getCounty } from "../../../utils/county-area";

export const GameAddressAndPrice = ({ game_fee, booking }) => {
  console.log("in GameAddressAndPrice", address?.pitch?.venue?.county);
  const address = booking ? booking : null;
  return (
    <View style={styles.container}>
      {/* Venue Address */}
      <View>
        <Text style={[styles.textStyle]}>
          {address ? address.pitch.name : "No Address"}
        </Text>
        {address?.pitch?.venue && (
          <Text style={[styles.textStyle]}>
            {getCounty(address?.pitch?.venue?.county)?.name} -{" "}
            {
              getCities(
                address?.pitch?.venue?.county,
                address?.pitch?.venue?.area
              ).name
            }
          </Text>
        )}
      </View>
      {/* Game Price */}
      <Text style={[styles.textStyle, styles.priceStyle]}>€{game_fee}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 16,
  },
  priceStyle: {
    fontSize: 20,
  },
});
