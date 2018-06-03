import { deck, shuffle } from './createDeck'
import { playerColorList } from './playerColorList'
export const flipCard = (state) => {

    const { enterAt, players } = state;

    console.log(state);

    if (!enterAt.deal) {
        const shuffledDeck = shuffle(deck);
        checkCombos(shuffledDeck, players);
        return {
            ...state,
            enterAt: {
                ...enterAt,
                deal: true
            },
            deck: shuffledDeck
        };
    } else if (enterAt.deal && !enterAt.flop) {
        return { ...state,
                enterAt: { ...enterAt,
                          flop: true
                         }
               };
    } else if (enterAt.flop && !enterAt.turn) {
        return { ...state,
                enterAt: { ...enterAt,
                          turn: true
                         }
               };
    } else if (enterAt.turn && !enterAt.river) {
        return {
            ...state,
            enterAt: {
                ...enterAt,
                river: true
            }
        };
    } else if (enterAt.river) {
        return checkWinner(state);
    }
};

const checkWinner = (state) => {

    const { pot, enterAt, players } = state;

    let maxRank = players[0].comboRank;
    let maxPlayer = players[0];
    let winner = players[0];
    let winnerIndex = 0;

    for (let i = 0; i < players.length; i++) {
        if (players[i].comboRank > maxRank) {
            maxRank = players[i].comboRank
            maxPlayer = players[i];
            winner = players[i];
            winnerIndex = i;
        } else if (players[i].comboRank === maxRank) {
            for (let x = 0; x < 7; x++) {
                for (let j = 0; j < 7; j++) {
                    if (players[i].hand[x].strength > maxPlayer.hand[j].strength) {
                        maxPlayer = players[i];
                        winner = players[i];
                        winnerIndex = i;
                    }
                }
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
            player.comboRank = 0            
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

const checkCombos = (deck, players) => {
    for (let i = 0; i < players.length; i++) {
        parseCards(i, deck, players);
    }
}

const checkStraight = (hand, forWhichPlayer, players) => {
    hand.sort((a, b) => a.strength - b.strength);
    let counter = 0;
    let itemCached = hand[0].strength;
    for (let i = 1; i < hand.length; i++) {
        if (hand[i].strength === itemCached + 1) {
            counter++;
        } else {
            counter = 0;
        }
        itemCached = hand[i].strength;
    }
    if (counter >= 4) {
        hand.slice(2, 8).map((card, index) => {
            if (card.playerColors.indexOf(playerColorList[forWhichPlayer]) === -1) {
                card.playerColors.push(playerColorList[forWhichPlayer])
            }
            players[forWhichPlayer].hand[index].strength = players[forWhichPlayer].hand[index].strength * 10;
            return card;
        });
        return 4;
    }
    return false;
};

const checkFlush = (i, j, hand, forWhichPlayer, players) => {
    if (hand[i].suit === hand[j].suit) {
        const matchingSuits = hand.filter(card => card.suit === hand[i].suit);
        if (matchingSuits.length >= 5) {
            matchingSuits.map((card, index) => {
                if (card.playerColors.indexOf(playerColorList[forWhichPlayer]) === -1) {
                    card.playerColors.push(playerColorList[forWhichPlayer])
                }
                if (card.playerColors.length >= 6) {
                    card.playerColors.push('purple');
                }
                players[forWhichPlayer].hand[index].strength = players[forWhichPlayer].hand[index].strength * 10;
                return card;
            });
            return 5;
        }
    }
    return false;
};

const checkFullHouse = (i, hand) => {
    let setCaught = false;
    let pairCaught = false;
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
    return false;
};

const checkSetOrQuad = (i, hand) => {
    const matchingCards = hand.filter(card => card.strength === hand[i].strength);
    if (matchingCards.length === 3) {
        return 3;
    }
    if (matchingCards.length === 4) {
        return 7;
    }
    return false;
};

const applyStyles = (i, j, hand, forWhichPlayer, players) => {
    players[forWhichPlayer].hand[i].strength = players[forWhichPlayer].hand[i].strength * 10;
    players[forWhichPlayer].hand[j].strength = players[forWhichPlayer].hand[j].strength * 10;
    if (i > 1) {
        if (hand[i].playerColors.indexOf('purple') === -1) {
            hand[i].playerColors.push('purple')
        }
        if (hand[j].playerColors.indexOf('purple') === -1) {
            hand[j].playerColors.push('purple')
        }
    } else {
        if (hand[i].playerColors.indexOf(playerColorList[forWhichPlayer]) === -1) {
            hand[i].playerColors.push(playerColorList[forWhichPlayer])
        }
        if (hand[j].playerColors.indexOf(playerColorList[forWhichPlayer]) === -1) {
            hand[j].playerColors.push(playerColorList[forWhichPlayer])
        }
    }
}

const parseCards = (forWhichPlayer, deck, players) => {
    let playerNumber = forWhichPlayer;
    if (forWhichPlayer !== 0) {
        playerNumber = playerNumber + playerNumber;
    }
    const indexOfTableCards = players.length * 2;
    const tableCards = deck.slice(indexOfTableCards, indexOfTableCards + 5);
    const dealtToPlayer = deck.slice(playerNumber, playerNumber + 2);
    const hand = dealtToPlayer.concat(tableCards);
    players[forWhichPlayer].hand = JSON.parse(JSON.stringify(hand))

    let setOrQuadResult;
    let flushResult
    let fullHouseResult;
    let jStart = 0;

    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
                flushResult = checkFlush(i, j, hand, forWhichPlayer, players);
                if (hand[i].value === hand[j].value) {
                    setOrQuadResult = checkSetOrQuad(i, hand);
                    fullHouseResult = checkFullHouse(i, hand);
                    applyStyles(i, j, hand, forWhichPlayer, players);
                    if (players[forWhichPlayer].comboRank < 2) {
                        players[forWhichPlayer].comboRank += 1;
                    }
                }
            }
        }
        jStart++;
    }
    const straightResult = checkStraight(hand, forWhichPlayer, players);

    if (setOrQuadResult) {
        players[forWhichPlayer].comboRank = setOrQuadResult;
    }
    if (straightResult) {
        players[forWhichPlayer].comboRank = straightResult;
    }
    if (flushResult) {
        players[forWhichPlayer].comboRank = flushResult;
    }
    if (fullHouseResult) {
        players[forWhichPlayer].comboRank = fullHouseResult;
    }
    if (straightResult && flushResult) {
        if (hand[6].strength % 14 === 0) {
            players[forWhichPlayer].comboRank = 9;
        } else {
            players[forWhichPlayer].comboRank = 8;
        }
    }
}