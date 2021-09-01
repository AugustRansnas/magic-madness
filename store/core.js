function createPlayer(id) {
    return {
        id,
        life: 40,
        theme: 'SWAMP'
    }
}
export function createInitialState() {
    return {
        isMenuOpen: false,
        selectedMenuItem: null,
        players: [
            createPlayer(1),
            createPlayer(2)
        ]
    }
}

export function setNumberOfPlayers(state, numOfPlayers) {
    return {
        ...state,
        players: Array.from({length: numOfPlayers}, (_, i) => i + 1)
            .map((id) => (
                createPlayer(id)
            ))
    }
}

export function getNumberOfPlayers(state) {
    return state.players.length
}

function addOne(value) {
    return value + 1;
}

function subtractOne(value) {
    return value - 1;
}

function updateLife(state, player, dmgFn) {
    return {
        ...state,
        players: state.players
            .reduce((result, p) => {
                if (p.id === player.id) {
                    return result.concat({...p, life: dmgFn(p.life)})
                }
                return result.concat(p);
            }, [])
    }
}

export function addDmg(state, player) {
    return updateLife(state, player, addOne)
}

export function subtractDmg(state, player) {
    return updateLife(state, player, subtractOne);
}

export function toggleMenu(state) {
    return {
        ...state,
        isMenuOpen: !state.isMenuOpen
    };
}

export function setMenuItem(state, data) {
    return {
        ...state,
        selectedMenuItem: data
    }
}

export function resetLife(state) {
    return {
        ...state,
        players: state.players.map((player) => (
            {...player, life: 40}
        ))
    }
}

export function getFirstPlayerHalf({players}) {
    const length = players.length;
    if (length === 4 || length === 3) {
        return players.slice(0, 2)
    }
    return players.slice(0, 1)
}

export function getSecondPlayerHalf({players}) {
    const length = players.length;
    if (length === 4) {
        return players.slice(-2)
    }
    return players.slice(-1)
}
