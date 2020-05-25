import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonTitle, IonBackButton, IonContent, IonToolbar, IonButtons, IonBadge, IonIcon, IonChip, IonText } from '@ionic/react'
import { useTabHide } from './Hooks';
import withAuthorization from '../pages/Auth/withAuthorization';
import { logoIonic } from 'ionicons/icons';
import { getConfig } from './Config';



const GameBox = ({ component: Game, name, ...rest }) => {
    const [balance, setBalance] = useState(()=> getConfig().walletBal)
    useTabHide();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                    <IonChip slot='end'>
                        <IonText color='warning'>{balance}</IonText>
                        <IonIcon color='warning' icon={logoIonic}/>
                    </IonChip>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <Game setBal={setBalance} {...rest}/>

                
            </IonContent>
        </IonPage>
    )
}

export default withAuthorization(GameBox)


