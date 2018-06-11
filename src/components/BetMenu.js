import React from 'react';
import BetMenuButton from './BetMenuButton.js'

const BetMenu = ({makeBet, player, currentlyActingPlayer}) => {
    let input;
    const handleClick = () => {
        if (currentlyActingPlayer === player.id) {
            if (input.value !== '') makeBet(input.value, player)
        }
    } 
    return <div className="bet-menu">
        <div className="bet-menu_block">
            <BetMenuButton handleClick={handleClick} task='BET' />
            <BetMenuButton task='CALL' />
            <BetMenuButton task='FOLD' />
        </div>
        <input ref={(node) => input = node} type='text'></input>
        <p>{player.playerName} chips: {player.playerChips}</p>
    </div>
} 
export default BetMenu;