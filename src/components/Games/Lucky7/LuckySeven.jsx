import React, { useState } from 'react'
import { IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import { toastController, alertController} from '@ionic/core'
import {getRandomInt} from './gameLogic'

let Dice;
const LuckySeven = () => {

  const [rolling, setRolling] = useState(false);
  const [rollingHistory, setRollingHistory] = useState([])
  const [betOption, setBetOption] = useState(null);
  const [val, setVal] = useState(0);
  const [bet, setBet] = useState(10);


  const roll = () => {
    if (betOption == null) {
      toastController.create({
        color: 'warning',
        duration: 1000,
        message: "Select Bet Option First",
        position: "top",

      }).then(res => res.present());
      return;
    }
    setRolling(true);
    // let x = getRandomInt(2, 12)
    // setVal(x);
    Dice.rollAll();

    setTimeout(() => {
      setRolling(false);
    }, 2000)
  }

  const rollDone = (num) => {
    setVal(num);
    setRollingHistory([...rollingHistory, num])
    checkBetting(num);
  }

  const alertCall= (bool, betMutiplier)=> {
    if (bool) {
      alertController.create({
        header: 'Yipee You Won !',
        backdropDismiss: false,
        message: ` Win Rs. ${bet * betMutiplier}`,
        buttons: ['OK']
      }).then(t => t.present());
    } else {
      alertController.create({
        header: 'You Lose !',
        message: ` Loses Rs. ${bet }`,
        buttons: ['OK']
      }).then(t => t.present());
    }
  }

  const checkBetting = (value) => {
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

  const bettingSet = (val) => {
    if ((bet <= 10) && (val < 0) && (bet>= 50)) {
    } else {
      setBet(bet + val);
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
          Jeeto &#8377;{bet * 1.5}
        </IonSegmentButton>
        <IonSegmentButton value='7'>
          <h2>7</h2>
          <p>2 x amt</p>
          <p>Jeeto &#8377;{bet * 2}</p>

        </IonSegmentButton>
        <IonSegmentButton value='greaterThan7'>
          <h2>8 To 12</h2>
          <p>1.5 x amt</p>
          Jeeto &#8377;{bet * 1.5}

        </IonSegmentButton>
      </IonSegment>

      <br/> <br/>
      <h5>Bet Lagao , Jeet K Jaao</h5>

      <p>
        <IonButton size='small' shape='round' onClick={()=> bettingSet(-10)}><strong>-</strong></IonButton>
          <span style={{ fontSize: '40px' }}>  &#8377; {bet} </span>
        <IonButton size='small' shape='round' onClick={() => bettingSet(10)}><strong>+</strong></IonButton>
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

    </div>
  )
}





export default LuckySeven
