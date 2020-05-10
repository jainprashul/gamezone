import React from 'react'
import { IonList, IonItem, IonListHeader } from '@ionic/react'
import gamelist from './games.json'

const GameList = () => {
    return (
        <IonList>
            <IonListHeader>Games</IonListHeader>

            {
                gamelist.map((game , index) => (
                    <IonItem key={index} routerLink={game.route}>{game.name}</IonItem>
                ))
            }
        </IonList>
    )
}

export default GameList
