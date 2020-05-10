import React, { useState } from 'react'
import { IonButton, IonGrid, IonRow, IonCol, IonSegment, IonSegmentButton } from '@ionic/react'
import {getRandomInt} from './gameLogic'


const LuckySeven = () => {

  const roll = () => {
    let x = getRandomInt(2, 12)
    setVal(x)
  }

  const bettingSet = (val) => {
    if ((bet <= 10) && (val < 0)) {
      
    } else {
      setBet(bet + val);
    }
  }


  const [val, setVal] = useState(0)
  const [bet, setBet] = useState(10);
  return (
    <div className='ion-text-center'>

      <h4>
        Select Option
      </h4>

      <IonSegment>
        <IonSegmentButton value='<7'>
          <h2>2 To 6</h2>
          <p>1.5 x amt</p>
          Jeeto &#8377;{bet * 1.5}
        </IonSegmentButton>
        <IonSegmentButton value='7'>
          <h2>7</h2>
          <p>2 x amt</p>
          <p>Jeeto &#8377;{bet * 2}</p>

        </IonSegmentButton>
        <IonSegmentButton value='>7'>
          <h2>8 To 12</h2>
          <p>1.5 x amt</p>
          Jeeto &#8377;{bet * 1.5}

        </IonSegmentButton>
      </IonSegment>

      <br/> <br/>
      <h5>Bet Lagao , Jeet K Jaao</h5>

      <p>
        <IonButton size='small' shape='round' onClick={()=> bettingSet(-10)}><strong>-</strong></IonButton>
        <span style={{ fontSize: '40px' }}>&#8377; {bet} </span>
        <IonButton size='small' shape='round' onClick={() => bettingSet(10)}><strong>+</strong></IonButton>
      </p>

      <IonButton size='large' shape='round' onClick={roll}>Roll</IonButton>
    </div>
  )
}





export default LuckySeven
