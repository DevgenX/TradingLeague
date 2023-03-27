import {
  SHOW_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  SHOW_POPUP,
  HIDE_POPUP,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_ALL_USERS,
  SHOW_PRACTICE_MODAL,
  SHOW_PVP_MODAL,
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
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === SHOW_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all required fields!",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === GET_ALL_USERS) {
    return {
      ...state,
      users: action.payload,
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === SHOW_POPUP) {
    return {
      ...state,
      showPopup: !state.showPopup,
    };
  }

  if (action.type === HIDE_POPUP) {
    return {
      ...state,
      showPopup: !state.showPopup,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: "Profile updated successfully!",
      showPopup: false,
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // UPDATE USER'S MMR
  if (action.type === UPDATE_USER_MMR) {
    // UPDATE MMR IN USERS[] (TO UPDATE LEADERBOARDS)
    const updated_users = state.users.map((u) =>
      u?._id == action.payload._id
        ? {
            ...u,
            mmr: action.payload.mmr,
          }
        : u
    );

    localStorage.setItem(
      "user",
      JSON.stringify({ ...state.user, mmr: action.payload.mmr })
    );

    return {
      ...state,
      user: { ...state.user, mmr: action.payload.mmr },
      users: updated_users,
    };
  }

  if (action.type === SHOW_PRACTICE_MODAL) {
    return {
      ...state,
      showPractice: !state.showPractice,
    };
  }

  if (action.type === SHOW_RANK_MODAL) {
    return {
      ...state,
      showRankModal: !state.showRankModal,
    };
  }

  if (action.type === SHOW_PVP_MODAL) {
    return {
      ...state,
      showPvPModal: !state.showPvPModal,
    };
  }

  // Show modal to find challenger
  if (action.type === SHOW_FIND_MODAL) {
    return {
      ...state,
      showFindModal: !state.showFindModal,
    };
  }

  if (action.type === SHOW_GAME_RESULT_MODAL) {
    return {
      ...state,
      showGameResult: !state.showGameResult,
    };
  }

  if (action.type === SET_GAME_MODE) {
    return {
      ...state,
      mode: action.mode,
    };
  }

  // DECLINE PVP
  if (action.type === DECLINE_CHALLENGE) {
    return {
      ...state,
      challenges: state.challenges.filter(
        (c) => c._id !== action.payload.declined_id
      ),
    };
  }

  // ACCEPT PVP
  if (action.type === ACCEPT_CHALLENGE) {
    // SET TOCHALLENGE
    return {
      ...state,
      toChallenge: action.payload.user,
      currentGame: action.payload.currentGame,
      challenges: state.challenges.filter(
        (c) => c._id !== action.payload.currentGame._id
      ),
    };
  }

  // LOAD ALL GAME HISTORY
  if (action.type === GET_ALL_HISTORY) {
    return {
      ...state,
      history: action.payload.history,
    };
  }

  // ADD NEW GAME HISTORY
  if (action.type === ADD_NEW_HISTORY) {
    return {
      ...state,
      history: [action.payload.history, ...state.history],
    };
  }

  // UPDATE HISTORY
  if (action.type === UPDATE_HISTORY) {
    return {
      ...state,
      history: [action.payload.history, ...state.history],
    };
  }

  // SET CHALLENGES OF USER
  if (action.type === GET_ALL_CHALLENGES) {
    return {
      ...state,
      challenges: action.payload.challenges,
    };
  }

  // SET TO CHALLENGE USER
  if (action.type === SET_TO_CHALLENGE) {
    return {
      ...state,
      toChallenge: action.payload.user,
    };
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
