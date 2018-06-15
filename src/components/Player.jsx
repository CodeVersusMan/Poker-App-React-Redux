import React from 'react';
import Card from './Card';
import { BetMenuContainer } from '../containers/BetMenuContainer';

const Player = ({ deck, enterAt, player, playerSeatPosition, currentlyActingPlayer }) => {
    let startDeal = playerSeatPosition;
    if (playerSeatPosition !== 0) startDeal += startDeal;
    const playerHand = deck.slice(startDeal, startDeal+2);

    let playerClassList = ['player'];
    if (currentlyActingPlayer === player.id) playerClassList.push('active-player');
    if (player.fold) playerClassList.push('folded');
    return (
        <div className={playerClassList.join(' ')}>
            {playerHand.map(card => <Card key={card.id} enterAt={enterAt.deal} fold={player.fold} {...card}/>)}
            < BetMenuContainer player={player} />
        </div> 
    );
}

export default Player;