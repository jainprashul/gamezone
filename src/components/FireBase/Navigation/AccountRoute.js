import React from 'react'
import { Route } from 'react-router'
import Login from '../Auth/Login'
import SignUp from '../Auth/Signup'
import ResetPassword from '../Auth/ResetPassword'
import ChangePassword from '../Auth/ChangePassword'
import Admin from '../Auth/Admin'

const AccountRoute = () => {
    return (
        <>
            <Route path='/signin' exact component={Login} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/admin' exact component={Admin} />
            <Route path='/forgot_pwd' exact component={ResetPassword} />
            <Route path='/change_pwd' exact component={ChangePassword} />
        </>
    )
}

export default AccountRoute
