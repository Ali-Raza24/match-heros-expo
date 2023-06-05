import { View, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/onboarding/Onboarding";
import SignIn from "../screens/auth/SignIn";
import ForgotPasswordEmail from "../screens/auth/ForgotPasswordEmail";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "../screens/auth/SignUp";
import VerifyOtp from "../screens/auth/VerifyOtp";
import NewPassword from "../screens/auth/NewPassword";
import Profile from "../screens/profile/Profile";
import Availability from "../screens/availability/Availability";
import MainProfile from "../screens/profile/MainProfile";
import BottomTab from "./BottomTabNavigation";
import Token from "../screens/token/Token";
import Players from "../screens/player/Player";
import PlayerSearchScreen from "../screens/player/SearchPlayerFilter";
import Notifications from "../screens/notifications/Notifications";
import Venues from "../screens/venue/Venues";
import Match from "../screens/matches/Game";
import PayRequest from "../screens/token/PayRequest";
import TransactionHistory from "../screens/token/TransactionHistory";
import WithdrawFunds from "../screens/token/WithdrawFunds";
import TopUp from "../screens/token/TopUp";
import VenuesInfo from "../screens/venue/VenuesInfo";
import VenueDetail from "../screens/venue/VenueDetail";
import PublicProfile from "../screens/publicProfile/PublicProfile";
import TransferPayment from "../screens/publicProfile/TransferPayment";
import InviteHero from "../screens/publicProfile/InviteHero";
import MatchDetail from "../screens/matches/MatchDetail";
import MatchLobby from "../screens/matches/MatchLobby";
import CreateMatch from "../screens/matches/create-game/CreateGame";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import MatchSearch from "../screens/matches/MatchSearch";
import BadgeIcon from "../component/molecules/BadgeIcon";
import PlayerAnswerOnInvitation from "../screens/invites/PlayerAnswerOnInvitation";
import PlayerAnswerOnTeammateInvitation from "../screens/invites/PlayerAnswerOnTeammateInvitation";
import ViewTeam from "../screens/teammates/ViewTeam";
import TeamJoinRequests from "../screens/invites/TeamJoinRequests";
import viewGame from "../screens/matches/view-game";
import GameJoinRequests from "../screens/invites/GameJoinRequests";
import TeamInvites from "../screens/invites/TeamInvites";
import ViewPlayer from "../screens/player/ViewPlayer";
import Chat from "../screens/chat/Chat";
import { GameLobbyScreen } from "../screens/matches/lobby";
import InvitePlayersScreen from "../screens/invitePlayers/InvitePlayersScreen";
import SearchPlayersList from "../screens/player/SearchPlayersList";
import SearchGameList from "../screens/matches/SearchGameList";
import CancellationPolicy from "../screens/token/CancellationPolicy";
import TacPage from "../../termsAndConditions/TACPage";
import PrivacyPolicy from "../screens/privacypolicy/PrivacyPolicy";
const Stack = createStackNavigator();

function MyStack() {
  const { loading, isAuthenticated } = useAuth();
  console.log("isAuthenticated value is:#@#@#", isAuthenticated);
  const user = useSelector((state) => state.user);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Dashboard" : "Onboarding"}
      >
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="ForgotPasswordEmail"
          component={ForgotPasswordEmail}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            // headerLeft: () => null,
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
          }}
        />
        <Stack.Screen
          name="MainProfile"
          component={MainProfile}
          options={{
            headerTitle: "Profile",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="Availability"
          component={Availability}
          options={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={BottomTab}
          options={{
            headerTransparent: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Token"
          component={Token}
          options={{
            headerTitle: "Wallet",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="Heros"
          component={Players}
          options={{
            headerTitle: "Heros",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="SearchPlayerFilter"
          component={PlayerSearchScreen}
          options={{
            headerTitle: "Hero Search",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerTitle: "Notifications",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="Venues"
          component={Venues}
          options={{
            headerTitle: "Venues",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
            headerRight: () => (
              <BadgeIcon onPress={() => navigation.navigate("Notifications")} />
            ),
          }}
        />
        <Stack.Screen
          name="Matches"
          component={Match}
          options={{
            headerTitle: "Match",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="TopUp"
          component={TopUp}
          options={{
            headerTitle: "Top Up",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="WithdrawFunds"
          component={WithdrawFunds}
          options={{
            headerTitle: "Withdraw",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
          options={{
            headerTitle: "Transaction History",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="PayRequest"
          component={PayRequest}
          options={{
            headerTitle: "Pay Request",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="VenuesInfo"
          component={VenuesInfo}
          options={{
            headerTitle: "Venue Info",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="VenueDetail"
          component={VenueDetail}
          options={{
            headerTitle: "Antrim Road",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="PublicProfile"
          component={PublicProfile}
          options={{
            headerTitle: "Match Hero",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="TransferPayment"
          component={TransferPayment}
          options={{
            headerTitle: "Transfer Payment",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="InviteHero"
          component={InviteHero}
          options={{
            headerTitle: "Invite Hero",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="MatchDetail"
          component={MatchDetail}
          options={{
            headerTitle: "Match Details",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="MatchLobby"
          component={MatchLobby}
          options={{
            headerTitle: "Match Lobby",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="CreateMatch"
          component={CreateMatch}
          options={{
            headerTitle: "Create Match",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="MatchSearch"
          component={MatchSearch}
          options={{
            headerTitle: "Search Matches",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />

        {/* Invitations screens start from here */}
        <Stack.Screen
          name="PlayerAnswerOnInvitations"
          component={PlayerAnswerOnInvitation}
          options={{
            headerTitle: "Match Join Request",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />

        <Stack.Screen
          name="PlayerAnswerOnTeammateInvitation"
          component={PlayerAnswerOnTeammateInvitation}
          options={{
            headerTitle: "Invitation",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />

        <Stack.Screen
          name="ViewTeam"
          component={ViewTeam}
          options={{
            headerTitle: "Teams",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />

        <Stack.Screen
          name="TeamJoinRequests"
          component={TeamJoinRequests}
          options={{
            headerTitle: "Team Join Requests",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />

        <Stack.Screen
          name="ViewGame"
          component={viewGame}
          options={{
            headerTitle: "Edit Match",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="GameJoinRequests"
          component={GameJoinRequests}
          options={{
            headerTitle: "Match Join Request",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="TeamInvites"
          component={TeamInvites}
          options={{
            headerTitle: "Team Invites",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="ViewPlayer"
          component={ViewPlayer}
          options={{
            headerTitle: "Player",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerTitle: "Chat",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="GameLobby"
          component={GameLobbyScreen}
          options={{
            headerTitle: "Match Lobby",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="InvitePlayersScreen"
          component={InvitePlayersScreen}
          options={{
            headerTitle: "Invite Players",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="SearchPlayersList"
          component={SearchPlayersList}
          options={{
            headerTitle: "Hero List",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="SearchGameList"
          component={SearchGameList}
          options={{
            headerTitle: "Match List",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="CancellationPolicy"
          component={CancellationPolicy}
          options={{
            headerTitle: "Cancelation Policy",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="TacPage"
          component={TacPage}
          options={{
            headerTitle: "Term and Condition",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            headerTitle: "Privacy Policy",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#11172D" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            headerTintColor: "green",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MyStack;
