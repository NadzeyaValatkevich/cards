import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Recovery } from '../../features/auth/ui/Recovery'
import { SignIn } from '../../features/auth/ui/SignIn'
import { SignUp } from '../../features/auth/ui/SignUp'
import { PageNotFound } from '../../features/pageNotFound/ui/PageNotFound'
import { Profile } from '../../features/profile/ui/Profile'

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'/login'} />} />
    <Route path="/login" element={<SignIn />} />
    <Route path="/registration" element={<SignUp />} />
    <Route path="/forgot" element={<Recovery />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
)
