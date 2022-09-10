import React from 'react';
import {Route, Routes} from "react-router-dom";

type PropsType = {}

export const AppRoutes: React.FC<PropsType> = ({}) =>
    <Routes>
        <Route path="/" element={<div style={{padding: 50, height: "100vh"}}>Test</div>}/>
    </Routes>