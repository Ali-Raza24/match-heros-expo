import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Alert,
  Picker,
  ActivityIndicator,
  StatusBar,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { connect, useSelector } from "react-redux";
import Wizard from "react-native-wizard";
import StepOne from "./StepOne";
import Steptwo from "./Steptwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import ReactNativeModal from "react-native-modal";
import { generateLoopOfNumbers } from "../../../utils/fns";
import DropDownPicker from "react-native-dropdown-picker";
import AwesomeAlert from "react-native-awesome-alerts";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { validateField } from "./error";
import GameService from "../../../services/GameService";
import { getHomeAndAwayTeam } from "./home-away";
import { useToast } from "react-native-toast-notifications";
import PlayerService from "../../../services/PlayerService";
import { sendPushNotification } from "../../../utils/notifications/send.notification";
import {
  gameInvitationMessage,
  NOTIFICATION_TITLE,
} from "../../../utils/notifications/notification.type";
import SvgImage from "../../../../assets/signIn.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepSeven from "./StepSeven";

const CreateGameSchema = Yup.object().shape({
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
  game_fee: Yup.string().required("Game fee is required."),
  game_repeat: Yup.number().default(() => 0),
  fee_type: Yup.array().of(Yup.string().required("Choose a fee method")),
  player_ids: Yup.array().of(Yup.number()),
});

// GameService Api
const gameService = new GameService();
const playerService = new PlayerService();
// This will genereate an array of 50 numbers
const weeks = generateLoopOfNumbers(50);
const initialValues = {
  game_type: "",
  game_size: "",
  starts_at: "",
  match_duration: "",
  avg_game_players: "",
  game_speed: "",
  game_fee: "",
  fee_type: [],
  venue_name: "",
  game_repeat: 0,
  county: "",
  area: "",
  surface_type: "",
  player_ids: [],
  custom_venue: false,
  minAgeOfPlayer: "",
  maxAgeOfPlayer: "",
  numOfReqPlayers: "",
  makePublic: false,
  keepPrivate: false,
};
const CreateMatch = ({ navigation, ...props }) => {
  const [isFirstStep, setIsFirstStep] = useState();
  const [isLastStep, setIsLastStep] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [showHowManyWeeks, setShowHowManyWeeks] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const user = useSelector((store) => store.user);
  const wizard = useRef(null);
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    setFieldValue,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues,
    onSubmit: (values) => onSubmit(values),
    validationSchema: CreateGameSchema,
  });

  const onSubmit = (values) => {
    let data = {};
    if (isLastStep) {
      data = { ...values };
      if (values.venue_name) {
        data["custom_venue"] = true;
      }
      console.log(values);
      setShowHowManyWeeks(false);
      gameService
        .create(data)
        .then((response) => {
          console.log("Game Created");
          console.log(response.data);
          toast.show("Game has been created Successfully!", {
            type: "success",
            placement: "top",
          });
          // Send Push Notifications
          values.player_ids.forEach(async (playerId) => {
            const response = await playerService.getPlayerDeviceToken(playerId);
            const device_token = response.data.device_token;
            console.log("device_token", device_token);
            if (device_token) {
              console.log("PLAYER DEVICE TOKEN", device_token);
              await sendPushNotification(
                device_token,
                NOTIFICATION_TITLE.TeamInvite,
                gameInvitationMessage(user.name),
                {}
              );
            }
          });
          // navigation.navigate("Matches");
          navigation.reset({
            index: 0,
            routes: [
              { name: "Dashboard", state: { routes: [{ name: "Matches" }] } },
            ],
          });
          return;
        })
        .catch((err) => {
          const error = err.response?.data;
          if ("message" in error) {
            if (error.message.length > 50) {
              toast.show("Something went wrong. Please try again.", {
                placement: "top",
              });
              return;
            }
            toast.show(error.message, {
              type: "danger",
            });
            return;
          }
        });
    }
  };
  // get id from the StepSix Component and add it in the players list
  const addPlayer = (id) => {
    const isPlayerExist = values.player_ids.find((p) => p === id);
    if (isPlayerExist) {
      return;
    }
    const updatedPlayers = [...values.player_ids, id];
    setFieldValue("player_ids", updatedPlayers);
  };
  // get id from the StepSix Component and remove it from the players array
  const removePlayer = (id) => {
    const filteredPlayers = [...values.player_ids].filter(
      (playerId) => playerId !== id
    );
    setFieldValue("player_ids", filteredPlayers);
  };

  // addFeeMethods
  /**
   *
   * @param {*} methodName:string
   */
  const addFeeMethod = (methodName) => {
    const isMethodNameExist = values.fee_type.find(
      (type) => type === methodName
    );
    if (isMethodNameExist) {
      return;
    }
    setFieldValue("fee_type", [...values.fee_type, methodName]);
  };
  console.log("initialValues is in creat match", values);
  const removeFeeMethod = (methodName) => {
    const isMethodNameExist = values.fee_type.find(
      (type) => type === methodName
    );
    if (!isMethodNameExist) {
      return;
    }
    const filteredFeeTypes = values.fee_type.filter(
      (type) => type !== methodName
    );
    setFieldValue("fee_type", filteredFeeTypes);
  };

  // These are the components, those will appear in the steps.
  const list = useMemo(
    () => [
      {
        content: (
          <StepOne
            setFieldValue={setFieldValue}
            errors={errors}
            values={values}
            {...props}
            navigation={navigation}
            wizardRef={wizard}
            isLastStep={isLastStep}
          />
        ),
      },

      {
        content: (
          <Steptwo
            setFieldValue={setFieldValue}
            setValues={setValues}
            errors={errors}
            values={values}
            isLastStep={isLastStep}
            {...props}
            handleChange={handleChange}
            handleBlur={handleBlur}
            navigation={navigation}
            wizardRef={wizard}
          />
        ),
      },

      {
        content: (
          <StepThree
            setFieldValue={setFieldValue}
            setValues={setValues}
            errors={errors}
            values={values}
            isLastStep={isLastStep}
            {...props}
            navigation={navigation}
            wizardRef={wizard}
          />
        ),
      },

      {
        content: (
          <StepFour
            setFieldValue={setFieldValue}
            setValues={setValues}
            errors={errors}
            values={values}
            isLastStep={isLastStep}
            {...props}
            navigation={navigation}
            wizardRef={wizard}
          />
        ),
      },

      {
        content: (
          <StepFive
            setFieldValue={setFieldValue}
            setValues={setValues}
            handleChange={handleChange}
            handleBlur={handleBlur}
            removeFeeMethod={removeFeeMethod}
            addFeeMethod={addFeeMethod}
            errors={errors}
            values={values}
            isLastStep={isLastStep}
            {...props}
            navigation={navigation}
            wizardRef={wizard}
          />
        ),
      },

      {
        content: (
          <StepSix
            // removePlayer={removePlayer}
            // errors={errors}
            // values={values}
            // setShowHowManyWeeks={setShowHowManyWeeks}
            isLastStep={false}
            {...props}
            currentStep={currentStep}
            navigation={navigation}
            wizardRef={wizard}
            // players={values.player_ids}
            // addPlayer={addPlayer}
            // handleSubmit={handleSubmit}
            // loading={loading}
          />
        ),
      },
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
            navigation={navigation}
            wizardRef={wizard}
            players={values.player_ids}
            addPlayer={addPlayer}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        ),
      },
    ],
    [wizard.current]
  );

  // The dropdown will use this list in order to display in the dropdown component
  const listOfWeeks = useMemo(() => {
    return weeks().map((week) => ({ label: week, value: week }));
  }, []);

  return (
    <>
      <SvgImage
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 16,
          bottom: 0,
        }}
      />
      <SafeAreaView
        style={{ flex: 1, height: Dimensions.get("window").height }}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{}}
          contentContainerStyle={{ flex: 1 }}
        >
          <StatusBar backgroundColor="#5E89E2" />
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
              handleSubmit();
              // setShowHowManyWeeks(false)
            }}
            onConfirmPressed={() => {
              setLoading(true);
              setShowHowManyWeeks(false);
              setShowModal(true);
            }}
          />
          {/*  *this will appear when the finished button will be clicked
           *this will be on the last step
           */}
          <ReactNativeModal isVisible={showModal}>
            <DropDownPicker
              items={listOfWeeks}
              open={showModal}
              setOpen={setShowModal}
              placeholder={"How many weeks do you want this game to repeat?"}
              value={values.game_repeat}
              setValue={(callback) => {
                setFieldValue(
                  "game_repeat",
                  Number(callback(values.game_repeat))
                );
                handleSubmit();
              }}
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  nextButtonContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "60%",
    marginVertical: 10,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(CreateMatch);
