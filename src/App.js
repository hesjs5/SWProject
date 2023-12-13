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
import PrivateRoute from "./common/PrivateRoute";
import PublicRoute from "./common/PublicRoute";
import { myStore } from "./modules/stores";

function App() {
  return (
    <div className="App">
      <Provider store={myStore}>
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
