import BoardDetail from "./component/boards/BoardDetail";
import BoardList from "./component/boards/BoardList";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardCreate from "./component/boards/BoardCreate";
import BoardEdit from "./component/boards/BoardEdit";
import Signup from "./component/members/SignUp";
import Header from "./component/layout/Header";
import Login from "./component/members/Login";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PrivateRoute from "./common/PrivateRoute";
import PublicRoute from "./common/PublicRoute";

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
  isLoggedIn: false,
  memberID: "",
  role: "",
};

const myReducer = (state = loginRedux, action) => {
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

const store = configureStore({
  reducer: myReducer,
});

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="/boards" element={<BoardList />} />
            <Route path="/boards/:id" element={<BoardDetail />} />

            <Route element={<PrivateRoute />}>
              <Route path="/boards/create" element={<BoardCreate />} />
              <Route path="/boards/:id/edit" element={<BoardEdit />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
