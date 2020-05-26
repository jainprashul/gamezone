import React, { useState, useReducer, useContext } from 'react';
import { IonButton, IonSegment, IonSegmentButton, IonIcon, IonText } from '@ionic/react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';
import { toastController, alertController } from '@ionic/core';
import { getConfig, setConfig } from '../../Config';
import { FirebaseContext } from '../../../context/FirebaseContext';
import { logoIonic } from 'ionicons/icons';

let Dice;
let prevBetOption;
let audio = new Audio('https://retired.sounddogs.com/previews/101/mp3/117912_SOUNDDOGS__di.mp3');
const LuckySeven = ({ setBal }) => {
  let { walletBal ,winningAmt, matches, winMatches, firstTime } = getConfig();
  const [rolling, setRolling] = useState(false);
  const [rollingHistory, setRollingHistory] = useState([])
  const [betOption, setBetOption] = useState(null);
  const [bet, dispatch] = useReducer(betReducer, 10);
  const firebase = useContext(FirebaseContext);
  
  async function updateDataToFirebase() {
    let usercurrent = await firebase.getCurrentUserProfile()
    let uid = usercurrent && usercurrent.uid;
    await firebase.user(uid).update({
      stats: {
        walletBal, winningAmt, matches, winMatches, firstTime
      }
    }, err => console.log(err));
    console.log('firebase  upddate ');
  }



  function roll () {
    if (betOption == null) {
      toastController.create({
        color: 'warning',
        duration: 1000,
        message: "Select Bet Option First",
        position: "top",

      }).then(res => res.present());
      return;
    }

    

    if (bet > walletBal) {
      toastController.create({
        color: 'danger',
        duration: 1000,
        message: `Add amount to Play. Available Balance : ${walletBal}`,
        position: "bottom",

      }).then(res => res.present());
      return;
    }
    setRolling(true);
    // let x = getRandomInt(2, 12)
    Dice.rollAll();
    audio.play();

    setTimeout(() => {
      setRolling(false);
    }, 2000)
  }

  const rollDone = (num) => {

    // setVal(num);
    setRollingHistory([...rollingHistory, num])
    checkBetting(num);
    matches = setConfig('matches', matches + 1);
    setBal(walletBal);
    updateDataToFirebase();

  }

  const alertCall= (bool, betMutiplier)=> {
    if (bool) {
      alertController.create({
        header: 'Yipee You Won !',
        backdropDismiss: false,
        message: ` Win ${bet * betMutiplier} coins`,
        buttons: ['OK']
      }).then(t => t.present());

      // save values 
      winMatches = setConfig('winMatches', winMatches + 1);
      winningAmt = setConfig('winningAmt', winningAmt + (bet * betMutiplier));
      walletBal = setConfig('walletBal', walletBal + (bet * betMutiplier));
      
    } else {
      alertController.create({
        header: 'You Lose !',
        message: ` Loses ${bet } coins`,
        buttons: ['OK']
      }).then(t => t.present());
      walletBal = setConfig('walletBal', walletBal - bet);
    }
  }

  const checkBetting = (value) => {
    // setBetOption(null);
    switch (betOption) {
      case 'lessThan7':
        alertCall(value < 7, 1.5);
        break;
      case '7':
        alertCall(value === 7, 2);
        break;
      case 'greaterThan7':
        alertCall(value > 7, 1.5);
        break;
    
      default:
        toastController.create({
          color: 'warning',
          duration: 1000,
          message: "Select Betting Option First"
        })
        return false;
    }
  }

  function betReducer(state, action) {
    let minBet = 10;
    let maxBet = 100;
    let step = 10;

    // eslint-disable-next-line default-case
    switch (action.type) {
      case '+':
        if (state === maxBet) { return state }
        return state + step;
      case '-':
        if (state === minBet) { return state }
        return state - step;
      default:
        throw new Error();
      
    }
  }


  return (
    <div className='ion-text-center'>

      <h4>
        Select Option
      </h4>

      <IonSegment onIonChange={e => setBetOption(e.detail.value)}>
        <IonSegmentButton value='lessThan7'>
          <h2>2 To 6</h2>
          <p>1.5 x amt</p>
          <p>Jeeto <IonText color='warning'> <IonIcon size='small' color='warning' icon={logoIonic} /> {bet * 1.5} </IonText></p>
        </IonSegmentButton>
        <IonSegmentButton value='7'>
          <h2>7</h2>
          <p>2 x amt</p>
          <p>Jeeto <IonText color='warning'> <IonIcon size='small' color='warning' icon={logoIonic} /> {bet * 2} </IonText></p>

        </IonSegmentButton>
        <IonSegmentButton value='greaterThan7'>
          <h2>8 To 12</h2>
          <p>1.5 x amt</p>
          <p>Jeeto <IonText color='warning'> <IonIcon size='small' color='warning' icon={logoIonic} /> {bet * 1.5} </IonText></p>
        </IonSegmentButton>
      </IonSegment>

      <br/> <br/>
      <h5>Bet Lagao , Jeet K Jaao</h5>

      <p>
        <IonButton size='small' shape='round' onClick={() => dispatch({type: '-'})}><strong>-</strong></IonButton>
          <IonText color='warning' style={{ fontSize: '40px' }}>  <IonIcon color='warning' icon={logoIonic}/> {bet} </IonText>
        <IonButton size='small' shape='round' onClick={() => dispatch({type: '+'})}><strong>+</strong></IonButton>
      </p>

      

      <ReactDice
        numDice={2}
        rollDone={rollDone}
        disableIndividual={true}
        faceColor={'#e1e1e1'}
        dotColor={'#0e0e0e'}
        ref={(dice) => Dice = dice}
      />
      <IonButton disabled={rolling} size='large' shape='round' onClick={roll}>Roll</IonButton>

      <p>
        {rollingHistory.map((val , i) => (
          <span key={i}>{val} </span>
        ))}
      </p>

      <script src="//servedby.eleavers.com/ads/ads.php?t=MjIyOTQ7MTMwMTg7aG9yaXpvbnRhbC5iYW5uZXI=&index=1"></script>
    </div>
  )
}





export default LuckySeven
