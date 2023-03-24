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

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
