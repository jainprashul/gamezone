import React, { useEffect, useContext } from 'react';
import {
  IonApp,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  useIonViewDidLeave
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { alertController } from '@ionic/core'
import { setConfig, getConfig } from './components/Config';
import { IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { gameController, menu, wallet } from 'ionicons/icons'
import { Route, Redirect } from 'react-router';
import Games from './pages/Games';
import Dashboard from './pages/Dashboard';
import GameBox from './components/GameBox';
import LuckySeven from './components/Games/Lucky7/LuckySeven';
import AccountRoute from './components/FireBase/Navigation/AccountRoute';
import Wallet from './pages/Wallet';
import { FirebaseContext } from './context/FirebaseContext';

const App = () => {
  const firebase = useContext(FirebaseContext);

  useIonViewDidLeave(() => {
    let usercurrent = firebase.getCurrentUserProfile()
    let uid = usercurrent && usercurrent.uid;
    console.log('forward to firebase');
    let { winningAmt, matches, winMatches, walletBal, firstTime } = getConfig();
    firebase.user(uid).update({
      stats: {
        walletBal, winningAmt, matches, winMatches, firstTime
      }
    }, (err) => console.log(err));
  })

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs >
          <IonRouterOutlet>
            <Route path="/gameList" component={Games} exact={true} />
            <Route path="/dashboard" component={Dashboard} exact={true} />
            <Route path="/wallet" component={Wallet} exact />
            <Route path="/game/lucky7" render={() => (<GameBox name='Lucky 7' component={LuckySeven} />)} />
            <Route path="/" render={() => <Redirect to="/dashboard" />} exact={true} />
            <AccountRoute />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/gameList">
              <IonIcon icon={gameController} />
              <IonLabel>Games</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/dashboard">
              <IonIcon icon={menu} />
              <IonLabel>Dashboard</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/wallet">
              <IonIcon icon={wallet} />
              <IonLabel>Wallet</IonLabel>
            </IonTabButton>
          </IonTabBar>

        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;


const useFirstTime = () => {

  useEffect(() => {
    let { firstTime } = getConfig()
    if (firstTime) {
      alertController.create({
        header: 'First Time Bonus!',
        subHeader: '100 coins given.',
        buttons: [{
          text: 'OK',
          handler: () => {
            setConfig('walletBal', 100);
            setConfig('firstTime', false);
          }
        }]
      }).then(res => res.present());
      console.log('coins given');

    }
  }, []);
}
