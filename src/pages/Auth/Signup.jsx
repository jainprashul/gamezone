import React, { useState, useContext } from 'react'
import { IonPage, IonContent, IonCard, IonCardHeader, IonItem, IonLabel, IonCardContent, IonInput, IonButton, IonText, IonTitle, IonHeader, IonToolbar, IonProgressBar } from '@ionic/react';
import { Link } from 'react-router-dom';
import { useTabHide, createToast } from '../../components/Hooks';
import { FirebaseContext } from '../../context/FirebaseContext';
import { Config, setConfig } from '../../components/Config';

const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('');
    const [repwd, setRepwd] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const firebase = useContext(FirebaseContext);

    useTabHide();


    function clearStates() {
        setEmail('');
        setUsername('');
        setLoading(false);
        setError(null);
        setPwd('');
        setRepwd('');
    }

    function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (pwd === repwd) {
            firebase.doCreateUser(email, pwd).then(authUser => {
                console.log(authUser);
                setConfig('user', authUser)
                return firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    stats : Config,
                });
            }
            ).then(() => {
                createToast('User Created Successfully');
                clearStates();
                props.history.push('/');
            }).catch(err => {
                console.log(err);
                setError(err.message)
            })
        } else {
            setError('The passwords must be same.')
        }

              



    }

    const isInvalid =  pwd !== repwd || pwd === '';

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-margin ion-padding ion-text-center'>
                <IonCard sizeMd='10' className='ion-padding ion-text-center'>
                    <IonCardHeader>
                        <IonTitle>Sign Up Form</IonTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <form method='POST' onSubmit={onSubmit}>
                            <IonItem>
                                <IonLabel position='stacked'>Username</IonLabel>
                                <IonInput required='true' type='text' id='username' onIonInput={e => setUsername(e.target.value)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position='stacked'>Email</IonLabel>
                                <IonInput required='true' type='email' id='email' onIonInput={e => setEmail(e.target.value)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position='stacked'>Password</IonLabel>
                                <IonInput required='true' type='password' id='password' onIonInput={e => setPwd(e.target.value)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position='stacked'>Retype Password</IonLabel>
                                <IonInput required='true' type='password' id='password' onIonInput={e => {
                                    setRepwd(e.target.value);
                                    if (e.target.value !== pwd) {
                                        setError('The password must be Same');
                                    } else {
                                        setError(null)
                                    }
                                }}></IonInput>
                            </IonItem>

                            <div className="ion-padding">
                                <IonProgressBar hidden={!loading} type='indeterminate'></IonProgressBar>

                                <IonButton type='submit' size='default' disabled={loading || isInvalid} expand='block'>Sign Up</IonButton>
                            </div>

                            {error && <IonText color='danger' class='red-text' >{error}</IonText>}

                        </form>

                    </IonCardContent>
                </IonCard>

                <IonText className=' ion-padding' >Have an account? <Link to='/signin' >Sign In</Link> </IonText>
            </IonContent>
        </IonPage>

    )
}

export default SignUp
