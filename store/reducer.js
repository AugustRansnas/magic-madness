import actions from './actions';
import * as core from "./core";

export default function reducer(state, action) {
    const {type, data} = action
    switch (type) {
        case actions.SET_NUMBER_OF_PLAYERS:
            return core.setNumberOfPlayers(state, data);
        case actions.ADD_DAMAGE:
            return core.addDamage(state, data);
        case actions.SUBTRACT_DAMAGE:
            return core.subtractDamage(state, data);
        case actions.ADD_COMMANDER_DAMAGE:
            return core.addCommanderDmg(state, data);
        case actions.SUBTRACT_COMMANDER_DAMAGE:
            return core.subtractCommanderDmg(state, data);
        case actions.TOGGLE_MENU:
            return core.toggleMenu(state);
        case actions.SET_MENU_ITEM:
            return core.setMenuItem(state, data);
        case actions.RESET_LIFE:
            return core.resetLife(state);
        default:
            throw new Error();
    }
}
