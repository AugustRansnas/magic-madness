import React, {useState} from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableHighlight} from "react-native";
import ExoText from "../../buildingblocks/ExoText";
import * as core from "../../../store/core";
import DamageHitBox from "../DamageHitBox";
import CommanderDamage from "./CommanderDamage";


export default function PlayerModal({player, playerHeight, playerWidth, rotation}) {
    const [playerModalVisible, setPlayerModalVisible] = useState(false);
    const isSideWays = rotation === 90 || rotation === -90;
    const modalHeight = isSideWays ? playerHeight * 2 - 20 : playerHeight - 20
    const modalWidth = isSideWays ? playerWidth : playerWidth - 20
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={playerModalVisible}
                onRequestClose={() => {
                    setPlayerModalVisible(!playerModalVisible);
                }}
            >
                <View style={[styles.centeredView, {
                    transform: [{
                        rotate: `${rotation}deg`,
                    }]
                }]}>
                    <View style={[styles.modalView, {height: modalHeight, width: modalWidth}]}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setPlayerModalVisible(!playerModalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                        <CommanderDamage player={player}/>
                    </View>
                </View>
            </Modal>

            <Pressable
                style={[styles.playerModalButton, {top: (playerHeight / 4) * 3 - 10}]}
                onPress={() => setPlayerModalVisible(true)}
            >
                <ExoText style={[{fontSize: 20}]}>Style me</ExoText>
            </Pressable>

        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        padding: 30,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    playerModalButton: {
        position: "absolute",
        alignSelf: "center",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#F194FF"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});