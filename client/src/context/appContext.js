import {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import reducer from "./reducers";
import axios from "axios";

import {
  SHOW_ALERT,
  CLEAR_ALERT,
  GET_ALL_USERS,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  SHOW_POPUP,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SHOW_PVP_MODAL,
  SHOW_PRACTICE_MODAL,
  SHOW_RANK_MODAL,
  SET_GAME_MODE,
  SHOW_GAME_RESULT_MODAL,
  GET_ALL_HISTORY,
  ADD_NEW_HISTORY,
  SHOW_FIND_MODAL,
  SET_TO_CHALLENGE,
  GET_ALL_CHALLENGES,
} from "./actions";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  users: [],
  isLoading: false,
  showAlert: false,
  showPopup: false,
  showPvPModal: false,
  showRankModal: false,
  showPractice: false,
  showGameResult: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  mode: "",
  history: [],
  toChallenge: null,
  challenges: [],
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("api/v1/auth/users");
        dispatch({ type: GET_ALL_USERS, payload: response.data });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const clearAlert = useCallback(() => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  }, []);

  const displayAlert = useCallback(() => {
    dispatch({ type: SHOW_ALERT });
    clearAlert();
  }, [dispatch, clearAlert]);

  const addUserToLocalStorage = useCallback(({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }, []);

  const removeUserFromLocalStorage = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

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

  const showModal = () => {
    dispatch({ type: SHOW_POPUP });
  };

  const handleSetMode = (mode) => {
    dispatch({ type: SET_GAME_MODE, mode });
  };

  const handlePvPModal = () => {
    dispatch({ type: SHOW_PVP_MODAL });
  };

  const handlePracticeModal = () => {
    dispatch({ type: SHOW_PRACTICE_MODAL });
  };

  const handleRankModal = () => {
    dispatch({ type: SHOW_RANK_MODAL });
  };

  const handleGameResultModal = () => {
    dispatch({ type: SHOW_GAME_RESULT_MODAL });
  };

  const handleSetToChallenge = (user) => {
    dispatch({ type: SET_TO_CHALLENGE, payload: { user } });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const getAllHistory = async () => {
    try {
      const { data } = await authFetch.get("/history");
      console.log(data);
      dispatch({ type: GET_ALL_HISTORY, payload: { history: data } });
    } catch (e) {
      console.log(e);
    }
  };

  const newHistory = useCallback(
    async (history) => {
      try {
        const { data } = await authFetch.post("/history/new", history);
        dispatch({ type: ADD_NEW_HISTORY, payload: { history: data } });
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, authFetch]
  );

  // GET ALL CHALLENGES OF LOGGED IN USER
  const getAllChallenges = async (id) => {
    try {
      const { data } = await authFetch.get(`/challenge/${id}`);

      dispatch({ type: GET_ALL_CHALLENGES, payload: { challenges: data } });
    } catch (e) {
      console.log(e);
    }
  };

  const newChallenge = useCallback(
    async (challenge) => {
      try {
        await authFetch.post("/challenge/new", challenge);
      } catch (e) {
        console.log(e);
      }
    },
    [authFetch]
  );

  const updateUser = useCallback(
    async (currentUser) => {
      dispatch({ type: UPDATE_USER_BEGIN });

      try {
        const { data } = await authFetch.patch("/auth/updateUser", currentUser);

        const { user, token } = data;

        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: { user, token },
        });
        addUserToLocalStorage({ user, token });
      } catch (error) {
        if (error.response.status !== 401) {
          dispatch({
            type: UPDATE_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
        }
      }
      clearAlert();
    },
    [dispatch, authFetch, addUserToLocalStorage, clearAlert]
  );

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        updateUser,
        showModal,
        handlePvPModal,
        handlePracticeModal,
        handleRankModal,
        handleSetMode,
        handleGameResultModal,
        handleSetToChallenge,
        getAllHistory,
        newHistory,
        getAllChallenges,
        newChallenge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };
