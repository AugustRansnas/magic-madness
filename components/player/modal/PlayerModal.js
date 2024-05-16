import React, {useState} from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableWithoutFeedback,
} from "react-native";
import ExoText from "../../buildingblocks/ExoText";
import * as core from "../../../store/core";
import DamageHitBox from "../DamageHitBox";
import CommanderDamage from "./CommanderDamage";

export default function PlayerModal({player, playerHeight, playerWidth, rotation}) {
    const [playerModalVisible, setPlayerModalVisible] = useState(false);
    const {windowWidth, windowHeight} = core.getWindow();
    const isSideWays = rotation === 90 || rotation === -90;
    const modalHeight = isSideWays ? windowWidth - 20 : windowHeight - 300;
    const modalWidth = isSideWays ? windowHeight - 300 : windowWidth - 20;

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
                <TouchableWithoutFeedback onPress={() => setPlayerModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback onPress={() => {
                        }}>
                            <View style={[styles.modalView, {
                                transform: [{
                                    rotate: `${rotation}deg`
                                }],
                                height: modalHeight, width: modalWidth
                            }]}>
                                <CommanderDamage player={player}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Pressable
                style={[styles.playerModalButton, {top: (playerHeight / 2) - 40}]}
                onPress={() => setPlayerModalVisible(true)}
            >
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)"  // Semi-transparent background
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
        padding: 40,
        elevation: 2,
        backgroundColor: "rgba(255, 255, 255, 0)"
        //backgroundColor: "black"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
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
