import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configApp from './components/Config';
import FirebaseContextProvider from './context/FirebaseContext';
import AuthContextProvider from './context/AuthContext';

configApp();

const LandingApp = () => (
    <FirebaseContextProvider>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </FirebaseContextProvider>
)


ReactDOM.render(<LandingApp/> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
