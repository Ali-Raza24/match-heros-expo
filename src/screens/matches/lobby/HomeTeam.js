import { StyleSheet, View } from "react-native";
import { TeamCard } from "./TeamCard";

export const HomeTeam = ({ data, creatorId, onPress }) => {
  //   console.log("Home Team Data in HomeTeam Component is:!....", data);
  return (
    <View style={styles.container}>
      <TeamCard data={data} onPress={onPress} creatorId={creatorId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
