export const checkWinner = state => {
    const { pot, enterAt, players } = state;
    let winnerId = 0;
    let indexOfWinnerPlayer;

    const listOfRanks = players.map(player => player.comboRank);
    const maxRankFromList = listOfRanks.reduce((a, b) => Math.max(a, b));
    const ranksFiltered = listOfRanks.filter(rank => rank === maxRankFromList);

    if (ranksFiltered.length === 1) {
        indexOfWinnerPlayer = listOfRanks.indexOf(maxRankFromList);
        winnerId = players[indexOfWinnerPlayer].id;
        alert(players[indexOfWinnerPlayer].playerName + ' won!')
    } else {
        const winCandidatesIndexes = listOfRanks.map((rank, index) => rank === maxRankFromList ? index : null).filter(item => item !== null);
        let newPlayerList = winCandidatesIndexes.map((item, index) => players[winCandidatesIndexes[index]]);
        let allStrengths = newPlayerList.map(player => player.hand.map(card => card.strength).sort((a, b) => b - a));
        let checkCounter = 0;
        const determineWinner = () => {
            if (checkCounter > 6) {
                alert('Stalemate')
                return;
            }
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
                alert(newPlayerList[indexOfWinnerPlayer].playerName + ' won with higher combo!')
            } else {
                checkCounter++;
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