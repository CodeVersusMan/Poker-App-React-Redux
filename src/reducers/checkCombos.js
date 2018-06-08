import { playerColorList } from './playerColorList'
export const checkCombos = (deck, players) => {
    players.forEach((player, index) => parseCards(index, deck, players));
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

    checkMatchingCards(hand, forWhichPlayer, players);

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

const checkStraight = (hand, forWhichPlayer, players) => {
    const sortedHand = hand.map(card => card.strength).sort((a, b) => a - b);
    const startingElement = sortedHand.map((card, index) => {
        for (let i = 1; i<5; i++) {
            if (card + i !== sortedHand[index+i]) {
                return null;
            }
        }
        return index;
    }).filter(item => item !== null);
    if (startingElement[0] !== undefined) {
        players[forWhichPlayer].hand.map(card => card.strength > 14 ? card.strength = card.strength / 10 : card.strength);
        const x = startingElement[0];
        const straightValues = sortedHand.slice(x, x+5);
        straightValues.map(value => {
            players[forWhichPlayer].hand.map((card, index) => {
                if (card.strength === value) {
                    if (hand[index].playerColors.indexOf(playerColorList[forWhichPlayer]) === -1) {
                        hand[index].playerColors.push(playerColorList[forWhichPlayer])
                    }
                    card.strength = card.strength * 10;
                }
                return card;
            })
            return value;
        })
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
                        players[forWhichPlayer].hand.map(card => card.strength > 14 ? card.strength = card.strength / 10 : card.strength);
                        console.log(players[forWhichPlayer].hand);
                        matchingSuits.map((matchedCard, index) => {
                            if (matchedCard.playerColors.indexOf(playerColorList[forWhichPlayer]) === -1) {
                                matchedCard.playerColors.push(playerColorList[forWhichPlayer])
                            }
                            if (matchedCard.playerColors.length >= 6) {
                                matchedCard.playerColors = ['purple'];
                            }
                            players[forWhichPlayer].hand.map(card => {
                                if (card.id === matchedCard.id) {
                                    if (card.strength <= 14) {
                                        card.strength = card.strength * 10;
                                    }
                                }
                                return card;
                            })
                            return matchedCard;
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
    if (players[forWhichPlayer].hand[i].strength <= 14) {
        players[forWhichPlayer].hand[i].strength = players[forWhichPlayer].hand[i].strength * 10;
    }
    if (players[forWhichPlayer].hand[j].strength <= 14) {
        players[forWhichPlayer].hand[j].strength = players[forWhichPlayer].hand[j].strength * 10;
    }
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

const checkMatchingCards = (hand, forWhichPlayer, players) => {
    let jStart = 0;
    let matchingCards = [];
    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
                if (hand[i].value === hand[j].value) {
                    matchingCards.push(hand[i]);
                    if (players[forWhichPlayer].comboRank < 2) {
                        players[forWhichPlayer].comboRank += 1;
                    }
                    applyStyles(i, j, hand, forWhichPlayer, players);
                }
            }
        }
        jStart++;
    }

    if (matchingCards.length === 3) {
        const matchingStrengths =  matchingCards.map(card => card = card.strength);
        const weakestPairStrength = Math.min(...matchingStrengths);
        const weakestPair = players[forWhichPlayer].hand.filter((card) => card.strength === weakestPairStrength * 10);
        weakestPair.map(card => card.strength = card.strength / 10);
    }
};