import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
