import React from 'react';
import Card from './Card';
import { BetMenuContainer } from '../containers/BetMenuContainer';

const Player = ({ deck, enterAt, player, playerSeatPosition, currentlyActingPlayer }) => {
    let startDeal = playerSeatPosition;
    if (playerSeatPosition !== 0) {
        startDeal += startDeal;
    }
    const playerHand = deck.slice(startDeal, startDeal+2);
    return (
        <div className={currentlyActingPlayer === player.id ? "player active-player" : "player"}>
            {playerHand.map(card => <Card key={card.id} {...card} enterAt={enterAt.deal} />)}
            < BetMenuContainer player={player} />
        </div> 
    );
}

export default Player;