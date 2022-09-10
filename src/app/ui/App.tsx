import React from 'react';
import './App.css';
import {store} from "../bll/store/store";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import {Header} from "./header/Header";
import {AppRoutes} from "./routes/AppRoutes";

const App = () => (
    <HashRouter>
        <Provider store={store}>
            <div className="App">
                <Header fixed>Header</Header>
                <AppRoutes/>
            </div>
        </Provider>
    </HashRouter>
)

export default App;