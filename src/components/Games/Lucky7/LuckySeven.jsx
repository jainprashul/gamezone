import React, { useState } from 'react'
import { IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import {getRandomInt} from './gameLogic'

let Dice;
const LuckySeven = () => {

  const [rolling, setRolling] = useState(false);
  const [rollingHistory, setRollingHistory] = useState([])
  const [val, setVal] = useState(0);
  const [bet, setBet] = useState(10);


  const roll = () => {
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
    setRollingHistory([...rollingHistory , num])

  }


  const bettingSet = (val) => {
    if ((bet <= 10) && (val < 0)) {

    } else {
      setBet(bet + val);
    }
  }
  return (
    <div className='ion-text-center'>

      <h4>
        Select Option
      </h4>

      <IonSegment onIonChange={e => console.log(e)
      }>
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
