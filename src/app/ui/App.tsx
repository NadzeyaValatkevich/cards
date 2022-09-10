import React, {useState} from 'react';
import './App.css';
import {store} from "../bll/store";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";
import {Header} from "./header/Header";
import {ContentContainer} from "../../common/components/contentContainer/ContentContainer";

const App = () => {
    const [headerHeight, setHeaderHeight] = useState(0)
    return (
        <HashRouter>
            <Provider store={store}>
                <div className="App">
                    <Header onHeightChanged={setHeaderHeight}/>
                    <ContentContainer stepDown={headerHeight}>
                        <AppRoutes/>
                    </ContentContainer>
                </div>
            </Provider>
        </HashRouter>
    )
}

export default App;