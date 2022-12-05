import React, {useCallback} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Exo_400Regular, useFonts} from "@expo-google-fonts/exo";
import {StatusBar, StyleSheet, View} from "react-native";
import BackgroundShader from "./components/background/BackgroundShader";
import {StateProvider} from "./store/store";
import MainBoard from "./components/MainBoard";

SplashScreen.preventAutoHideAsync();

export default function App() {
    let [fontsLoaded] = useFonts({
        Exo_400Regular
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (

        <View style={styles.container} onLayout={onLayoutRootView}>
            <BackgroundShader/>
            <StateProvider>
                <MainBoard/>
                <StatusBar style="auto"/>
            </StateProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});



