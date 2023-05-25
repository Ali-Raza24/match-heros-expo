import { StyleSheet, Text, View } from "react-native";
import { TeamCard } from "./TeamCard";

export const AwayTeam = ({ data, creatorId, onPress }) => {
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
