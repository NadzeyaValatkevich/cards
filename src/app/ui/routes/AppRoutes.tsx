import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../../features/f1-auth/login/ui/login/Login";
import {Registration} from "../../../features/f1-auth/registration/ui/registration/Registration";
import {Profile} from "../../../features/f1-auth/profile/ui/profile/Profile";
import {NewPassword} from "../../../features/f1-auth/newPassword/ui/newPassword/NewPassword";
import {ResetPassword} from "../../../features/f1-auth/resetPassword/ui/resetPassword/resetPassword";

export const AppRoutes: React.FC = () =>
    <Routes>
        <Route path="/" element={<Navigate to={"/login"}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/password_new" element={<NewPassword/>}/>
        <Route path="/password_reset" element={<ResetPassword/>}/>
        
        <Route path="*" element={<h1>404</h1>}/>
    </Routes>