import React, { useContext, useEffect } from 'react'
import { FirebaseContext } from '../../../context/FirebaseContext'
import AuthContextProvider, { AuthUserContext } from '../../../context/AuthContext';

const withAuthentication = Component => props => {
    const firebase = useContext(FirebaseContext);
    const {setAuthUser} = useContext(AuthUserContext);
    
  

       
    return (
        <AuthContextProvider>
            <Component {...props} />
        </AuthContextProvider>
    )
}

export default withAuthentication
