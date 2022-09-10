import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./navbar.module.scss"

export const Navbar: React.FC = () => {
    const classNameGetter = (navData: { isActive: boolean }) => navData.isActive ? s.active : ''
    
    return (
        <nav className={s.navbar}>
            
            <NavLink to={'/login'} className={classNameGetter}>
                Sign in
            </NavLink>
            
            <NavLink to={'/registration'} className={classNameGetter}>
                Sign up
            </NavLink>
            
            <NavLink to={'/profile'} className={classNameGetter}>
                Profile
            </NavLink>
            
            <NavLink to={'/password_reset'} className={classNameGetter}>
                Recovery
            </NavLink>
            
            <NavLink to={'/password_new'} className={classNameGetter}>
                New password
            </NavLink>
            
            <NavLink to={'/test'} className={classNameGetter}>
                Test
            </NavLink>
        
        </nav>
    )
}