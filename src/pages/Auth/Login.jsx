import React, { useState, useContext } from 'react'
import { IonPage, IonContent, IonCard, IonCardHeader, IonItem, IonLabel, IonCardContent, IonInput, IonButton, IonText, IonTitle, IonHeader, IonToolbar, IonProgressBar } from '@ionic/react';
import { Link } from 'react-router-dom';
import { useTabHide } from '../../components/Hooks';
import { FirebaseContext } from '../../context/FirebaseContext';

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

                    </IonCardContent>
                </IonCard>

                <IonText className=' ion-padding' >Don't have an account? <Link to='/signup' >Sign Up</Link> </IonText>
            </IonContent>
        </IonPage>
        
    )
}

export default Login
