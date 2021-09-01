import React, {useRef, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as core from "../store/core";

export default function Damage({
                                   player,
                                   isRotated,
                                   addDmg,
                                   subtractDmg,
                                   showRecentDmg
                               }) {
    const {windowWidth, windowHeight} = core.getWindow();
    const [recentDmg, setRecentDmg] = useState(null);

    const timer = useRef(null);

    function doRecentDmg(fn) {
        clearTimeout(timer.current);
        fn()

        timer.current = setTimeout(function () {
            setRecentDmg(null);
        }, 1750)
    }

    const onAddPress = () => {
        addDmg();
        if (showRecentDmg) {
            doRecentDmg(() => setRecentDmg(recentDmg + 1))
        }
    }

    const onSubPress = () => {
        subtractDmg();
        if (showRecentDmg) {
            doRecentDmg(() => setRecentDmg(recentDmg - 1))
        }
    }

    const mainDmgButtonPadding = isRotated ? 0 : 50;
    const lifeWidth = 100;
    const lifeWidthOffset = (lifeWidth / 2);
    const lifePositionLeft = isRotated ? (windowWidth / 4) - lifeWidthOffset : (windowWidth / 2) - lifeWidthOffset
    const recentDmgPosition = isRotated ? (windowWidth / 14) : (windowHeight / 7)

    return (
        <View style={styles.dmgContainer}>
            {showRecentDmg && <View style={[styles.recentDmg, {top: recentDmgPosition}]}>
                <Text style={styles.recentDmgText}>{recentDmg}</Text>
            </View>}
            <View style={styles.dmgInputContainer}>
                <TouchableOpacity style={[styles.mainDmgButton, {paddingLeft: mainDmgButtonPadding}]}
                                  onPress={onSubPress}>
                    <Text style={[styles.mainDmgButtonText, {textAlign: 'left'}]}>-</Text>
                </TouchableOpacity>
                <View style={[styles.lifeBox, {width: lifeWidth, left: lifePositionLeft}]}>
                    <Text style={[styles.lifeText, {fontSize: isRotated ? 50 : 60}]}>{player.life}</Text>
                </View>
                <TouchableOpacity style={[styles.mainDmgButton, {paddingRight: mainDmgButtonPadding}]}
                                  onPress={onAddPress}>
                    <Text style={[styles.mainDmgButtonText, {textAlign: 'right'}]}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dmgContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dmgInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentDmg: {
        position: 'absolute'
    },
    recentDmgText: {
        fontSize: 30
    },
    lifeBox: {
        position: 'absolute',
        zIndex: -1
    },
    mainDmgButton: {
        flex: 1,
    },
    lifeText: {
        textAlign: 'center',
        fontSize: 60,
        fontWeight: 'bold'
    },
    mainDmgButtonText: {
        fontSize: 60,
        fontWeight: 'bold'
    }
});
