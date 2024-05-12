import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import * as core from "../../store/core";
import ExoText from "../buildingblocks/ExoText";

function DamageHitBox({onPress, text}) {
    return (
        <TouchableOpacity
            onPress={onPress}
             style={[styles.mainDmgOpacity]}>
            <ExoText style={[styles.mainDmgButtonText]}>{text}</ExoText>
        </TouchableOpacity>
    );
}

export default function Damage({
                                   isRotated,
                                   addDmg,
                                   subtractDmg,
                                   showRecentDmg,
                                   hitPoints
                               }) {
    const {windowWidth, windowHeight} = core.getWindow();
    const [recentDmg, setRecentDmg] = useState(null);

    const mounted = useRef(false);
    const timer = useRef(null);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    function doRecentDmg(fn) {
        clearTimeout(timer.current);
        fn();

        timer.current = setTimeout(function () {
            if (mounted.current) {
                setRecentDmg(null);
            }
        }, 1750);
    }

    const onAddPress = () => {
        addDmg();
        if (showRecentDmg) {
            doRecentDmg(() => setRecentDmg(recentDmg + 1));
        }
    };

    const onSubPress = () => {
        subtractDmg();
        if (showRecentDmg) {
            doRecentDmg(() => setRecentDmg(recentDmg - 1));
        }
    };

    const recentDmgPosition = isRotated ? (windowWidth / 14) : (windowHeight / 7);


    return (
        <View style={styles.dmgContainer}>
            {showRecentDmg && <View style={[styles.recentDmg, {top: recentDmgPosition}]}>
                <ExoText style={[styles.recentDmgText]}>{recentDmg}</ExoText>
            </View>}
            <DamageHitBox style={[styles.mainDmgOpacity]} onPress={onSubPress} text="-"/>
            <View style={[styles.lifeBox]}>
                <ExoText style={[styles.lifeText]}>{hitPoints}</ExoText>
            </View>
            <DamageHitBox onPress={onAddPress} text="+"/>
        </View>
    );
}

const styles = StyleSheet.create({
    dmgContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
    },
    recentDmg: {
        position: "absolute"
    },
    recentDmgText: {
        fontSize: 30
    },
    lifeBox: {
        position: "absolute",
        zIndex: -1
    },
    mainDmgOpacity: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    lifeText: {
        fontSize: 60,
    },
    mainDmgButtonText: {
        fontSize: 60
    }
});
