import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCol, IonBadge, IonItem, IonButton, useIonViewDidEnter } from '@ionic/react';
import './Dashboard.css';
import { getConfig } from '../components/Config';

let deferredPrompt;

const Dashboard = () => {
  const { username, winningAmt, matches, winMatches } = getConfig();
  // const [winningAmt, setWinningAmt] = useState(0)
  // const [matches, setMatches] = useState(0);
  // const [winMatches, setWinMatches] = useState(0);
  const winningPercentage = (winMatches / matches) * 100;
  useIonViewDidEnter(() => {

    // install pwa 
    const x = document.getElementById('installbtn');
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      x.classList.toggle('ion-hide', false);

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
          <IonButton expand='full' id='installbtn' className='ion-margin ion-hide'
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
          <div className="center">
            <h1 className='center'>Welcome {username}</h1>

          </div>
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
                <IonBadge color='success'>{winningPercentage ? (winningPercentage).toFixed(2) : 0} %</IonBadge>
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
