import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonAvatar, IonIcon, IonCardContent, IonLabel, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Wallet.css';
import { peopleCircle, people, personCircleOutline } from 'ionicons/icons';

const Wallet = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonCard className='balance'>
          <IonCardHeader>
            <h2>Available Balance</h2>
          </IonCardHeader>
          <IonCardContent>
            <IonAvatar className='center'>
              <IonIcon className='ico' icon={personCircleOutline}></IonIcon>
              <IonLabel>User</IonLabel>
            </IonAvatar>
            <h1>&#8377; 0</h1>
            <br/>
            <IonButton expand='full'>Add Balance</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Wallet;
