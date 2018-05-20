const setInitState = (amountOfPlayers) => {
    let listOfPlayers = [];
    for (let i = 0; i < amountOfPlayers; i++) {
        listOfPlayers.push({
            id: i,
            playerName: 'Player ' + (i+1),
            combo: 0,
            playerChips: 1500,
            comboTemp: {
                comboStrength: 0,
                comboRank: 0
            }
        })
    }
    return {
        enterAt: {
            deal: false, 
            flop: false, 
            turn: false, 
            river: false
        },
        deck: [],
        pot: 0,
        players: listOfPlayers
    }
}

export const initState = setInitState(6);