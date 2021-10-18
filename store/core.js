import {Dimensions} from "react-native";
import {themes} from "../components/themes";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

const playerThemes = [
    themes.PLAINS,
    themes.MOUNTAIN,
    themes.FOREST,
    themes.ISLAND
]

export function getWindow() {
    return {windowWidth, windowHeight};
}

function getDefaultTheme(id) {
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
        commanderDamage: {

        },
        theme: getDefaultTheme(id)
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

export function isMenuOpen(state) {
    return state.isMenuOpen;
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

function updatePlayer(state, player, updateValue) {
    return {
        ...state,
        players: state.players
            .reduce((result, p) => {
                if (p.id === player.id) {
                    return result.concat({...p, ...updateValue})
                }
                return result.concat(p);
            }, [])
    }
}

function doDamage(player) {
    return {
        life: player.life + 1
    };
}

function healLife(player) {
    return {
        life: player.life - 1
    };
}

function getCommanderDamageForId(player, commanderId) {
    const commanderDamage = player.commanderDamage[commanderId];
    return commanderDamage ? commanderDamage : 0;
}

function doCommanderDamage(player, commanderId) {
    const commanderDamage = getCommanderDamageForId(player, commanderId);
    if (commanderDamage < 21) {
        return {
            commanderDamage: {
                ...player.commanderDamage,
                [commanderId]: commanderDamage + 1
            }
        }
    }
    return {}
}

function removeCommanderDamage(player, commanderId) {
    const commanderDamage = getCommanderDamageForId(player, commanderId);
    if (commanderDamage > 0) {
        return {
            commanderDamage: {
                ...player.commanderDamage,
                [commanderId]: commanderDamage - 1
            }
        }
    }
    return {};
}

export function addDamage(state, player) {
    return updatePlayer(state, player, doDamage(player));
}

export function subtractDamage(state, player) {
    return updatePlayer(state, player, healLife(player));
}

export function addCommanderDmg(state, {player, commanderId}) {
    return updatePlayer(state, player, doCommanderDamage(player, commanderId))
}

export function subtractCommanderDmg(state, {player, commanderId}) {
    return updatePlayer(state, player, removeCommanderDamage(player, commanderId))
}

export function getCommanderDamage(state, playerId) {
    return state.players.find((p) => p.id === playerId).commanderDamage;
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
            {...player, life: 40, commanderDamage: 0}
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

export function switchTheme(state, player) {
    const playerThemeIndex = playerThemes
        .indexOf(state.players.find((p) => p.id === player.id).theme);
    const shouldStartOver = playerThemeIndex === playerThemes.length - 1
    return updatePlayer(state, player, {
        theme: shouldStartOver ? playerThemes[0] : playerThemes[playerThemeIndex + 1]
    });
}
