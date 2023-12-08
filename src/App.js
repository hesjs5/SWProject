import BoardDetail from "./component/boards/BoardDetail";
import BoardList from "./component/boards/BoardList";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardCreate from "./component/boards/BoardCreate";
import { createContext } from "react";
import BoardEdit from "./component/boards/BoardEdit";
import Signup from "./component/members/SignUp";
import Header from "./component/layout/Header";
import Login from "./component/members/Login";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

export const LoginContext = createContext({
  token: "",
  isLoggedIn: false,
});

const contextValue = {
  token: "",
  isLoggedIn: false,
  memberName: "",
};

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

const loginRedux = {
  token: "",
  isLoggedIn: false,
  memberName: "",
};

const myReducer = (state = loginRedux, action) => {
  switch (action.type) {
    case "DO_LOGIN":
      return {
        token: action.payload.token,
        isLoggedIn: action.payload.isLoggedIn,
        memberName: action.payload.memberName,
      };
    case "DO_LOGOUT":
      return {
        token: "",
        isLoggedIn: false,
        memberName: "",
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: myReducer,
});

function App() {
  return (
    <div className="App">
      <LoginContext.Provider value={contextValue}>
        <Provider store={store}>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup />}>
                {" "}
              </Route>
              <Route path="/login" element={<Login />}>
                {" "}
              </Route>

              {/**/}

              <Route path="/boards" element={<BoardList />}>
                {" "}
              </Route>
              <Route path="/boards/:id" element={<BoardDetail />}>
                {" "}
              </Route>
              <Route path="/boards/create" element={<BoardCreate />}>
                {" "}
              </Route>
              <Route path="/boards/:id/edit" element={<BoardEdit />}>
                {" "}
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
