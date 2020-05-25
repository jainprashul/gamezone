import React, { useState, useContext } from 'react'
import { IonPage, IonContent, IonCard, IonCardHeader, IonItem, IonLabel, IonCardContent, IonInput, IonButton, IonText, IonTitle, IonHeader, IonToolbar } from '@ionic/react';
import { Link } from 'react-router-dom';
import { useTabHide } from '../../components/Hooks';
import { FirebaseContext } from '../../context/FirebaseContext';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const firebase = useContext(FirebaseContext);

    useTabHide();

    const isInValid = email === '';
    function resetState() {
        setEmail('');
        setError(null);
    }

    function onSubmit(e) {
        e.preventDefault();
        firebase.doPasswordReset(email).then(() => {
            resetState();
        }).catch(err => setError(err.message));

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Reset Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-margin ion-padding ion-text-center'>
                <IonCard sizeMd='10' className='ion-padding ion-text-center'>
                    <IonCardHeader>
                        <IonTitle>Reset Password</IonTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <form onSubmit={onSubmit}>
                            <IonItem>
                                <IonLabel position='stacked'>Email</IonLabel>
                                <IonInput required='true' type='email' id='email' onIonInput={e => setEmail(e.target.value)}></IonInput>
                            </IonItem>

                            <div className="ion-padding">
                                <IonButton type='submit' size='default' disabled={loading || isInValid} expand='block'>Reset My Password</IonButton>
                            </div>

                            {error && <IonText class='red-text' >{error}</IonText>}

                        </form>

                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>

    )
}

export default ResetPassword
