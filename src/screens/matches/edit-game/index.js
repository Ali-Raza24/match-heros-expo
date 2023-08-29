import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRoute } from "@react-navigation/native";
import GameService from "../../../services/GameService";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import ReactNativeModal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import AwesomeAlert from "react-native-awesome-alerts";
import { useToast } from "react-native-toast-notifications";
import StepOne from "./StepOne";
import Wizard from "react-native-wizard";
import Steptwo from "./Steptwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import DropDownPicker from "react-native-dropdown-picker";
import { generateLoopOfNumbers } from "../../../utils/fns";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatGame } from "./format-game";
import { displayDangerToast, displaySuccessToast } from "../../../utils/toast";
import StepSeven from "./StepSeven";
import SvgImage from "../../../../assets/signIn.svg";
import StepEight from "./StepEight";
const EditGameSchema = Yup.object().shape({
  game_type: Yup.string().required("Game type is required!"),
  game_size: Yup.string().required("Game size is required!"),
  starts_at: Yup.string().required("Please choose the match start date"),
  minAgeOfPlayer: Yup.string(),
  maxAgeOfPlayer: Yup.string(),
  numOfReqPlayers: Yup.string(),
  makePublic: Yup.boolean(),
  keepPrivate: Yup.boolean(),
  match_duration: Yup.number().required("Match duration is required!"),
  avg_game_players: Yup.string().optional(),
  venue_name: Yup.string().optional().default(""),
  county: Yup.string().when("venue_name", {
    is: (venue_name) => {
      return venue_name.length > 0;
    },
    then: Yup.string().required("County is required!"),
    otherwise: Yup.string().optional(),
  }),
  area: Yup.string().when(["venue_name", "county"], {
    is: (venue_name, county) => venue_name.length > 0 && county,
    then: Yup.string().required(),
    otherwise: Yup.string().optional(),
  }),
  surface_type: Yup.string().when(["venue_name", "county", "area"], {
    is: (venue_name, county, area) => venue_name.length > 0 && county && area,
    then: Yup.string().required("Surface type is required"),
    otherwise: Yup.string().optional(),
  }),
  game_speed: Yup.string().optional(),
  game_fee: Yup.number(),
  game_repeat: Yup.number().default(() => 0),
  fee_type: Yup.array().of(Yup.string().required("Choose a fee method")),
  player_ids: Yup.array().of(Yup.number()),
});

const gameService = new GameService();
export default function EditGameScreen(props) {
  const [game, setGame] = useState();
  const [isFirstStep, setIsFirstStep] = useState();
  const [isLastStep, setIsLastStep] = useState();
  const [feeTypes, setFeeTypes] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showHowManyWeeks, setShowHowManyWeeks] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const wizard = useRef(null);
  const toast = useToast();
  const weeks = generateLoopOfNumbers(50);

  const {
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: game,
    enableReinitialize: true,
    validationSchema: EditGameSchema,
    onSubmit: (values) => onSubmit(values),
  });

  // Get id from the params object
  const route = useRoute();
  // Fetch game from the api

  const onSubmit = (values) => {
    setLoading(true);
    let data = {};
    console.log("onSubmit function called@!@!");
    // if (Object.keys(errors).length > 0) {
    //   console.log("Error Create Game Handle Submit");
    //   displayDangerToast(toast, "Please fill all the required fields.");
    //   return;
    // }
    if (isLastStep) {
      data = {
        ...values,
      };
      // data = { ...values, player_ids: players };
      // if (values.venue_name && values.venue_name.length > 0) {
      //   data.custom_venue = true;
      // }

      gameService
        .edit(data)
        .then((response) => {
          console.log("Game Edit", response.data);
          // displaySuccessToast(toast, "Game has been updated Successfully!");
          Alert.alert(
            "Match Updated Successfully!.",
            "",
            [
              {
                text: "OK",
                onPress: () => {
                  setLoading(false);
                  props.navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: "Dashboard",
                        state: { routes: [{ name: "Matches" }] },
                      },
                    ],
                  });
                },
              },
            ],
            {
              cancelable: false,
            }
          );
          return;
        })
        .catch((err) => {
          const error = err.response?.data;
          setLoading(false);
          Alert.alert(
            "Something went wrong!.",
            "",
            [
              {
                text: "OK",
                onPress: () => {
                  props.navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: "Dashboard",
                        state: { routes: [{ name: "Matches" }] },
                      },
                    ],
                  });
                },
              },
            ],
            {
              cancelable: false,
            }
          );
          // if ("message" in error) {
          //   if (error.message.length > 50) {
          //     displayDangerToast(
          //       toast,
          //       "Something went wrong. Please try again."
          //     );
          //     return;
          //   }
          //   displayDangerToast(toast, error.message);
          //   return;
          // }
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    gameService
      .getGame(route.params.gameId)
      .then((data) => {
        console.log("Match Data is:#@#@#@#", data);
        let _game = formatGame(data);
        setLoading(false);
        setGame(data);
        setFeeTypes(data.fee_type ? data.fee_type : []);
        if (data.booking) {
          _game = {
            ..._game,
          };
        }
        console.log("_GAME", _game);
        setValues(_game);
      })
      .catch((err) => {
        console.log("Edit Game Screen Error", err);
        setLoading(false);
      });
  }, [route.params.gameId]);

  // fetch all the invited Players
  useEffect(() => {
    if (route.params.gameId) {
      gameService
        .getGameInvitedPlayers(route.params.gameId)
        .then((game) => {
          if (Array.isArray(game.invitedTeam)) {
            const ids = game.invitedTeam.map((g) => g.players_id);
            setPlayers(ids);
          }
        })
        .catch((err) => {
          console.log("Invited Players Error", err);
        });
    }
  }, [route.params.gameId]);

  // Hook to update the functionality off back button on the top left corner
  useLayoutEffect(() => {
    // When click on this button, it will get to the previous step
    // It will be disabled on the Step One
    console.log(
      "current step and current screen is:!./...",
      currentStep,
      isFirstStep
    );
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (currentStep == 0) {
              props.navigation.goBack();
            }
            return wizard.current.prev();
          }}
        >
          <View
            style={{ paddingLeft: 26, paddingRight: 20, paddingVertical: 10 }}
          >
            <Image
              source={require("../../../../assets/image/back.png")}
              style={{
                width: 22,
                height: 19.5,
              }}
            />
          </View>
        </TouchableOpacity>
      ),
    });
    return () => {
      props.navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => props.navigation.navigate("Tokens")}>
            <View
              style={{ paddingLeft: 26, paddingRight: 20, paddingVertical: 10 }}
            >
              <Image
                source={require("../../../../assets/image/back.png")}
                style={{
                  width: 22,
                  height: 19.5,
                }}
              />
            </View>
          </TouchableOpacity>
        ),
      });
    };
  }, [currentStep]);

  // addFeeMethods
  /**
   *
   * @param {*} methodName:string
   */
  const addFeeMethod = (methodName) => {
    const isMethodNameExist =
      Array.isArray(values.fee_type) &&
      values.fee_type.find((type) => type === methodName);
    if (isMethodNameExist) {
      return;
    }
    setFieldValue("fee_type", [...values.fee_type, methodName]);
  };
  const removeFeeMethod = (methodName) => {
    const isMethodNameExist =
      Array.isArray(values.fee_type) &&
      values.fee_type.find((type) => type === methodName);
    if (!isMethodNameExist) {
      return;
    }
    const filteredFeeTypes =
      values.fee_type && values.fee_type.filter((type) => type !== methodName);
    setFieldValue("fee_type", filteredFeeTypes);
  };
  // const addPlayer = (id) => {
  //   const isPlayerExist = values.player_ids.find((p) => p === id);
  //   if (isPlayerExist) {
  //     return;
  //   }
  //   const updatedPlayers = [...values.player_ids, id];
  //   setFieldValue("player_ids", updatedPlayers);
  // };
  // get id from the StepSix Component and remove it from the players array
  // const removePlayer = (id) => {
  //   const filteredPlayers = [...values.player_ids].filter(
  //     (playerId) => playerId !== id
  //   );
  //   setFieldValue("player_ids", filteredPlayers);
  // };
  const addPlayer = (id) => {
    const isPlayerExist = players.find((p) => p === id);
    if (isPlayerExist) {
      return;
    }
    const updatedPlayers = [...players, id];
    setPlayers(updatedPlayers);
  };

  const removePlayer = (id) => {
    const filteredPlayers = [...players].filter((playerId) => playerId !== id);
    setPlayers(filteredPlayers);
  };
  console.log("ERRORS in edit-games index component ", errors);
  // These are the components, those will appear in the steps.
  const list = useMemo(
    () => [
      {
        content: (
          <StepOne
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
            {...props}
            wizardRef={wizard}
            isLastStep={isLastStep}
            navigation={props.navigation}
          />
        ),
      },

      {
        content: (
          <Steptwo
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            setValues={setValues}
            errors={errors}
            values={values}
            isLastStep={isLastStep}
            navigation={props.navigation}
            {...props}
            wizardRef={wizard}
          />
        ),
      },

      {
        content: (
          <StepThree
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
            setValues={setValues}
            isLastStep={isLastStep}
            wizardRef={wizard}
            navigation={props.navigation}
            {...props}
          />
        ),
      },

      {
        content: (
          <StepFour
            values={values}
            setFieldValue={setFieldValue}
            setValues={setValues}
            errors={errors}
            isLastStep={isLastStep}
            wizardRef={wizard}
            navigation={props.navigation}
            {...props}
          />
        ),
      },

      {
        content: (
          <StepFive
            removeFeeMethod={removeFeeMethod}
            addFeeMethod={addFeeMethod}
            errors={errors}
            setValues={setValues}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            setFieldValue={setFieldValue}
            isLastStep={isLastStep}
            wizardRef={wizard}
            feeTypes={values?.fee_type}
            navigation={props.navigation}
            {...props}
          />
        ),
      },

      {
        content: (
          <StepSix
            // removePlayer={removePlayer}
            // errors={errors}
            values={values}
            setValues={setValues}
            // setShowHowManyWeeks={setShowHowManyWeeks}
            isLastStep={false}
            {...props}
            currentStep={currentStep}
            navigation={props.navigation}
            wizardRef={wizard}
            // players={values.player_ids}
            // addPlayer={addPlayer}
            // handleSubmit={handleSubmit}
            // loading={loading}
          />
        ),
      },
      // {
      //   content: (
      //     <StepEight
      //       values={values}
      //       setFieldValue={setFieldValue}
      //       setValues={setValues}
      //       errors={errors}
      //       isLastStep={isLastStep}
      //       wizardRef={wizard}
      //       navigation={props.navigation}
      //       {...props}
      //     />
      //   ),
      // },
      {
        content: (
          <StepSeven
            removePlayer={removePlayer}
            errors={errors}
            values={values}
            setShowHowManyWeeks={setShowHowManyWeeks}
            isLastStep={isLastStep}
            setValues={setValues}
            {...props}
            currentStep={currentStep}
            navigation={props.navigation}
            wizardRef={wizard}
            players={values?.player_ids}
            addPlayer={addPlayer}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            loading={loading}
          />
        ),
      },
    ],
    [wizard.current]
  );

  //   List of Weeks
  const listOfWeeks = useMemo(() => {
    return weeks().map((week) => ({ label: week, value: week }));
  }, []);

  // Loading is True
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SvgImage
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 16,
            bottom: 0,
          }}
        />
        <ActivityIndicator size={50} color="#2b87ff" animating={loading} />
      </View>
    );
  }

  // Main Function
  function handleDisplayGame(values) {
    // If Game is not found
    if (!values && values === null) {
      return <Text style={styles.headingText}>Couldn't find the game.</Text>;
    }
    return (
      <>
        {/* 
        on the last step, when the user will hit the button. This alert will appear and will ask about the repeat of the game.
      */}
        <AwesomeAlert
          show={showHowManyWeeks}
          title="Weeks"
          message="Do you want to repeat this game?"
          closeOnTouchOutside
          closeOnHardwareBackPress={false}
          showCancelButton
          showConfirmButton
          confirmText="Confirm"
          onCancelPressed={() => {
            setShowHowManyWeeks(false);
            handleSubmit();
          }}
          onConfirmPressed={() => {
            setShowHowManyWeeks(false);
            setShowModal(true);
          }}
        />

        <ReactNativeModal isVisible={showModal}>
          <DropDownPicker
            items={listOfWeeks}
            open={showModal}
            setOpen={setShowModal}
            placeholder={"How many weeks do you want this game to repeat?"}
            value={values.game_repeat}
            setValue={(callback) => {
              setFieldValue("game_repeat", callback(values.game_repeat));
              handleSubmit();
            }}
            CloseIconComponent={
              <Ionicons
                name="close"
                onPress={() => setShowModal(false)}
                size={30}
              />
            }
          />
        </ReactNativeModal>

        {/* Wizard */}
        <Wizard
          ref={wizard}
          steps={list}
          isFirstStep={(val) => setIsFirstStep(val)}
          isLastStep={(val) => setIsLastStep(val)}
          currentStep={(val) => setCurrentStep(val.currentStep)}
          onNext={() => console.log("next")}
          contentContainerStyle={{ flex: 1 }}
        />
      </>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
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
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#5E89E2" />
          {values && handleDisplayGame(values)}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headingText: {
    color: "white",
    paddingVertical: 20,
    lineHeight: 30,
    fontSize: 20,
    fontFamily: "SourceSansPro-Bold",
    textAlign: "center",
  },
});
