/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react'
import withAuthorization from './Auth/withAuthorization'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel, IonInput, IonButtons, IonButton, IonIcon } from '@ionic/react'
import { FirebaseContext } from '../context/FirebaseContext'
import { createToast } from '../components/Hooks'
import { pencil } from 'ionicons/icons'
import { getConfig } from '../components/Config'

const UserProfile = (props) => {
    const firebase = useContext(FirebaseContext);
    let{username , phone}=getConfig();
    const [user] = useState(() => firebase.getCurrentUserProfile());
    const [editing, setEditing] = useState(false);
    const [phoneNo, setPhoneNo] = useState(phone);
    const [userName, setUserName] = useState(username);
    console.log(user);
    function updateUserData() {
        const uid = user.uid;
        firebase.user(uid).update({
            name: user.displayName,
            phone: phoneNo,
            username: userName
        });
    }

    function updatePhoneNumber(num) {
        // 'recaptcha-container' is the ID of an element in the DOM.
        var applicationVerifier = new firebase.auth.RecaptchaVerifier(
            'recaptcha-container');
        var provider = new firebase.auth.PhoneAuthProvider();
        provider.verifyPhoneNumber('+91'+num, applicationVerifier)
            .then(function (verificationId) {
                var verificationCode = window.prompt('Please enter the verification ' +
                    'code that was sent to your mobile device.');
                return firebase.auth.PhoneAuthProvider.credential(verificationId,
                    verificationCode);
            })
            .then(function (phoneCredential) {
                return user.updatePhoneNumber(phoneCredential);
            });
    }

    const UserDisplay = () => user ? (
        <>
            <IonItem className="ion-text-center">
                <IonAvatar>
                    <img alt='profile' src={user.photoURL ? user.photoURL : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"} />
                </IonAvatar>
            </IonItem>
            <IonItem>Name : {user.displayName}</IonItem>
            <IonItem>Email : {user.email}</IonItem>
            <IonItem>Phone : {phoneNo}</IonItem>
            <IonItem>UID : {user.uid}</IonItem>
            <IonItem>Email Verified : {user.emailVerified ? <span>Done</span> :
                <a onClick={() => {
                    user.sendEmailVerification().then(() => createToast('Mail Sent to you , please Verify!', 'warning'))
                }} >Verify</a>}
            </IonItem>
        </>
    ) : (<p>Login the User To See Data</p>);

    const EditForm = () => (
        <div>
            <IonItem>
                <IonLabel position='stacked'>Name</IonLabel>
                <IonInput required='true' type='text' id='diplayName' value={user.displayName} onIonInput={e => user.updateProfile({displayName : e.target.value})}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position='stacked'>Phone</IonLabel>
                <IonInput required='true' type='text' id='phone' value={phoneNo} onIonInput={e => setPhoneNo(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position='stacked'>Username</IonLabel>
                <IonInput required='true' type='text' id='phone' value={username} onIonInput={e => setUserName(e.target.value)}></IonInput>
            </IonItem>
            
            

        </div>
    )



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton hidden={editing} onClick={()=> setEditing(true)}><IonIcon icon={pencil}/></IonButton>
                        <IonButton hidden={!editing} onClick={() => { setEditing(false); updateUserData();}}>Done</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding '>
                <h1 className='ion-text-center ion-text-capitalize'>User Profile</h1>
                {editing ? <EditForm /> : <UserDisplay user={user} />}
            </IonContent>
        </IonPage>
    )
}


export default withAuthorization(UserProfile)
