import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {useStore} from "../store/store";

export default function Stats({isRotated, playerId}) {
    const {state} = useStore();
    const playerCmdDmg = state.players
        .find((p) => p.id === playerId).cmdDmg;
    const cmdDmg = state.players
        .filter(p => p.id !== playerId)
        .map(p => playerCmdDmg[p.id])
    return (
        <View style={[styles.stats, {
            top: isRotated ? 10 : 60,
            left: isRotated ? 30 : 40,
        }]}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.statText}>{cmdDmg[0]}</Text>
                <Text style={styles.statText}>{cmdDmg[1]}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.statText}>{cmdDmg[2]}</Text>
                <Text style={styles.statText}></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stats: {
        position: 'absolute',
        flexDirection: 'column',
    },
    statText: {
        marginHorizontal: 8,
        marginBottom: 2,
        fontSize: 20,
        fontWeight: 'bold'
    }
});
