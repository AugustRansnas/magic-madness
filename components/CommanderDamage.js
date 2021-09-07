import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useStore} from "../store/store";
import actions from "../store/actions";

export default function CommanderDamage({player}) {
    const {state, dispatch} = useStore();

    return (
        <View style={styles.container}>
            {state.players.map((p, index) => {
                    if (p.id !== player.id) {
                        return (
                            <View key={`${player.id}-${index}`} style={[styles.commanderBox, {backgroundColor: p.theme}]}>
                                <TouchableOpacity style={[styles.button]} onPress={() => dispatch({
                                    type: actions.ADD_COMMANDER_DAMAGE,
                                    data: {player, commanderId: p.id}
                                })}>
                                    <Text style={[styles.text]}>+</Text>
                                </TouchableOpacity>
                                <View style={[styles.counter]}>
                                    <Text style={[styles.text]}>{player.commanderDamage[p.id] || 0}</Text>
                                </View>
                                <TouchableOpacity style={[styles.button]} onPress={() => dispatch({
                                    type: actions.SUBTRACT_COMMANDER_DAMAGE,
                                    data: {player, commanderId: p.id}
                                })}>
                                    <Text style={[styles.text]}>-</Text>
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
        backgroundColor: 'white'
    },
    commanderBox: {
        flex: 1,
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
        justifyContent: 'center',
    },
    text: {
        fontSize: 50,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});