import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { wallet, gameController, menu } from 'ionicons/icons';
import Games from './pages/Games';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';

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
import LuckySeven from './components/Games/Lucky7/LuckySeven';
import GameBox from './components/GameBox';
import { alertController } from '@ionic/core'
import { setConfig, getConfig } from './components/Config';

const App: React.FC = () => {
  
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
  return(
    <IonApp>
      <IonReactRouter>

        <IonTabs >
          <IonRouterOutlet>
            <Route path="/gameList" component={Games} exact={true} />

            <Route path="/dashboard" component={Dashboard} exact={true} />
            <Route path="/wallet" component={Wallet} />
            <Route path="/game/lucky7" render={() => (<GameBox name='Lucky 7' component={LuckySeven} />)} />
            <Route path="/" render={() => <Redirect to="/dashboard" />} exact={true} />
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
