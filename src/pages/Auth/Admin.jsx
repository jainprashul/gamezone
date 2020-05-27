import React, { useState, useContext } from 'react'
import { IonPage, IonHeader, IonTitle, IonContent, useIonViewDidEnter, useIonViewWillLeave, IonItem, IonList, IonLabel, IonToolbar, IonItemOptions, IonItemOption, IonItemSliding, IonIcon } from '@ionic/react'
import withAuthorization from './withAuthorization'
import { FirebaseContext } from '../../context/FirebaseContext';
import { loadingController } from '@ionic/core';
import { trash, logoIonic } from 'ionicons/icons';
const Admin = () => {

    const [users, setUsers] = useState([]);
    const firebase = useContext(FirebaseContext);
    useIonViewDidEnter(() => {

        loadingController.create({
            id: 'loadingusers',
            spinner: "crescent",
            message: "loading..."
        }).then(res => res.present());
        firebase.users().on('value', snap => {
            // console.log(snap);
            const userObj = snap.val();
            // console.log(userObj);
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

    function deleteUser(uid) {
        let p = prompt('Are U Sure to Delete User Data ? Type Yes');
        if (p.toLowerCase() === 'yes') {
            firebase.user(uid).remove();
        }
    }

    const userList = users.map((user) => (
        <IonItemSliding key={user.uid} className='ion-padding'>
            <IonItem>
                <IonLabel>
                    <IonTitle>{user.username}</IonTitle>
                    <p>Name: {user.name}</p>
                    <p>Email : {user.email}</p>
                    <p>Phone : {user.phone}</p>
                </IonLabel>
            </IonItem>

            <IonItemOptions side='end'>
                <IonItemOption onClick={()=>deleteUser(user.uid)} color='danger' >
                    <IonIcon  icon={trash} />
                </IonItemOption>
            </IonItemOptions>
            <IonItemOptions side='start'>
                <IonItemOption color='light'>

                    <IonLabel><IonIcon icon={logoIonic} /> {user.stats.walletBal}
                        <p>walletBal</p></IonLabel>


                </IonItemOption>
                <IonItemOption color='light' >

                     {user.stats.matches}
                    <p>matches</p>
                </IonItemOption>
                <IonItemOption color='light' >

                    {user.stats.winMatches}
                    <p>winMatches</p>

                </IonItemOption>
            </IonItemOptions>

        </IonItemSliding>
    ))

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Admin</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <h1>Admin</h1>
                <IonList>
                    {userList}

                </IonList>

            </IonContent>
        </IonPage>
    )
}

export default withAuthorization(Admin)
