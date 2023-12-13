import { loginRedux } from "./states";

export const myReducer = (state = loginRedux, action) => {
  switch (action.type) {
    case "DO_LOGIN":
      return {
        isLoggedIn: action.payload.isLoggedIn,
        memberID: action.payload.memberID,
        role: action.payload.role,
      };
    case "DO_LOGOUT":
      return {
        isLoggedIn: false,
        memberID: "",
        role: "",
      };
    default:
      return state;
  }
};
