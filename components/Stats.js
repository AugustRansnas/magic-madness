import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {useStore} from "../store/store";
import * as core from '../store/core';

export default function Stats({isRotated, playerId}) {
    const {state} = useStore();
    const commanderDamage = core.getCommanderDamage(state, playerId);
    return (
        <View style={[styles.stats, {
            top: isRotated ? 10 : 60,
            left: isRotated ? 30 : 40,
        }]}>
            <View style={{flexDirection: 'row'}}>
                {Object.values(commanderDamage)
                    .filter(v => v > 0)
                    .map((v, index) => {
                        return <Text key={index} style={styles.statText}>{v}</Text>
                    })}
            </View>
            <View style={{flexDirection: 'row'}}>
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
