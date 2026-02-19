import {Vector3} from "three";
import React, {Suspense, useRef} from "react";
import {Canvas, extend, useFrame, useThree} from "@react-three/fiber/native";
import {shaderMaterial} from "@react-three/drei/native";
import {StyleSheet, View} from "react-native";
import * as core from "../../store/core";
import {useStore} from "../../store/store";

const TheShader = shaderMaterial(
    // Uniforms
    {
        uTime: 0.,
        uResolution: new Vector3(),
        uNumPlayers: 2, // Default to 2 players
        uColors: [
            new Vector3(0.83, 0.13, 0.16),  // 0 Mountain (red)
            new Vector3(0.05, 0.41, 0.67),  // 1: Island (blue)
            new Vector3(0.08, 0.04, 0.00),  // 2: Swamp (black)
            new Vector3(0.00, 0.45, 0.24),  // 3: Forest (green)
            new Vector3(0.97, 0.91, 0.73),  // 4: Plains (white)
            new Vector3(0.51, 0.23, 0.49)   // 5: Purple
        ]
    },
    // Vertex Shader
    `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
  `,
    // Fragment Shader
    `
    #define TAU 6.28318530718
    #define TILING_FACTOR 1.0
    #define MAX_ITER 5

    uniform vec3 uResolution;
    uniform float uTime;
    uniform int uNumPlayers;
    uniform vec3 uColors[6];

    float waterHighlight(vec2 p, float time, float foaminess) {
        vec2 i = vec2(p);
        float c = 0.0;
        float foaminess_factor = mix(1.0, 6.0, foaminess);
        float inten = .005 * foaminess_factor;

        for (int n = 0; n < MAX_ITER; n++) {
            float t = time * (1.0 - (3.5 / float(n+1)));
            i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
            c += 1.0 / length(vec2(p.x / (sin(i.x+t)), p.y / (cos(i.y+t))));
        }
        c = 0.2 + c / (inten * float(MAX_ITER));
        c = 1.17 - pow(c, 1.4);
        c = pow(abs(c), 8.0);
        return c / sqrt(foaminess_factor);
    }
    
    vec3 getSegmentColor(vec2 uv) {
        vec3 color = vec3(0.0);
        vec3 blue = uColors[0];
        vec3 red = uColors[1];
        vec3 green = uColors[2];
        vec3 black = uColors[3];
        float verticalMixFactor = smoothstep(0.40, 0.60, uv.y);
        float horizontalMixFactor = smoothstep(0.40, 0.60, uv.x);

        if (uNumPlayers == 2) {
            color = mix(uColors[1], uColors[0], verticalMixFactor);
        } else if (uNumPlayers == 3) {
            vec3 bottom = uColors[2];
            vec3 topMix = mix(uColors[0], uColors[1], horizontalMixFactor);
            color = mix(bottom, topMix, verticalMixFactor);
        } else if (uNumPlayers == 4) {
            vec3 bottomMix = mix(uColors[2], uColors[3], horizontalMixFactor);
            vec3 topMix = mix(uColors[0], uColors[1], horizontalMixFactor);
            color = mix(bottomMix, topMix, verticalMixFactor);
        } else if (uNumPlayers == 5) {
            // 5p: top pair (P1,P2) | middle pair (P3,P4) | bottom full (P5)
            float row1 = smoothstep(0.60, 0.70, uv.y);
            float row2 = smoothstep(0.25, 0.35, uv.y);
            vec3 topMix = mix(uColors[0], uColors[1], horizontalMixFactor);
            vec3 midMix = mix(uColors[2], uColors[3], horizontalMixFactor);
            color = mix(uColors[4], midMix, row2);
            color = mix(color, topMix, row1);
        } else if (uNumPlayers == 6) {
            // 6p: top full (P1) | pair (P2,P3) | pair (P4,P5) | bottom full (P6)
            float row1 = smoothstep(0.72, 0.82, uv.y);
            float row2 = smoothstep(0.45, 0.55, uv.y);
            float row3 = smoothstep(0.18, 0.28, uv.y);
            vec3 pair1 = mix(uColors[1], uColors[2], horizontalMixFactor);
            vec3 pair2 = mix(uColors[3], uColors[4], horizontalMixFactor);
            color = mix(uColors[5], pair2, row3);
            color = mix(color, pair1, row2);
            color = mix(color, uColors[0], row1);
        }

        return color;
    }
    
    void main() {
        float time = uTime * 0.1 + 23.0;
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 uv_square = vec2(uv.x * uResolution.x / uResolution.y, uv.y);
        float dist_center = pow(2.0 * length(uv - 0.5), 2.0);
        float foaminess = smoothstep(0.4, 4.8, dist_center);
        float clearness = 1.0;
        
        vec2 p = mod(uv_square * TAU * TILING_FACTOR, TAU) - 250.0;
        float c = waterHighlight(p, time, foaminess);
    
        //vec3 water_color = vec3(0.0, 0.35, 0.5);
        vec3 color = vec3(c);
        //color = clamp(color + water_color, 0.0, 1.0);
        //color = mix(water_color, color, clearness);

        // Blend the segment color with the water effect
        vec3 segmentColor = getSegmentColor(uv);
       color = mix(segmentColor, color, 0.5);
        
        gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({TheShader});

function Mesh({numPlayers}) {
    const mesh = useRef();
    useFrame(({clock}) => {
        mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
    });
    const {size} = useThree();
    const {pixelWidth, pixelHeight} = core.getPixelWindow();

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[size.width, size.height]}/>
            <theShader uResolution={[pixelWidth, pixelHeight, 0]} uNumPlayers={numPlayers}/>
        </mesh>
    );
}

export default function BackgroundShader() {
    const {state} = useStore();
    const animationEnabled = core.isBackgroundAnimationEnabled(state);
    const numPlayers = core.getNumberOfPlayers(state);

    return (
        <View style={styles.container}>
            <Canvas>
                <Suspense fallback={null}>
                    {animationEnabled && <Mesh numPlayers={numPlayers} />}
                </Suspense>
            </Canvas>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: -1
    }
});
