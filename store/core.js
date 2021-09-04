import {Dimensions} from "react-native";
import {themes} from "../components/themes";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

export function getWindow() {
    return {windowWidth, windowHeight};
}

function tempTheme(id) {
    switch (id) {
        case 1:
            return themes.PLAINS;
        case 2:
            return themes.MOUNTAIN;
        case 3:
            return themes.FOREST;
        case 4:
            return themes.ISLAND;
    }
}

function createPlayer(id) {
    return {
        id,
        life: 40,
        cmdDmg: {

        },
        theme: tempTheme(id)
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

function updateCmdDmg(state, player, cmdId, dmgFn) {
    return {
        ...state,
        players: state.players
            .reduce((result, p) => {
                if (p.id === player.id) {
                    return result.concat(
                        {
                            ...p,
                            cmdDmg: {
                                ...p.cmdDmg,
                                [cmdId]: dmgFn(p.cmdDmg[cmdId])
                            }
                        })
                }
                return result.concat(p);
            }, [])
    }
}

export function addCmdDmg(state, {player, cmdId}) {
    return updateCmdDmg(state, player, cmdId, (value) => value ? value + 1 : 1)
}

export function subtractCmdDmg(state, {player, cmdId}) {
    if (state.players.find((p) => p.id === player.id).cmdDmg[cmdId] > 0) {
        return updateCmdDmg(state, player, cmdId, subtractOne);
    }
    return state;
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
            {...player, life: 40, cmdDmg: 0}
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
