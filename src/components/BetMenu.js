import React from 'react';
import BetMenuButton from './BetMenuButton.js'

const BetMenu = ({ makeBet, foldCards, makeCall, player, currentlyActingPlayer }) => {
    let input;
    const handleBet = () => {
        if (currentlyActingPlayer === player.id) {
            if (input.value !== '') makeBet(input.value, player)
        }
    };
    const handleCall = () => {
        if (currentlyActingPlayer === player.id) {
            makeCall(player)
        }
    };
    const handleFold = () => {
        if (currentlyActingPlayer === player.id) {
            foldCards(player)
        }
    };
    return <div className="bet-menu">
        <div className="bet-menu_block">
            <BetMenuButton handleClick={handleBet} task='BET' />
            <BetMenuButton handleClick={handleCall} task='CALL' />
            <BetMenuButton handleClick={handleFold} task='FOLD' />
        </div>
        <input ref={(node) => input = node} type='text'></input>
        <p>{player.playerName} chips: {player.playerChips}</p>
    </div>
} 
export default BetMenu;