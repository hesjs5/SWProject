export const isLogin = () => !!localStorage.getItem("token");

export const isOwner = (memberID, loginMemberIDState) => {
  return memberID === loginMemberIDState;
};

export const isAdmin = (roleState) => {
  return roleState === "ADMIN";
};
