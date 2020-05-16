import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonAvatar, IonIcon, IonCardContent, IonLabel, IonButton, IonActionSheet, useIonViewDidEnter, IonModal, IonCardTitle, IonItem, IonInput } from '@ionic/react';
import './Wallet.css';
import { personCircleOutline, play, close } from 'ionicons/icons';
import { onBuyClicked } from '../components/Payments/GooglePay/gpay';
import { actionSheetController } from '@ionic/core';
import { alertController} from '@ionic/core'
import { useLocalStorage } from '../components/Hooks';
const getTXNData = ()=> {
  const search = sessionStorage.getItem('txndetails');
  let data;
  if (search) {
    data = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
    console.log(data);
    return data;
  } else {
    console.log("Required Data Doesn't exist");
  }
  return false;
}

const Wallet = () => {
  const [model, setModel] = useState(false);
  const [walletBal, setWalletBal] = useLocalStorage('wbal', 0);
  useIonViewDidEnter(() => {
    const txn = getTXNData();
    if (txn && txn.STATUS === "TXN_SUCCESS") {
      alertController.create({
        header: 'Successfully Added.',
        message: `Rs. ${txn.TXNAMOUNT} has been added to wallet.`,
        buttons: ['OK']
      }).then(res => res.present());
      setWalletBal((walletBal + parseFloat(txn.TXNAMOUNT)));
    }
    sessionStorage.removeItem('txndetails');
  })

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
            <h1>&#8377; {walletBal}</h1>
            <br/>
            <IonButton expand='full' onClick={()=>{paymentHandler(10)}}>Add Balance</IonButton>
          </IonCardContent>
        </IonCard>

        <PaymentModel/>
      </IonContent>
    </IonPage>
  );
};




export default Wallet;
