import {
  useReducer,
  useContext,
  createContext,
  useCallback,
  useMemo,
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
  UPDATE_USER_MMR,
  DECLINE_CHALLENGE,
  ACCEPT_CHALLENGE,
  UPDATE_HISTORY,
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
  showFindModal: false,
  showGameResult: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  mode: "",
  history: [],
  toChallenge: null,
  challenges: [],
  currentGame: null,
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

  const setupUser = useCallback(
    async ({ currentUser, endPoint, alertText }) => {
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
    },
    [addUserToLocalStorage, clearAlert]
  );

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get("api/v1/auth/users");
      dispatch({ type: GET_ALL_USERS, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);
  const showModal = useCallback(() => {
    dispatch({ type: SHOW_POPUP });
  }, [dispatch]);

  const handleSetMode = useCallback(
    (mode) => {
      dispatch({ type: SET_GAME_MODE, mode });
    },
    [dispatch]
  );

  const handlePvPModal = useCallback(() => {
    dispatch({ type: SHOW_PVP_MODAL });
  }, [dispatch]);

  const handleFindModal = useCallback(() => {
    dispatch({ type: SHOW_FIND_MODAL });
  }, [dispatch]);

  const handlePracticeModal = useCallback(() => {
    dispatch({ type: SHOW_PRACTICE_MODAL });
  }, [dispatch]);

  const handleRankModal = useCallback(() => {
    dispatch({ type: SHOW_RANK_MODAL });
  }, [dispatch]);

  const handleGameResultModal = useCallback(() => {
    dispatch({ type: SHOW_GAME_RESULT_MODAL });
  }, [dispatch]);

  const handleSetToChallenge = useCallback(
    (user) => {
      dispatch({ type: SET_TO_CHALLENGE, payload: { user } });
    },
    [dispatch]
  );

  const logoutUser = useCallback(() => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  }, [dispatch, removeUserFromLocalStorage]);

  const getAllHistory = useCallback(async () => {
    try {
      const { data } = await authFetch.get("/history");

      dispatch({ type: GET_ALL_HISTORY, payload: { history: data } });
    } catch (e) {
      console.log(e);
    }
  }, [authFetch, dispatch]);

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

  const newHistory = useCallback(
    async (history, new_challenge) => {
      try {
        const { data } = await authFetch.post("/history/new", history);

        dispatch({ type: ADD_NEW_HISTORY, payload: { history: data } });

        if (new_challenge) {
          new_challenge.history_id = data._id;

          newChallenge(new_challenge);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [authFetch, dispatch, newChallenge]
  );

  // UPDATE HISTORY
  const updateHistory = useCallback(
    async (history, challenge_id) => {
      try {
        const { data } = await authFetch.patch("/history/update", {
          history,
          challenge_id,
        });

        dispatch({ type: UPDATE_HISTORY, payload: { history: data } });
      } catch (e) {
        console.log(e);
      }
    },
    [authFetch]
  );

  // GET ALL CHALLENGES OF LOGGED IN USER
  const getAllChallenges = useCallback(
    async (id) => {
      try {
        const { data } = await authFetch.get(`/challenge/${id}`);

        dispatch({ type: GET_ALL_CHALLENGES, payload: { challenges: data } });
      } catch (e) {
        console.log(e);
      }
    },
    [authFetch, dispatch]
  );

  // UPDATE USER'S MMR - RANKED GAME
  const updateMMR = useCallback(
    async (new_mmr) => {
      try {
        const { data } = await authFetch.patch(`/auth/updateMMR`, { new_mmr });

        dispatch({ type: UPDATE_USER_MMR, payload: { mmr: data.mmr } });
      } catch (e) {
        console.log(e);
      }
    },
    [authFetch, dispatch]
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

  const declinePvp = useCallback(
    async (declined_id, history_id) => {
      try {
        await authFetch.patch(`/challenge/decline/${declined_id}`, {
          status: "declined",
          history_id,
        });

        dispatch({ type: DECLINE_CHALLENGE, payload: { declined_id } });
      } catch (e) {
        console.log(e);
      }
    },
    [authFetch, dispatch]
  );

  const acceptPvp = useCallback(
    (to_challenge, curGame) => {
      dispatch({
        type: ACCEPT_CHALLENGE,
        payload: { user: to_challenge, currentGame: curGame },
      });
    },
    [dispatch]
  );

  const uploadPic = useCallback(
    async (formData) => {
      try {
        await authFetch.patch("auth/upload", formData);
      } catch (e) {
        console.log(e);
      }
    },
    [authFetch]
  );

  const memoizedValues = useMemo(
    () => ({
      getUsers,
      displayAlert,
      setupUser,
      logoutUser,
      updateUser,
      updateMMR,
      showModal,
      getAllHistory,
      newHistory,
      updateHistory,
      getAllChallenges,
      newChallenge,
      handlePvPModal,
      handleFindModal,
      handlePracticeModal,
      handleRankModal,
      handleSetMode,
      handleGameResultModal,
      handleSetToChallenge,
      acceptPvp,
      declinePvp,
      uploadPic,
    }),
    [
      getUsers,
      displayAlert,
      setupUser,
      logoutUser,
      updateUser,
      updateMMR,
      showModal,
      getAllHistory,
      newHistory,
      updateHistory,
      getAllChallenges,
      newChallenge,
      handlePvPModal,
      handleFindModal,
      handlePracticeModal,
      handleRankModal,
      handleSetMode,
      handleGameResultModal,
      handleSetToChallenge,
      acceptPvp,
      declinePvp,
      uploadPic,
    ]
  );

  return (
    <AppContext.Provider
      value={{
        ...state,
        ...memoizedValues,
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
