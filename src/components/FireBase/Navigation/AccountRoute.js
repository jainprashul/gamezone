import React from 'react'
import { Route } from 'react-router'
import Login from '../../../pages/Auth/Login'
import SignUp from '../../../pages/Auth/Signup'
import ResetPassword from '../../../pages/Auth/ResetPassword'
import ChangePassword from '../../../pages/Auth/ChangePassword'
import Admin from '../../../pages/Auth/Admin'
import UserProfile from '../../../pages/UserProfile'

const AccountRoute = () => {
    return (
        <>
            <Route path='/signin' exact component={Login} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/admin' exact component={Admin} />
            <Route path='/forgot_pwd' exact component={ResetPassword} />
            <Route path='/change_pwd' exact component={ChangePassword} />
            <Route path='/userProfile' exact component={UserProfile} />
        </>
    )
}

export default AccountRoute
