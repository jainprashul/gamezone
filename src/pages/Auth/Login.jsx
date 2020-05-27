import React, { useState, useContext } from 'react'
import { IonPage, IonContent, IonCard, IonCardHeader, IonItem, IonLabel, IonCardContent, IonInput, IonButton, IonText, IonTitle, IonHeader, IonToolbar, IonProgressBar, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import { useTabHide } from '../../components/Hooks';
import { FirebaseContext } from '../../context/FirebaseContext';
import { logoGoogle } from 'ionicons/icons';
import { setConfig, Config } from '../../components/Config';

const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const firebase = useContext(FirebaseContext)

    const isInValid = email === "" || pwd === "";

    useTabHide();


    function clearStates() {
        setEmail('');
        setLoading(false);
        setError(null);
        setPwd('');
    }

    function signwithGoogle() {
        firebase.doSignInWithGoogle().then(authData => {
            console.log(authData);
            // console.log(authData.additionalUserInfo.isNewUser);
            let isNewUser = authData.additionalUserInfo.isNewUser 
            setConfig('user', authData.user);
            if (isNewUser) {
                return firebase.user(authData.user.uid).update({
                    email: authData.user.email,
                    username: (authData.user.email).substring(0, (authData.user.email).indexOf('@')),
                    stats: Config,
                });
            }    
        }).then(() => {
            clearStates();
            history.push('/');
        }).catch(err => {
            console.log(err);
            setError(err.message)
        });
    }



    function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        
        firebase.doSignIn(email, pwd).then(authData => {
            clearStates();
            console.log(authData);
            history.push('/');
        }
        ).catch(err => {
            console.log(err);
            setError(err.message)
        })

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-margin ion-padding ion-text-center'>
                <IonCard sizeMd='10' className='ion-padding ion-text-center'>
                    <IonCardHeader>
                        <IonTitle>Log In</IonTitle>
                    </IonCardHeader>
                    <IonCardContent>


                        <form onSubmit={onSubmit}>
                            <IonItem>
                                <IonLabel position='stacked'>Email</IonLabel>
                                <IonInput required='true' type='email' id='email' onIonInput={e => setEmail(e.target.value)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position='stacked'>Password</IonLabel>
                                <IonInput required='true' type='password' id='password' onIonInput={e => setPwd(e.target.value)}></IonInput>
                            </IonItem>

                            <div className="ion-padding">
                                <IonProgressBar hidden={!loading} type='indeterminate'></IonProgressBar>

                                <IonButton type='submit' size='default' disabled={loading || isInValid} expand='block'>Login</IonButton>
                            </div>

                            {error && <IonText class='red-text' >{error}</IonText>}


                            <br/>
                            <Link to='/forgot_pwd'>Forgot Password ?</Link>

                        </form>
                        <p>OR</p>

                        <IonButton onClick={signwithGoogle} size='default' expand='block'>Sign IN with <IonIcon icon={logoGoogle} /></IonButton>


                    </IonCardContent>
                </IonCard>

                <IonText className=' ion-padding' >Don't have an account? <Link to='/signup' >Sign Up</Link> </IonText>
            </IonContent>
        </IonPage>
        
    )
}

export default Login
