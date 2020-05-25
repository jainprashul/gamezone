import React, { useState, useContext } from 'react'
import { IonPage, IonHeader, IonTitle, IonContent, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react'
import withAuthorization from './withAuthorization'
import { FirebaseContext } from '../../../context/FirebaseContext';
import { loadingController } from '@ionic/core';
const Admin = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext);
    useIonViewDidEnter(() => {

        loadingController.create({
            id: 'loadingusers',
            spinner: "crescent",
            message: "loading..."
        }).then(res => res.present());
        firebase.users().on('value', snap => {
            console.log(snap);
            const userObj = snap.val();
            console.log(userObj);
            const userList = Object.keys(userObj).map(key => ({
                ...userObj[key],
                uid: key,
            }));

            console.log(userList);
            setUsers(userList);
            loadingController.dismiss(null, '', 'loadingusers');
        });
    });

    useIonViewWillLeave(() => {
        firebase.users().off();
    });

    return (
        <IonPage>
            <IonHeader>
                <IonTitle>
                    ADMIN PANEL
                </IonTitle>
            </IonHeader>
            <IonContent className='ion-padding'>
                <h1>Admin</h1>
            </IonContent>
        </IonPage>
    )
}

export default withAuthorization(Admin)
