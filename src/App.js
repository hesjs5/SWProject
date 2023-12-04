import BoardDetail from './component/BoardDetail';
import BoardList from './component/BoardList';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import BoardCreate from "./component/BoardCreate";
 
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>

                    <Route path="/boards" element={<BoardList/>}> </Route>
                    <Route path="/boards/:id" element={<BoardDetail/>}> </Route>
                    <Route path="/boards/create" element={<BoardCreate/>}> </Route>

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;