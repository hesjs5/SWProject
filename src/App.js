import BoardDetail from './component/BoardDetail';
import BoardList from './component/BoardList';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import BoardCreate from "./component/BoardCreate";
import {createContext} from "react";
import BoardEdit from "./component/BoardEdit";

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