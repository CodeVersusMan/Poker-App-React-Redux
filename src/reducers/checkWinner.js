export const checkWinner = state => {
    const { pot, enterAt, players } = state;
    let winnerId = 0;
    let indexOfWinnerPlayer;
    let stalemate = false;
    let newPlayerList;

    const listOfRanks = players.map(player => player.comboRank);
    const maxRankFromList = listOfRanks.reduce((a, b) => Math.max(a, b));
    const ranksFiltered = listOfRanks.filter(rank => rank === maxRankFromList);

    if (ranksFiltered.length === 1) {
        indexOfWinnerPlayer = listOfRanks.indexOf(maxRankFromList);
        winnerId = players[indexOfWinnerPlayer].id;
    } else {
        const winCandidatesIndexes = listOfRanks.map((rank, index) => rank === maxRankFromList ? index : null).filter(item => item !== null);
        newPlayerList = winCandidatesIndexes.map((item, index) => players[winCandidatesIndexes[index]]);
        let allStrengths = newPlayerList.map(player => player.hand.map(card => card.strength).sort((a, b) => b - a).splice(0, 5));
        let checkCounter = 0;
        const determineWinner = () => {
            if (checkCounter > 4) {
                stalemate = true;
                return false; 
            };
            const listOfTopStrengths = allStrengths.map(strength => strength[checkCounter]);
            const maxValue = listOfTopStrengths.reduce((a, b) => Math.max(a, b));
            const topStrengthsFiltered = listOfTopStrengths.filter(strength => strength === maxValue);
            allStrengths = allStrengths.filter(strength => strength[checkCounter] === maxValue);
            newPlayerList = newPlayerList.filter(player => {
                for (let j = 0; j<listOfTopStrengths.length; j++) {
                    for (let i = 0; i<player.hand.length; i++) {
                        if (player.hand[i].strength === listOfTopStrengths[j]) return true; 
                    }
                }
                return false;
            });
            if (topStrengthsFiltered.length === 1) {
                indexOfWinnerPlayer = listOfTopStrengths.indexOf(maxValue);
                winnerId = newPlayerList[indexOfWinnerPlayer].id;
            } else {
                checkCounter++;
                determineWinner();
            }
        }
        determineWinner();
    }
    if (stalemate) {
        return {
            ...state,
            summary: {
                show: true,
                winnerColor: winnerId
            },
            enterAt: {
                ...enterAt,
                endgame: true
            },
            /*enterAt: Object.assign({}, ...Object.keys(enterAt).map(key => ({
                [key]: false
            }))),*/
            players: players.map(player => {
                player.fold = false;
                player.comboRank = 0;
                for (let i = 0; i<newPlayerList.length; i++) {
                    if (player.id === newPlayerList[i].id) {
                        return {
                            ...player,
                            playerChips: player.playerChips + (pot / newPlayerList.length)
                        };
                    }
                }
                return player;
            }),
            pot: 0,
            betAmountThisRound: 0,
            popUp: {
                show: true,
                payload: 'Stalemate: ' + newPlayerList.map(newPlayer => newPlayer.playerName).join(', ')
            }
        };
    } else return {
        ...state,
        summary: {
            show: true,
            winnerColor: winnerId
        },
        enterAt: {
            ...enterAt,
            endgame: true
        },
       /* enterAt: Object.assign({}, ...Object.keys(enterAt).map(key => ({
            [key]: false
        }))),*/
        players: players.map((player, index) => {
            player.fold = false;
            player.comboRank = 0            
            if (index === winnerId) {
                return {
                    ...player,
                    playerChips: player.playerChips + pot
                };
            } else return player;
        }),
        pot: 0,
        betAmountThisRound: 0,
        popUp: {
            show: true,
            payload: `${players[winnerId].playerName} won`
        }
    };
};