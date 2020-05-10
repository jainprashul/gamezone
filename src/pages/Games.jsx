import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonListHeader, IonList } from '@ionic/react';
import './Tab1.css';
import GameList from '../components/GameList';



const Games = () => {



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Games</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <GameList/>
        
      </IonContent>
    </IonPage>
  );
};

export default Games;
