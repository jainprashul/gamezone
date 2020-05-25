import React from 'react'
import { IonPage, IonHeader, IonTitle, IonBackButton, IonContent, IonToolbar, IonButtons } from '@ionic/react'
import { useTabHide } from './Hooks';
import withAuthorization from '../pages/Auth/withAuthorization';




const GameBox = ({component:Game, name , ...rest}) => {
    useTabHide();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <Game {...rest}/>

                
            </IonContent>
        </IonPage>
    )
}

export default withAuthorization(GameBox)


