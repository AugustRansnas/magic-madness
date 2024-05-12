import React, { useState, useEffect, useCallback } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Exo_400Regular, useFonts } from "@expo-google-fonts/exo";
import { Asset } from "expo-asset";

import BackgroundShader from "./components/shaders/BackgroundShader";
import { StateProvider } from "./store/store";
import MainBoard from "./components/MainBoard";

SplashScreen.preventAutoHideAsync();

const cacheImages = images => {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
};

export default function App() {
    let [fontsLoaded] = useFonts({ Exo_400Regular });
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    useEffect(() => {
        const loadAssetsAsync = async () => {
            const imageAssets = cacheImages([
                require('./assets/test-menu-button.png'),
                require('./assets/test-menu-button-2.png'),
                require('./assets/test-menu-button-3.png'),
            ]);

            await Promise.all([...imageAssets, fontsLoaded]);
            setAssetsLoaded(true);
        };

        loadAssetsAsync();
    }, [fontsLoaded]);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded && assetsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, assetsLoaded]);

    if (!fontsLoaded || !assetsLoaded) {
        return null;  // Return nothing or a custom loading view until assets are ready
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
