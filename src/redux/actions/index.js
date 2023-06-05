import AuthService from "../../services/AuthService";
import { Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiService from "../../services/ApiService";

import axios from "axios";
// import firebase from "react-native-firebase"

export const AUTH_USER = "auth_user";
export const REGISTER_USER = "register_user";
export const REGISTER_REQUEST = "register_request";
export const REGISTER_FAIL = "register_fail";
export const LOGIN_REQUEST = "login_request";
export const UPDATE_REQUEST = "update_request";
export const UPDATE_FAIL = "update_fail";
export const RESET_UPDATE_ERRORS = "reset_update_errors";
export const LOGIN_USER = "login_user";
export const LOGIN_FAIL = "login_fail";
export const LOGOUT_USER = "logout_user";
export const UPDATE_USER = "update_user";
export const SET_NOTIFICATIONS = "set_notifications";
export const UPDATE_NOTIFICATION = "update_notifications";
export const REMOVE_NOTIFICATIONS = "remove_notifications";
export const OVERWRITE_NOTIFICATIONS = "overwrite_notifications";
export const UPDATE_USER_TOKENS = "update_user_tokens";

const authService = new AuthService();

const apiService = new ApiService();

export const authUser = () => {
  return async (dispatch, getState) => {
    //  Check if there is user in store, and return it
    const token = await AsyncStorage.getItem("userToken");
    const userData = await AsyncStorage.getItem("userData");
    const parsUserData = await JSON.parse(userData);
    console.log("user data is:#@#@#@#", parsUserData?.user, parsUserData?.user);
    await apiService.setDefaultHeaders(token);
    if (token) {
      if (token) {
        dispatch({
          type: UPDATE_USER_TOKENS,
          payload: parsUserData,
        });
        dispatch({
          type: SET_NOTIFICATIONS,
          payload: parsUserData?.notifications,
        });
        //  Set user action
        dispatch({
          type: AUTH_USER,
          payload: parsUserData?.user,
        });
      }
      // authService.get().then((res) => {
      //   authService
      //     .getUserTokens(res.data.user.id)
      //     .then((response) => {
      //       //  Set tokens actions
      //       console.log(
      //         "in user action user response is:#@#@#",
      //         response?.data
      //       );
      //       dispatch({
      //         type: UPDATE_USER_TOKENS,
      //         payload: response.data,
      //       });
      //     })
      //     .catch((err) => {
      //       dispatch({
      //         type: UPDATE_USER_TOKENS,
      //         payload: 0,
      //       });
      //     });
      //   //  Set notification action
      //   dispatch({
      //     type: SET_NOTIFICATIONS,
      //     payload: res.data.notifications,
      //   });
      //   //  Set user action
      //   dispatch({
      //     type: AUTH_USER,
      //     payload: res.data.user,
      //   });

      //   dispatch({
      //     type: AUTH_USER,
      //     payload: res.data.user,
      //   });
      // });
    }
    // else {
    //   //  Get user based on token
    //   authService
    //     .get()
    //     .then((response) => {
    //       ApiService.setDefaultHeaders(
    //         response.data.authorization.access_token
    //       );
    //       //  Get user tokens
    //       authService.getUserTokens(response.data.user.id).then((res) => {
    //         //  Set tokens actions

    //         dispatch({
    //           type: UPDATE_USER_TOKENS,
    //           payload: res.data,
    //         });
    //       });
    //       //  Set user action
    //       dispatch({
    //         type: AUTH_USER,
    //         payload: response.data.user,
    //       });
    //       //  Set notification action
    //       dispatch({
    //         type: SET_NOTIFICATIONS,
    //         payload: response.data.notifications,
    //       });
    //     })
    //     .catch((response) => {
    //       //  Remove token from async storage
    //       AsyncStorage.removeItem("userToken");
    //     })
    //     .finally(() => {
    //       //  Set login request action
    //       dispatch({
    //         type: LOGIN_REQUEST,
    //         payload: false,
    //       });
    //     });
    // }
  };
};

export const registerUser = (values) => {
  return (dispatch) => {
    // Reset register errors (if there where any)
    dispatch({
      type: REGISTER_FAIL,
      payload: false,
    });
    dispatch({
      type: REGISTER_USER,
      payload: false,
    });
    // Start request
    dispatch({
      type: REGISTER_REQUEST,
      payload: true,
    });

    authService
      .register(values)
      .then((response) => {
        dispatch({
          type: REGISTER_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_FAIL,
          payload: error.response.data.errors,
        });
      })
      .finally(() => {
        dispatch({
          type: REGISTER_REQUEST,
          payload: false,
        });
      });
  };
};

export const loginUser = (values) => {
  return async (dispatch) => {
    // Reset login errors (if there where any)
    dispatch({
      type: LOGIN_FAIL,
      payload: false,
    });
    // Start request
    dispatch({
      type: LOGIN_REQUEST,
      payload: true,
    });
    //  Login user
    // const fcmToken = await firebase.messaging().getToken();
    const platform = Platform.OS;
    const loginResponse = await authService
      .login(values)
      .then(async (response) => {
        if (response?.data?.authorization?.access_token) {
          console.log("respnse data is:#@#@#@#@", response?.data);
          // Set token in memory
          await apiService.setDefaultHeaders(
            response.data.authorization.access_token
          );
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(response?.data)
          );
          //  Set token in storage

          await AsyncStorage.setItem(
            "userToken",
            response.data.authorization.access_token
          );

          //  Get user tokens
          // await authService.setDeviceToken(platform, fcmToken);
          authService
            .getUserTokens(response.data.user.id)
            .then((res) => {
              //  Set tokens actions
              dispatch({
                type: UPDATE_USER_TOKENS,
                payload: res.data,
              });
            })
            .catch((err) => {
              console.log("user token", { ...err });
              dispatch({
                type: UPDATE_USER_TOKENS,
                payload: 0,
              });
            });
          //  Set notification action
          dispatch({
            type: SET_NOTIFICATIONS,
            payload: response.data.notifications,
          });
          //  Set user action
          dispatch({
            type: AUTH_USER,
            payload: response.data.user,
          });
        } else {
          dispatch({
            type: LOGIN_FAIL,
            payload: "Login failed. Please check your email and password.",
          });
        }
      })
      .catch((errors) => {
        // console.log('glavni', { ...errors })
        dispatch({
          type: LOGIN_FAIL,
          payload: "Login failed. Please check your email and password.",
        });
      });
    // return loginResponse;
    //  .finally(() => {
    //   dispatch({
    //     type: LOGIN_REQUEST,
    //     payload: false
    //   });
    // })
    // console.log(loginResponse)
  };
};

export const editUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_REQUEST,
      payload: true,
    });
    dispatch({
      type: UPDATE_FAIL,
      payload: false,
    });
    authService
      .update(user)
      .then((response) => {
        console.log("Update User");
        dispatch({
          type: AUTH_USER,
          payload: response,
        });
        dispatch({
          type: UPDATE_REQUEST,
          payload: false,
        });
        dispatch({
          type: UPDATE_FAIL,
          payload: false,
        });
      })
      .catch((error) => {
        console.log(error.response ? error.response.data : error);
        dispatch({
          type: UPDATE_REQUEST,
          payload: false,
        });

        dispatch({
          type: UPDATE_FAIL,
          payload: true,
        });
      });
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    // alert("first");
    await AsyncStorage.removeItem("userToken");
    await apiService.setDefaultHeaders(null);
    //  Remove auth token from storage
    await authService._removeToken();
    await authService.clearStorage();

    // await AsyncStorage.removeItem("userData");
    // alert("second");
    // //  remove user Facebook login manager????
    // LoginManager.logOut();
    //  Remove user from store
    // GoogleSignin.isSignedIn()
    //   .then(res => {
    //     if (res) {
    //       GoogleSignin.signOut()
    //         .then()
    //         .catch(err => {
    //           console.log({ ...err });
    //         })
    //     }
    //   });
    dispatch({
      type: AUTH_USER,
      payload: false,
    });
    //  Remove user tokens
    dispatch({
      type: UPDATE_USER_TOKENS,
      payload: null,
    });
    //  Remove notifications
    dispatch({
      type: SET_NOTIFICATIONS,
      payload: [],
    });
    // alert("userLogout successfully@!@!#@#@");
    await authService.logOut().catch((error) => {
      console.log("error is in logOut function:#@#@#", error);
    });
  };
};

export const updateUser = (data) => {
  return async (dispatch) => {
    //  Set token in storage
    await AsyncStorage.setItem("userToken", data.authorization.access_token);
    //  Get user tokens
    authService
      .getUserTokens(data.user.id)
      .then((res) => {
        //  Set tokens actions
        dispatch({
          type: UPDATE_USER_TOKENS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_TOKENS,
          payload: 0,
        });
      });
    //  Set notification action
    dispatch({
      type: SET_NOTIFICATIONS,
      payload: data.notifications,
    });
    //  Set user action
    dispatch({
      type: AUTH_USER,
      payload: data.user,
    });
  };
};

export const resetUpdateErrors = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_UPDATE_ERRORS,
    });
  };
};

export const resetSuccessMessage = () => {
  return {
    type: REGISTER_USER,
    payload: false,
  };
};

export const resetLoginErrorMessage = () => {
  return {
    type: LOGIN_FAIL,
    payload: false,
  };
};

export const setNotifications = (notifications) => {
  return (dispatch) => {
    dispatch({
      type: SET_NOTIFICATIONS,
      payload: notifications,
    });
  };
};

export const fetchUserTokens = (userId) => {
  return (dispatch) => {
    authService
      .getUserTokens(userId)
      .then((res) => {
        //  Set tokens actions
        dispatch({
          type: UPDATE_USER_TOKENS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log({ ...err });
      });
  };
};

export const updateUserTokens = (tokens) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_TOKENS,
      payload: tokens,
    });
  };
};
