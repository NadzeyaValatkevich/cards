import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../../features/f1-auth/login/ui/Login";
import {Registration} from "../../../features/f1-auth/registration/ui/Registration";
import {Profile} from "../../../features/f1-auth/profile/ui/Profile";
import {NewPassword} from "../../../features/f1-auth/newPassword/ui/NewPassword";
import {ResetPassword} from "../../../features/f1-auth/resetPassword/ui/ResetPassword";
import {PageNotFound} from "../../../features/pageNotFound/ui/PageNotFound";

export const AppRoutes: React.FC = () =>
    <Routes>
        <Route path="/" element={<Navigate to={"/login"}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/password_new" element={<NewPassword/>}/>
        <Route path="/password_reset" element={<ResetPassword/>}/>
        
        <Route path="*" element={<PageNotFound/>}/>
    </Routes>