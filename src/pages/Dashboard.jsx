import React, { useState, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonChip, IonCard, IonLabel, IonRow, IonCol, IonBadge, IonItem, IonButton, useIonViewDidEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Dashboard.css';

import { IonRefresher, IonRefresherContent } from '@ionic/react';
import { arrowDownSharp } from 'ionicons/icons';

function doRefresh(e) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    e.detail.complete();
  }, 2000);
}

let deferredPrompt;




const Dashboard = () => {
  const [winningAmt, setWinningAmt] = useState(0)
  const [matches, setMatches] = useState(0);
  const [winMatches, setWinMatches] = useState(0);
  const winningPercentage = (winMatches / matches) * 100;
  const install = useRef(null)
  useIonViewDidEnter(() => {
    const x = document.getElementById('installbtn');
    window.addEventListener('beforeinstallprompt', (e) => {
      deferredPrompt = e;
      
      
      x.classList.toggle('ion-hide', false)
    });

    window.addEventListener('appinstalled', (event) => {
      console.log('👍', 'appinstalled', event);
    });

  });


  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* <IonRefresher slot='fixed' onIonRefresh={doRefresh}>
          <IonRefresherContent pullingIcon={arrowDownSharp} pullingText='Pull to refresh' refreshingSpinner='crescent'></IonRefresherContent>
        </IonRefresher> */}
        <div className="container">
          <IonButton expand='full' ref={install} id='installbtn' className='ion-margin ion-hide'
            onClick={() => {
              const promptEvent = deferredPrompt;
              const x = document.getElementById('installbtn');
              if (!promptEvent) {
                return;
              }
              promptEvent.prompt();
              promptEvent.userChoice.then((result) => {
                console.log('👍', 'userChoice', result);
                deferredPrompt = null;
                x.classList.toggle('ion-hide', true);

              });

            }
          }> Install App</IonButton>
          <IonCard className='card-content-md total-cases'>
            <h2>Power Play</h2>
            <IonItem class=''>
              <IonCol>
                <IonBadge color='danger'>&#8377; {winningAmt}</IonBadge>
                <p>Winning Amount</p>
              </IonCol>
              <IonCol>
                <IonBadge >{matches}</IonBadge>
                <p>Matches Played</p>
              </IonCol>
              <IonCol>
                <IonBadge color='success'>{winningPercentage ? winningPercentage : 0} %</IonBadge>
                <p className=''>Winning Percentage</p>
              </IonCol>
            </IonItem>
            
          </IonCard>
          
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
