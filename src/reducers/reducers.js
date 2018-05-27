import { initState } from './setInitState'
import { deck } from './createDeck'
import { shuffle } from './createDeck'
import { playerColorList } from './playerColorList'

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'NEXT_TURN':
            return flipCard(state);
        case 'MAKE_BET':
            return handleBet(state, action);
        default:
            return state;
    }
};

export default reducer;

const handleBet = (state, action) => {
    const { amount, player } = action;
    const { pot, players } = state;
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

    const { enterAt } = state;

    console.log(state);

    if (!enterAt.deal) {
        const shuffledDeck = shuffle(deck);
        checkCombos(shuffledDeck, state);
        return {
            ...state,
            enterAt: { ...enterAt,
                      deal: true
                     },
            deck: shuffledDeck
        };
    } else if (enterAt.deal && !enterAt.flop) {
        return {
            ...state,
            enterAt: { ...enterAt,
                      flop: true
                     }
        };
    } else if (enterAt.flop && !enterAt.turn) {
        return {
            ...state,
            enterAt: { ...enterAt,
                      turn: true
                     }
        };
    } else if (enterAt.turn && !enterAt.river) {
        return {
            ...state,
            enterAt: { ...enterAt,
                      river: true
                     }
        };
    } else if (enterAt.river) {
        return checkWinner(state);
    }
};

const checkWinner = (state) => {

    const {
        pot,
        enterAt,
        players
    } = state;

    let maxRank = players[0].combo.comboRank;
    let maxStrength = players[0].combo.comboStrength;
    let winner = players[0];
    let winnerIndex = 0;

    for (let i = 0; i < players.length; i++) {
        if (players[i].combo.comboRank > maxRank) {
            maxRank = players[i].combo.comboRank
            winner = players[i];
            winnerIndex = i;
        } else if (players[i].combo.comboRank === maxRank) {
            if (players[i].combo.comboStrength > maxStrength) {
                maxStrength = players[i].combo.comboStrength
                winner = players[i];
                winnerIndex = i;
            }
        }
    }

    alert(winner.playerName + ' won!')

    return {
        ...state,
        enterAt: Object.assign({}, ...Object.keys(enterAt).map(key => ({
            [key]: false
        }))),
        players: players.map((player, index) => {
            player.combo = {
                comboStrength: 0,
                comboRank: 0
            };
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
    for (let i = 0; i < players.length; i++) {
        parseCards(i, deck, state);
    }
}

const checkHighestCard = (hand) => {
    let max = hand[0].strength;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].strength > max) {
            max = hand[i].strength
        }
    }
    return max;
}

const searchForUniqueCardsWithCombo = (hand) => {
    let onlyComboCards = hand.filter(card => card.comboStatus.status === true);
    let jStart = 0;
    const ownComboCards = [];
    for (let i = 0; i<onlyComboCards.length; i++) {
        for (let j = jStart; j<onlyComboCards.length; j++){
            if (i!==j) {
                if (onlyComboCards[i].value === onlyComboCards[j].value) {
                    ownComboCards.push(onlyComboCards[i])
                    /* Searches for non-unique
                    ownComboCards.push(onlyComboCards[j])
                    */
                }
            }
        }
        jStart++;
    }
    return ownComboCards;
}
const checkStraight = (hand, forWhichPlayer) => {

    hand.sort((a,b) => a.strength - b.strength);

    let counter = 0;
    let itemCached = hand[0].strength;

    for (let i = 1; i<hand.length; i++) {
        if (hand[i].strength === itemCached + 1) {
            counter++;
        } else {
            counter = 0;
        }
        itemCached = hand[i].strength;
    }
    if (counter >= 4) {
        hand.slice(2,8).map(card => {
            if (card.comboStatus.playerColors.indexOf(playerColorList[forWhichPlayer]) === -1) {
                card.comboStatus.playerColors.push(playerColorList[forWhichPlayer])
            }
            return card.comboStatus.status = true;
        });
        return 4;
    }
    return false;
};

const checkFlush = (hand, forWhichPlayer) => {
    let jStart = 0;
    for (let i = 0; i<hand.length; i++) {
        for (let j = jStart; j<hand.length; j++){
            if (i!==j) {
                if (hand[i].suitVal === hand[j].suitVal) {
                    const matchingSuits = hand.filter(card => card.suitVal === hand[i].suitVal);
                    if (matchingSuits.length >= 5) {
                        matchingSuits.map(card => {
                            if (card.comboStatus.playerColors.indexOf(playerColorList[forWhichPlayer]) === -1) {
                                card.comboStatus.playerColors.push(playerColorList[forWhichPlayer])
                            }
                            if (card.comboStatus.playerColors.length === 6) {
                                card.comboStatus.playerColors.push('purple');
                            }
                            return card.comboStatus.status === true;
                        });
                        return 5;
                    }
                }
            }
        }
        jStart++;
    }
    return false;
};

const checkFullHouse = (hand) => {
    let jStart = 0;
    let setCaught = false;
    let pairCaught = false;
    for (let i = 0; i<hand.length; i++) {
        for (let j = jStart; j<hand.length; j++){
            if (i!==j) {
                if (hand[i].strength === hand[j].strength) {
                    const matchingCards = hand.filter(card => card.strength === hand[i].strength);
                    if (matchingCards.length === 3) {
                        setCaught = true;
                    }
                    if (matchingCards.length === 2) {
                        pairCaught = true;
                    }
                    if (setCaught && pairCaught) {
                        return 6;
                    }
                }
            }
        }
        jStart++;
    }
    return false;
};

const checkSetOrQuad = (hand, forWhichPlayer) => {
    let jStart = 0;
    for (let i = 0; i<hand.length; i++) {
        for (let j = jStart; j<hand.length; j++){
            if (i!==j) {
                if (hand[i].strength === hand[j].strength) {
                    const matchingCards = hand.filter(card => card.strength === hand[i].strength);
                    if (matchingCards.length === 3) {
                        return 3;
                    }
                    if (matchingCards.length === 4) {
                        return 7;
                    }
                }
            }
        }
        jStart++;
    }
    return false;
};

const parseCards = (forWhichPlayer, deck, state) => {
    const { players } = state;
    let playerNumber = forWhichPlayer;
    if (forWhichPlayer !== 0) {
        playerNumber = playerNumber + playerNumber;
    }
    const indexOfTableCards = players.length * 2;
    const tableCards = deck.slice(indexOfTableCards, indexOfTableCards + 5);
    const dealtToPlayer = deck.slice(playerNumber, playerNumber + 2);
    const hand = dealtToPlayer.concat(tableCards);

    let setCandidate;
    let setSuccess = [];
    let jStart = 0;

    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
                if (players[forWhichPlayer].combo.comboRank === 0) {
                    players[forWhichPlayer].combo.comboStrength = checkHighestCard(hand);
                }
                if (hand[i].value === hand[j].value) {

                    setCandidate = hand[i].value;
                    setSuccess = setSuccess.concat(hand.filter(item => item.value === setCandidate));

                    const handShortOfI = hand[i].comboStatus.playerColors;
                    const handShortOfJ = hand[j].comboStatus.playerColors;

                    if (i > 1) {
                        if (handShortOfI.indexOf('purple') === -1) {
                            hand[i].comboStatus.status = true;
                            handShortOfI.push('purple')
                        }
                        if (handShortOfJ.indexOf('purple') === -1) {
                            hand[j].comboStatus.status = true;
                            handShortOfJ.push('purple')
                        }
                    } else {
                        hand[i].comboStatus.status = true;
                        if (handShortOfI.indexOf(playerColorList[forWhichPlayer]) === -1) {
                            handShortOfI.push(playerColorList[forWhichPlayer])
                        }

                        hand[j].comboStatus.status = true;
                        if (handShortOfJ.indexOf(playerColorList[forWhichPlayer]) === -1) {
                            handShortOfJ.push(playerColorList[forWhichPlayer])
                        }
                    }
                    if (players[forWhichPlayer].combo.comboRank < 2) {
                        players[forWhichPlayer].combo.comboRank += 1;
                    }
                    players[forWhichPlayer].combo.comboStrength = checkHighestCard(searchForUniqueCardsWithCombo(hand));
                }
            }
        }
        jStart++;
    }

    const setOrQuadResult = checkSetOrQuad(hand, forWhichPlayer);
    const straightResult = checkStraight(hand, forWhichPlayer);
    const flushResult = checkFlush(hand, forWhichPlayer);
    const fullHouseResult = checkFullHouse(hand);

    if (setOrQuadResult) {
        players[forWhichPlayer].combo.comboRank = setOrQuadResult;
    }
    if (straightResult) {
        players[forWhichPlayer].combo.comboRank = straightResult;
    }
    if (flushResult) {
        players[forWhichPlayer].combo.comboRank = flushResult;
    }
    if (fullHouseResult) {
        players[forWhichPlayer].combo.comboRank = fullHouseResult;
    }
    if (straightResult && flushResult) {
        if (hand[6].strength === 14) {
            players[forWhichPlayer].combo.comboRank = 9;
        } else {
            players[forWhichPlayer].combo.comboRank = 8;
        }
    }
}