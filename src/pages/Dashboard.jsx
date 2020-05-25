import React, { useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCol, IonBadge, IonItem, IonButton, useIonViewDidEnter, IonButtons } from '@ionic/react';
import './Dashboard.css';
import { getConfig } from '../components/Config';
import ReactAudioPlayer from 'react-audio-player';
import { FirebaseContext } from '../context/FirebaseContext';
import withAuthorization from '../components/FireBase/Auth/withAuthorization';

let deferredPrompt;

const Dashboard = ({ history }) => {
  const { user, winningAmt, matches, winMatches } = getConfig();
  const winningPercentage = (winMatches / matches) * 100;
  const firebase = useContext(FirebaseContext);
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


  function signOut() {
    firebase.doSignOut().then(res => console.log("SignOUT done")
    ).catch(err => console.log(err)
    );
    // history.push('/')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          <IonButtons slot='end' >
            <IonButton onClick={signOut}>Sign Out</IonButton>
          </IonButtons>
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
            <h1 className='center'>Welcome {user && user.username}</h1>

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

          <ReactAudioPlayer
            src='https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/BoxCat_Games/Nameless_The_Hackers_RPG_Soundtrack/BoxCat_Games_-_16_-_Love_Of_My_Life.mp3'
            autoPlay
            loop
            volume={0.3}
          ></ReactAudioPlayer>

        </div>




      </IonContent>
    </IonPage>
  );
};

export default withAuthorization(Dashboard);
