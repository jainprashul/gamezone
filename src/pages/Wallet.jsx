import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonAvatar, IonIcon, IonCardContent, IonLabel, IonButton, IonModal, IonCardTitle, IonItem, IonInput, IonButtons, IonBackButton } from '@ionic/react';
import './Wallet.css';
import { personCircleOutline, play, close, settings, logoIonic } from 'ionicons/icons';
import { onBuyClicked } from '../components/Payments/GooglePay/gpay';
import { actionSheetController } from '@ionic/core';
import { alertController} from '@ionic/core'
import { getConfig, setConfig } from '../components/Config';
import withAuthorization from './Auth/withAuthorization';
const getTXNData = ()=> {
  const search = sessionStorage.getItem('txndetails');
  let data;
  if (search) {
    data = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
    console.log(data);
    return data;
  } else {
  }
  return false;
}

const Wallet = () => {
  const [model, setModel] = useState(false);
  let { walletBal } = getConfig();
  const [balance, setbalance] = useState(walletBal);
  useEffect(() => {
    const txn = getTXNData();
    if (txn && txn.STATUS === "TXN_SUCCESS") {
      alertController.create({
        header: 'Successfully Added.',
        message: `Rs. ${txn.TXNAMOUNT} has been added to wallet.`,
        buttons: ['OK']
      }).then(res => res.present());
      let newbal = (balance + parseFloat(txn.TXNAMOUNT));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      walletBal = setConfig('walletBal', newbal);
      setbalance(walletBal);
    }
    sessionStorage.removeItem('txndetails');
    

    return () => {
      setbalance(walletBal)
    }
  });
  
  const PaymentModel = () => (
    <IonModal isOpen={model}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Add Balance</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <form method='post' action='/api/paytm'>
            <IonItem>
              <IonLabel slot='start'>Amount</IonLabel>
              <IonInput required={true} name='amt' type='number'/>
            </IonItem>
            <input type='hidden' name='mobile' value='9406707245'/>
            <input type='hidden' name='email' value='jainprashul@gmail.com' />
            
            <IonButton type='submit'>Pay</IonButton>
            <IonButton type='button' onClick={()=>{setModel(false)}}>Cancel</IonButton>
          </form>
        </IonCardContent>
      </IonCard>
    </IonModal>
  )


  const paymentHandler = (amt) => {
    actionSheetController.create({
      id: 'paymentAction',
      buttons: [
        {
          icon: play,
          text: 'Pay via GOOGLE PAY',
          handler: () => {
            console.log('GOOGLE PAY SELECTED');
            onBuyClicked(amt);
          }
        },
        {
          icon: play,
          text: 'Pay via PAYTM',
          handler: () => {
            setModel(true);
            console.log('paYTM SELECTED');

          }
        },
        {
          icon: close,
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancelled clicked');
          }
        },
      ]
    }).then(res => res.present());
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton/>
          </IonButtons>
          <IonTitle>My Account</IonTitle>
          <IonButtons slot='end'>
            <IonButton shape='round' routerLink='/userProfile' >
              <IonIcon icon={settings}></IonIcon>
            </IonButton>
          </IonButtons>
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
            <h1><IonIcon size='small' color='warning' icon={logoIonic} />  {balance}</h1>
            <br/>
            <IonButton expand='full' onClick={()=>{paymentHandler(10)}}>Add Balance</IonButton>
          </IonCardContent>
        </IonCard>

        <PaymentModel />
        <script src="//servedby.eleavers.com/ads/ads.php?t=MjIyOTQ7MTMwMTg7aG9yaXpvbnRhbC5iYW5uZXI=&index=1"></script>
      </IonContent>
    </IonPage>
  );
};




export default withAuthorization(Wallet);
