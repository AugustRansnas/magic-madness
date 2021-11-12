import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useStore} from "../store/store";
import actions from "../store/actions";
import ExoText from "./buildingblocks/ExoText";

function calculatePadding(isRotated) {
    return isRotated ? {
        paddingHorizontal: '7.5%',
        paddingVertical: '2.5%',
    } : {
        paddingHorizontal: '2.5%',
        paddingVertical: '7.5%',
    }
}

export default function CommanderDamage({player, isRotated}) {
    const {state, dispatch} = useStore();

    return (
        <View style={[styles.container, {...calculatePadding(isRotated)}]}>
            {state.players.map((p, index) => {
                    if (p.id !== player.id) {
                        return (
                            <View key={`${player.id}-${index}`} style={[styles.commanderBox, {backgroundColor: p.theme}]}>
                                <TouchableOpacity style={[styles.button]} onPress={() => dispatch({
                                    type: actions.ADD_COMMANDER_DAMAGE,
                                    data: {player, commanderId: p.id}
                                })}>
                                    <ExoText style={[styles.text]}>+</ExoText>
                                </TouchableOpacity>
                                <View style={[styles.counter]}>
                                    <ExoText style={[styles.text]}>{player.commanderDamage[p.id] || 0}</ExoText>
                                </View>
                                <TouchableOpacity style={[styles.button]} onPress={() => dispatch({
                                    type: actions.SUBTRACT_COMMANDER_DAMAGE,
                                    data: {player, commanderId: p.id}
                                })}>
                                    <ExoText style={[styles.text]}>-</ExoText>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                }
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    commanderBox: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counter: {
        position: 'absolute',
        zIndex: -1
    },
    button: {
        flex: 1,
        width: '100%',
        justifyContent: 'center'
    },
    text: {
        fontSize: 50,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});