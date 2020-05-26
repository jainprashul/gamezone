import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import GameList from '../components/GameList';
import withAuthorization from './Auth/withAuthorization';



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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins className="adsbygoogle"
          style={{display:'block'}}
          data-ad-client="ca-pub-2188611974126942"
          data-ad-slot="8217409630"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
</script>
      </IonContent>
    </IonPage>
  );
};

export default withAuthorization(Games);
