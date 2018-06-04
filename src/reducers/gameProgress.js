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

    let winnerId = 0;
    
    let listOfRanks = [];
    for (let i = 0; i<players.length; i++) {
        listOfRanks[i] = players[i].comboRank 
    }

    const maxRankFromList = listOfRanks.reduce((a, b) => Math.max(a, b));

    let newRanksFiltered = listOfRanks.filter(rank => rank === maxRankFromList)

    if (newRanksFiltered.length === 1) {
        const indexOfWinnerPlayer = listOfRanks.indexOf(maxRankFromList);
        winnerId = players[indexOfWinnerPlayer].id;
        alert(players[indexOfWinnerPlayer].playerName + ' won!')
    } else {

        let winCandidatesIndexes = [];
        for (let i = 0; i < listOfRanks.length; i++) {
            if (listOfRanks[i] === maxRankFromList){
                winCandidatesIndexes.push(i);
            }
        }
        let newPlayerList = [];
        for (let i = 0; i < winCandidatesIndexes.length; i++) {
            newPlayerList[i] = players[winCandidatesIndexes[i]] 
        }

        let strengthList = [];
        let allStrengths = [];

        for (let i = 0; i<newPlayerList.length; i++) {
            strengthList = newPlayerList[i].hand.map(card => card.strength);
            strengthList.sort((a, b) => b - a);
            allStrengths.push(strengthList);
        }

        let checkCounter = 0;

        const determineWinner = () => {
            if (checkCounter > 6) {
                alert('Stalemate')
                return;
            }
            let checkMaxStrengthInList = [];
            for (let i = 0; i<newPlayerList.length; i++) {
                checkMaxStrengthInList.push(allStrengths[i][checkCounter]);  
            }
            const maxStrengthFromList = checkMaxStrengthInList.reduce((a, b) => Math.max(a, b));
            let newStrengthsFiltered = checkMaxStrengthInList.filter(strength => strength === maxStrengthFromList)
            if (newStrengthsFiltered.length === 1) {
                const indexOfWinnerPlayer = checkMaxStrengthInList.indexOf(maxStrengthFromList);
                winnerId = newPlayerList[indexOfWinnerPlayer].id;
                alert(newPlayerList[indexOfWinnerPlayer].playerName + ' won with higher combo!')
            } else {
                checkCounter++;
                console.log(checkCounter)
                determineWinner();
            }
        }
        determineWinner();
    }

    return {
        ...state,
        enterAt: Object.assign({}, ...Object.keys(enterAt).map(key => ({
            [key]: false
        }))),
        players: players.map((player, index) => {
            player.comboRank = 0            
            if (index === winnerId) {
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

const checkFlush = (hand, forWhichPlayer, players) => {
    let jStart = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
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
    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
                if (hand[i].value === hand[j].value) {
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

const checkSetOrQuad = (hand) => {
    let jStart = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
                if (hand[i].value === hand[j].value) {
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
    players[forWhichPlayer].hand = JSON.parse(JSON.stringify(hand));

    let jStart = 0;

    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
                if (hand[i].value === hand[j].value) {
                    if (players[forWhichPlayer].comboRank < 2) {
                        players[forWhichPlayer].comboRank += 1;
                    }
                    applyStyles(i, j, hand, forWhichPlayer, players);
                }
            }
        }
        jStart++;
    }
    const setOrQuadResult = checkSetOrQuad(hand);
    const straightResult = checkStraight(hand, forWhichPlayer, players);
    const flushResult = checkFlush(hand, forWhichPlayer, players);
    const fullHouseResult = checkFullHouse(hand);

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