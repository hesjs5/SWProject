import BoardDetail from './component/boards/BoardDetail';
import BoardList from './component/boards/BoardList';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import BoardCreate from "./component/boards/BoardCreate";
import {createContext} from "react";
import BoardEdit from "./component/boards/BoardEdit";
import Header from "./component/layout/Header";

export const LoginContext = createContext({
    token: '',
    isLoggedIn: false
});

const contextValue = {
    token: '',
    isLoggedIn: false,
    memberName: '',
};

function App() {

    return (
        <div className="App">
            <LoginContext.Provider value={contextValue}>
                <Header />
                <BrowserRouter>
                    <Routes>

                        <Route path="/boards" element={<BoardList/>}> </Route>
                        <Route path="/boards/:id" element={<BoardDetail/>}> </Route>
                        <Route path="/boards/create" element={<BoardCreate/>}> </Route>
                        <Route path="/boards/:id/edit" element={<BoardEdit/>}> </Route>

                    </Routes>
                </BrowserRouter>
            </LoginContext.Provider>
        </div>
    );
}

export default App;