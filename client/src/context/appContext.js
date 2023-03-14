import { useReducer, useContext, createContext } from "react";
import reducer from "./reducers";
import axios from "axios";

import {
  SHOW_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from "./actions";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: SHOW_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // const registerUser = async (currentUser) => {
  //   dispatch({ type: REGISTER_USER_BEGIN });
  //   try {
  //     const { data } = await axios.post("/api/v1/auth/register", currentUser);
  //     const { user, token } = data;
  //     dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
  //     addUserToLocalStorage({ user, token });
  //   } catch (error) {
  //     dispatch({
  //       type: REGISTER_USER_ERROR,
  //       payload: {
  //         msg: error.response.data.msg,
  //       },
  //     });
  //   }
  //   clearAlert();
  // };

  // const loginUser = async (currentUser) => {
  //   dispatch({ type: LOGIN_USER_BEGIN });
  //   try {
  //     const { data } = await axios.post("/api/v1/auth/login", currentUser);
  //     const { user, token } = data;
  //     dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
  //     addUserToLocalStorage({ user, token });
  //   } catch (error) {
  //     dispatch({
  //       type: LOGIN_USER_ERROR,
  //       payload: {
  //         msg: error.response.data.msg,
  //       },
  //     });
  //   }
  //   clearAlert();
  // };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token, alertText });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, setupUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };
