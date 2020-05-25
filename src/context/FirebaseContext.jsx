import { createContext } from "react";
import React from 'react'
import Firebase from "../components/FireBase/firebase";

export const FirebaseContext = createContext();

const FirebaseContextProvider = (props) => {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseContextProvider
