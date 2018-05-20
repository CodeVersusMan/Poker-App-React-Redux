import {initState} from './setInitState'

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'NEXT_TURN': return flipCard(state);
        case 'MAKE_BET': return handleBet(state, action);
        default: return state;
    }
};

export default reducer;

const handleBet = (state, action) => {
    const {amount, player} = action;
    const {pot, players} = state;
    const calculatedChips = player.playerChips - parseInt(amount, 10);

    if (calculatedChips < 0) {
        alert('ALL IN');
        return {
            ...state,
            pot: pot + player.playerChips,
            players: players.map((playerOld, index) => {
                if (playerOld.id === player.id) {
                    return {
                        ...playerOld,
                        playerChips: 0
                    };
                } else return playerOld;
            })
        };
    }
    return {
        ...state,
        pot: pot + parseInt(amount, 10),
        players: players.map((playerOld, index) => {
            if (playerOld.id === player.id) {
                return {
                    ...playerOld,
                    playerChips: calculatedChips
                };
            } else return playerOld;
        })
    };
};

const flipCard = (state) => {

    console.log(state)

    const {enterAt} = state;

    if (!enterAt.deal) {
        let deckTemp = createDeck();
        shuffle(deckTemp);
        checkCombos(deckTemp, state);
        return {
            ...state,
            enterAt: { ...enterAt, deal: true },
            deck: deckTemp
        };
    } else if (enterAt.deal && !enterAt.flop) {
        return {
            ...state,
            enterAt: { ...enterAt, flop: true }
        };
    } else if (enterAt.flop && !enterAt.turn) {
        return {
            ...state,
            enterAt: { ...enterAt, turn: true }
        };
    } else if (enterAt.turn && !enterAt.river) {
        return {
            ...state,
            enterAt: { ...enterAt, river: true }
        };
    } else if (enterAt.river) {
        return checkWinner(state);
    }
};

const checkWinner = (state) => {

    const {pot, enterAt, players} = state;

    let max = players[0].combo;
    let winner = players[0];
    let winnerIndex = 0;

    for (let i = 0; i<players.length; i++) {
        if (players[i].combo > max) {
            max = players[i].combo
            winner = players[i];
            winnerIndex = i;
        } 
    }

    alert(winner.playerName + ' won!')

    return {
        ...state,
        enterAt: Object.assign({}, ...Object.keys(enterAt).map(key => ({
            [key]: false
        }))),
        players: players.map((player, index) => {
            player.combo = 0;
            if (index === winnerIndex) {
                return {
                    ...player,
                    playerChips: player.playerChips + pot
                };
            } else return player;
        }),
        pot: 0
    };
};

const checkCombos = (deck, state) => {
    const {players} = state;
    for (let i = 0; i<players.length; i++) {
        parseCards(i, deck, state);
    } 
}

const parseCards = (forWhichPlayer, deck, state) => { 

    const playerColorsList = ['red', 'blue', 'green', 'pink', 'brown', 'orange'];

    const {players} = state;
    let jStart = 0;
    let playerNumber = forWhichPlayer;
    const indexOfTableCards = players.length * 2;
    let tableCards = deck.slice(indexOfTableCards, indexOfTableCards+5);

    if (forWhichPlayer !== 0) {
        playerNumber = playerNumber + playerNumber;
    }

    let slicePlayerHandFromDeck = deck.slice(playerNumber, playerNumber+2);
    slicePlayerHandFromDeck = slicePlayerHandFromDeck.concat(tableCards);

    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
                if (slicePlayerHandFromDeck[i].value === slicePlayerHandFromDeck[j].value) {
                    let lastIndexOfI = slicePlayerHandFromDeck[i].comboStatus.playerColors.length - 1;
                    let lastIndexOfJ = slicePlayerHandFromDeck[j].comboStatus.playerColors.length - 1;
                    let lastItemOfI = slicePlayerHandFromDeck[i].comboStatus.playerColors[lastIndexOfI];
                    let lastItemOfJ = slicePlayerHandFromDeck[j].comboStatus.playerColors[lastIndexOfJ];
                    if (i > 1) {
                        if (lastItemOfI !== 'purple') {
                            slicePlayerHandFromDeck[i].comboStatus.status = true;
                            slicePlayerHandFromDeck[i].comboStatus.playerColors.push('purple')
                        }
                        if (lastItemOfJ !== 'purple') {
                            slicePlayerHandFromDeck[j].comboStatus.status = true;
                            slicePlayerHandFromDeck[j].comboStatus.playerColors.push('purple')
                        }
                    } else {
                        slicePlayerHandFromDeck[i].comboStatus.status = true;
                        slicePlayerHandFromDeck[i].comboStatus.playerColors.push(playerColorsList[forWhichPlayer]) 

                        slicePlayerHandFromDeck[j].comboStatus.status = true;
                        slicePlayerHandFromDeck[j].comboStatus.playerColors.push(playerColorsList[forWhichPlayer])
                    }
                    players[forWhichPlayer].combo += slicePlayerHandFromDeck[i].strength + slicePlayerHandFromDeck[j].strength;
                }
            }
        }
        jStart++;
    }
}

const createDeck = () => {
    const Spade = '\u2660';
    const Diamond = '\u2666';
    const Heart = '\u2665';
    const Club = '\u2663';

    const suits = [
        Diamond, 
        Heart, 
        Spade,
        Club
    ]
    const values = [
        'Two',
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
        'Ace'
    ]
    const deckTemp = [];
    let deckIndex = 0;

    for (let i = 0; i<values.length; i++) {
        let SemanticStrength = i+2;
        for (let j = 0; j<suits.length; j++) {
            deckTemp[deckIndex] = {
                id: deckIndex,
                value: values[i],
                suit: suits[j],
                strength: SemanticStrength,
                comboStatus: {
                    status: false,
                    playerColors: []
                }
            }
            deckIndex++;
        }
    }
    return deckTemp;
}

const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}