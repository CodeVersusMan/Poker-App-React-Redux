const setInitState = (amountOfPlayers) => {
    let listOfPlayers = [];
    for (let i = 0; i < amountOfPlayers; i++) {
        listOfPlayers.push({
            id: i,
            playerName: 'Player ' + (i+1),
            playerChips: 1500,
            hand: [],
            comboRank: 0,
            fold: false
        })
    }
    return {
        enterAt: {
            deal: false, 
            flop: false, 
            turn: false, 
            river: false,
            endgame: false
        },
        deck: [],
        pot: 0,
        players: listOfPlayers,
        activePlayersThisRound: listOfPlayers,
        betAmountThisRound: 0,
        currentlyActingPlayer: null,
        popUp: {
            show: false, 
            payload: ''
        },
        summary: {
            show: false,
            winnerColor: null
        }
    }
}

export const initState = setInitState(6);