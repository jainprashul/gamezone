import React from 'react'
import { IonPage, IonHeader, IonTitle, IonBackButton, IonContent, IonToolbar, IonButtons } from '@ionic/react'




const GameBox = ({component:Game, name , ...rest}) => {
    
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

export default GameBox


