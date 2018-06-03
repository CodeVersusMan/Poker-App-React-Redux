import React from 'react';
import '../index.css';
import Table from './Table';
import Player from './Player';

const App = props => {
    const {players} = props;
    return <div className = "App">
       <div className="player-wrap">
           {players.map((player, index) => <Player id={index} key={player.id} player={player} playerSeatPosition={index} {...props}/>)}
       </div>
        < Table {...props} />
    </div>
} 
export default App;