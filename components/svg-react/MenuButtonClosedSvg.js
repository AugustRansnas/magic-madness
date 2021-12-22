import React from "react";
import Svg, {Circle, G, RadialGradient, Stop} from "react-native-svg";

export default function MenuButtonClosedSvg({ width, height }) {
    return (
        <Svg width={width} height={height} viewBox="0 0 127.54083 127.54083" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <RadialGradient id="radialGradient2781" cx="58.18457"
                cy="157.71573" fx="58.18457" fy="157.71573" r="63.770416" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(50.529172,-3.1888378)">
                <Stop stopColor="#ffcc00" stopOpacity="1" offset="0" id="stop2775" />
                <Stop stopColor="#d5aa00" stopOpacity="1" offset="0.37258127" id="stop2913" />
                <Stop stopColor="#a98800" stopOpacity="1" offset="0.70116514" id="stop2911" />
                <Stop stopColor="#7c6300" stopOpacity="1" offset="1" id="stop2777" />
            </RadialGradient>
            <G id="layer1" transform="translate(-43.820793,-91.69191)">
                <Circle
                    fill="url(#radialGradient2781)"
                    id="circle2263" cx="107.59121" cy="155.46233" r="63.770416" />
            </G>
        </Svg>
    );

}