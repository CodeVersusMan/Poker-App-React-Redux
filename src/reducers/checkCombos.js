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

    const currentPlayer = {
        player: players[forWhichPlayer],
        playerHand: players[forWhichPlayer].hand,
        parsedHand: hand, 
        playerColors: playerColorList[forWhichPlayer],
    }

    checkMatchingCards(currentPlayer);

    const setOrQuadResult = loopThroughAllCards(currentPlayer, 'value', checkSetOrQuad);
    const straightResult = checkStraight(currentPlayer);
    const flushResult = loopThroughAllCards(currentPlayer, 'suit', checkFlush);
    const fullHouseResult = checkFullHouse(currentPlayer);

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
        if (hand[6].strength === 140) {
            players[forWhichPlayer].comboRank = 9;
        } else {
            players[forWhichPlayer].comboRank = 8;
        }
    }
}

const loopThroughAllCards = (currentPlayer, lookFor, typeOfCombo) => {
    const { parsedHand } = currentPlayer;
    let result;
    let jStart = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
                if (parsedHand[i][lookFor] === parsedHand[j][lookFor]) {
                    result = typeOfCombo(currentPlayer, i, j)
                    if (result) return result;
                }
            }
        }
        jStart++;
    }
    return false;
};

const checkMatchingCards = (currentPlayer) => {
    const { parsedHand, playerHand, player } = currentPlayer;
    let jStart = 0;
    let matchingCards = [];
    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
                if (parsedHand[i].value === parsedHand[j].value) {
                    matchingCards.push(parsedHand[i]);
                    if (player.comboRank < 2) player.comboRank += 1;
                    applyStyles(i, j, currentPlayer);
                }
            }
        }
        jStart++;
    }
    if (matchingCards.length === 3) preventThirdPair(matchingCards, playerHand);
};

const preventThirdPair = (matchingCards, playerHand) => {
    const matchingStrengths =  matchingCards.map(card => card = card.strength);
    const weakestPairStrength = Math.min(...matchingStrengths);
    const weakestPair = playerHand.filter(card => card.strength === weakestPairStrength * 10);
    weakestPair.map(card => card.strength = card.strength / 10);
}

const checkSetOrQuad = ({ parsedHand }, i) => {
    const matchingCards = parsedHand.filter(card => card.strength === parsedHand[i].strength);
    if (matchingCards.length === 3) return 3;
    if (matchingCards.length === 4) return 7;
};

const checkStraight = ({parsedHand, playerHand, playerColors}) => {
    const sortedHand = parsedHand.map(card => card.strength).sort((a, b) => a - b);
    const startingElement = sortedHand.map((card, index) => {
        for (let i = 1; i<5; i++) {
            if (card + i !== sortedHand[index+i]) return null;
        }
        return index;
    }).filter(item => item !== null);
    if (startingElement[0] !== undefined) {
        playerHand.map(card => card.strength > 14 ? card.strength = card.strength / 10 : card.strength);
        const x = startingElement[0];
        const straightValues = sortedHand.slice(x, x+5);
        straightValues.map(value => {
            playerHand.map((card, index) => {
                if (card.strength === value) {
                    if (parsedHand[index].playerColors.indexOf(playerColors) === -1) {
                        parsedHand[index].playerColors.push(playerColors)
                    }
                    card.strength = card.strength * 10;
                }
                return card;
            })
            return value;
        })
        return 4;
    }
};

const checkFlush = ({parsedHand, playerHand, playerColors}, i) => {
    const matchingSuits = parsedHand.filter(card => card.suit === parsedHand[i].suit);
    if (matchingSuits.length >= 5) {
        playerHand.map(card => card.strength > 14 ? card.strength = card.strength / 10 : card.strength);
        matchingSuits.map((matchedCard, index) => {
            if (matchedCard.playerColors.indexOf(playerColors) === -1) {
                matchedCard.playerColors.push(playerColors)
            }
            if (matchedCard.playerColors.length >= 6) {
                matchedCard.playerColors = ['purple'];
            }
            playerHand.map(card => {
                if (card.id === matchedCard.id) {
                    if (card.strength <= 14) card.strength = card.strength * 10;
                }
                return card;
            })
            return matchedCard;
        });
        return 5;
    }
};

const checkFullHouse = ({parsedHand}) => {
    let jStart = 0;
    let setCaught = false;
    let pairCaught = false;
    for (let i = 0; i < 7; i++) {
        for (let j = jStart; j < 7; j++) {
            if (i !== j) {
                if (parsedHand[i].value === parsedHand[j].value) {
                    const matchingCards = parsedHand.filter(card => card.strength === parsedHand[i].strength);
                    if (matchingCards.length === 3) setCaught = true;
                    if (matchingCards.length === 2) pairCaught = true;
                    if (setCaught && pairCaught) return 6;   
                }
            }
        }
        jStart++;
    }
    return false;
};

const applyStyles = (i, j, {parsedHand, playerHand, playerColors}) => {
    if (playerHand[i].strength <= 14) playerHand[i].strength = playerHand[i].strength * 10;
    if (playerHand[j].strength <= 14) playerHand[j].strength = playerHand[j].strength * 10;
    if (i > 1) {
        if (parsedHand[i].playerColors.indexOf('purple') === -1) parsedHand[i].playerColors.push('purple');
        if (parsedHand[j].playerColors.indexOf('purple') === -1) parsedHand[j].playerColors.push('purple');
    } else {
        if (parsedHand[i].playerColors.indexOf(playerColors) === -1) parsedHand[i].playerColors.push(playerColors);
        if (parsedHand[j].playerColors.indexOf(playerColors) === -1) parsedHand[j].playerColors.push(playerColors);
    }
}