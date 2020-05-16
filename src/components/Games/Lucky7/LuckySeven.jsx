import React, { useState, useReducer, useEffect } from 'react'
import { IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import { toastController, alertController} from '@ionic/core'
import { getConfig, setConfig } from '../../Config'

let Dice;
let prevBetOption;
let audio = new Audio('https://retired.sounddogs.com/previews/101/mp3/117912_SOUNDDOGS__di.mp3');
const LuckySeven = () => {
  let { walletBal ,winningAmt, matches, winMatches } = getConfig();
  const [rolling, setRolling] = useState(false);
  const [rollingHistory, setRollingHistory] = useState([])
  const [betOption, setBetOption] = useState(null);
  const [bet, dispatch] = useReducer(betReducer, 10);

  useEffect(() => {
    const tabbar= document.querySelector("ion-tab-bar");
    tabbar.classList.toggle('ion-hide', true);
    return () => {
      tabbar.classList.toggle('ion-hide', false);
    }
  }, [])


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
    
    
  }

  const alertCall= (bool, betMutiplier)=> {
    if (bool) {
      alertController.create({
        header: 'Yipee You Won !',
        backdropDismiss: false,
        message: ` Win Rs. ${bet * betMutiplier}`,
        buttons: ['OK']
      }).then(t => t.present());

      // save values 
      winMatches = setConfig('winMatches', winMatches + 1);
      winningAmt = setConfig('winningAmt', winningAmt + (bet * betMutiplier));
      walletBal = setConfig('walletBal', walletBal + (bet * betMutiplier));
      
    } else {
      alertController.create({
        header: 'You Lose !',
        message: ` Loses Rs. ${bet }`,
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
        <IonButton size='small' shape='round' onClick={() => dispatch({type: '-'})}><strong>-</strong></IonButton>
          <span style={{ fontSize: '40px' }}>  &#8377; {bet} </span>
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
    </div>
  )
}





export default LuckySeven
