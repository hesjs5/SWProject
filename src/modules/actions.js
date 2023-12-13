export const myLogin = (payload) => {
  return {
    type: "DO_LOGIN",
    payload,
  };
};

export const myLogout = () => {
  return {
    type: "DO_LOGOUT",
  };
};
