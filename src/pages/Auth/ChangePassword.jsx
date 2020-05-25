import React, { useState, useContext } from 'react'
import { IonPage, IonContent, IonCard, IonCardHeader, IonItem, IonLabel, IonCardContent, IonInput, IonButton, IonText, IonTitle, IonHeader, IonToolbar } from '@ionic/react';
import { useTabHide } from '../../components/Hooks';
import { FirebaseContext } from '../../context/FirebaseContext';
import { AuthUserContext } from '../../context/AuthContext';
import withAuthorization from './withAuthorization';

const ChangePassword = () => {
    const [pwd, setPwd] = useState('');
    const [retypePwd, setRetypePwd] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { authUser } = useContext(AuthUserContext);
    const firebase = useContext(FirebaseContext);
    const isInvalid = pwd !== retypePwd || pwd === '';
    useTabHide();
    function resetState() {
        setPwd('');
        setRetypePwd('');
        setError(null);
    }

    function onSubmit(e) {
        e.preventDefault();
        firebase.doPasswordUpdate(pwd).then(() => {
            resetState();
            console.log("Password Changed");
            
        }).catch(error => setError(error.message));


    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Change Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-margin ion-padding ion-text-center'>
                <IonCard sizeMd='10' className='ion-padding ion-text-center'>
                    <IonCardHeader>
                        <IonTitle>Change Password</IonTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <form onSubmit={onSubmit}>
                            <IonText>Email: {authUser && authUser.email}</IonText>
                            <IonItem>
                                <IonLabel position='stacked'>Password</IonLabel>
                                <IonInput required='true' type='password' id='password' onIonInput={e => setPwd(e.target.value)}></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel position='stacked'>Retype Password</IonLabel>
                                <IonInput required='true' type='password' id='password' onIonInput={e => {
                                    setRetypePwd(e.target.value);
                                    if (e.target.value !== pwd) {
                                        setError('The password must be Same');
                                    } else {
                                        setError('')
                                    }
                                }}></IonInput>
                            </IonItem>

                            <div className="ion-padding">
                                <IonButton type='submit' size='default' disabled={loading || isInvalid} expand='block'>Change Password</IonButton>
                            </div>

                            {error && <IonText class='red-text' >{error}</IonText>}

                        </form>

                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>

    )
}

export default withAuthorization(ChangePassword)
