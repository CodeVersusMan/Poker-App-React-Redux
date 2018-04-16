import React, {Component} from 'react';
import './App.css';
import Opener from './custom/opener.js';
import Output from './custom/output.js';
import Table from './custom/table.js'
import PlayerBottom from './custom/playerBottom.js'
import PlayerTop from './custom/playerTop.js'

class App extends Component {

    state = {
        pregame: true,
        deal: false,
        flop: false,
        turn: false,
        river: false,
        creatorResults: [],
        cardStyle: ['', '', '', '', '', '', '', '', '']
    };

interpret = (status) => {
    if (status) {
        return 'card'
    }  else {
        return 'invisible'
    }
};

cardCreator = () => {
    
    const suits = [
        'Diamonds',
        'Hearts',
        'Spades',
        'Clubs',
    ]
    const values = [
        'Two',
        /* ['Two',' of ','Spades'],
        ['Two',' of ','Hearts'],
        ['Two',' of ','Clubs'],
        ['Two',' of ','Diamonds'],*/
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
        'Jack',
        'Queen',
        'King',
        'Ace',
    ]
    const value = Math.floor((Math.random() * 13) + 1);
    const suit = Math.floor((Math.random() * 4) + 1);
    return [(values[value - 1]), ' of ', (suits[suit - 1])];
};

checkCombos = () => {

    if (this.state.creatorResults[0] !== undefined) {

        const newStyle = ['', '', '', '', '', '', '', '', ''];

        if (this.state.creatorResults[0][0] === this.state.creatorResults[1][0]) {
            newStyle[0] = 'card-matched';
            newStyle[1] = 'card-matched';
        }

        for (var j = 0; j<2; j++) {
            for (var i = 2; i<7; i++) {
                if (this.state.creatorResults[j][0] === this.state.creatorResults[i][0]) {
                    newStyle[j] = 'card-matched';
                    newStyle[i] = 'card-matched';
                } 
            } 
        }

        if (this.state.creatorResults[7][0] === this.state.creatorResults[8][0]) {
            newStyle[7] = 'card-matched';
            newStyle[8] = 'card-matched';
        }

        for (var j = 7; j<9; j++) {
            for (var i = 2; i<7; i++) {
                if (this.state.creatorResults[j][0] === this.state.creatorResults[i][0]) {
                    newStyle[j] = 'card-matched';
                    newStyle[i] = 'card-matched';
                } 
            } 
        }

        this.setState({cardStyle: newStyle});

    }

    if (this.state.pregame) {
        const removeStyle = ['', '', '', '', '', '', '', '', ''];
        this.setState({cardStyle: removeStyle});
    }

}

flipCard = () => {

    if (this.state.pregame) {
        this.setState({
            deal: true, pregame: false, 
            creatorResults: [this.cardCreator(), this.cardCreator(), this.cardCreator(), this.cardCreator(), this.cardCreator(), this.cardCreator(), this.cardCreator(), this.cardCreator(), this.cardCreator()] 
        });

    } 
    if (this.state.deal) {
        this.setState({flop: true});

    }  
    if (this.state.flop) {
        this.setState({turn: true});

    }  
    if (this.state.turn) {
        this.setState({river: true});

    }  
    if (this.state.river) {
        this.setState({
            pregame: true,
            deal: false,
            flop: false,
            turn: false,
            river: false});

    }
    this.checkCombos();
};

render(){

    {/* const values = [
        "why", "are ", "we", "still", "here"
    ]; */}

    return ( 
        <div className = "App">

        < PlayerTop interpret={this.interpret} passedState={this.state} />

        < Table interpret={this.interpret} flipCard={this.flipCard} passedState={this.state} />

        {/* <div className = "select-output-wrap">
                    < Output values={values} />
                    < Opener />
                </div> */}

        < PlayerBottom interpret={this.interpret} passedState={this.state} />

        </div>
    );
}
} 


export default App;