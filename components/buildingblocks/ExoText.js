import React from "react";
import {Text} from "react-native";

export default function ExoText({children, style}) {
    return (
        <Text style={[style,
            {
                fontFamily: "Exo_400Regular",
                color: "white",
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10
            }
        ]}>
            {children}
        </Text>
    );
}