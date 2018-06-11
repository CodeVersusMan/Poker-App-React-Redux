import React from 'react';
import '../index.css';
import Table from './Table';
import { PlayerContainer } from '../containers/PlayerContainer';

const App = props => {
    const {players} = props;
    return <div className = "App">
        <div className="player-wrap">
            {players.map(player => <PlayerContainer key={player.id} player={player} playerSeatPosition={player.id} {...props}/>)}
        </div>
        < Table {...props} />
    </div>
} 
export default App;