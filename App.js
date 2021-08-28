import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { StateProvider } from './store/store';
import MainBoard from "./components/MainBoard";

export default function App() {
    return (
        <StateProvider>
            <MainBoard/>
            <StatusBar style="auto"/>
        </StateProvider>
    )
}

