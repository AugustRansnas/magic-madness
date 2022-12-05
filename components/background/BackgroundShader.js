import {Vector3} from "three";
import React, {Suspense, useRef} from "react";
import {Canvas, extend, useFrame, useThree} from "@react-three/fiber/native";
import {shaderMaterial} from "@react-three/drei/native";
import {StyleSheet, View} from "react-native";
import * as core from "../../store/core";

const AugustShaderMaterial = shaderMaterial(
    // Uniform
    {
        uTime: 0.,
        uResolution: new Vector3()
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
    #define MAX_ITER 8

    uniform vec3 uResolution;
    uniform float uTime;
    
    float waterHighlight(vec2 p, float time, float foaminess) {
        vec2 i = vec2(p);
        float c = 0.0;
        float foaminess_factor = mix(1.0, 6.0, foaminess);
        float inten = .005 * foaminess_factor;

        for (int n = 0; n < MAX_ITER; n++) {
            float t = time * (1.0 - (3.5 / float(n+1)));
            i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
            c += 1.0/length(vec2(p.x / (sin(i.x+t)),p.y / (cos(i.y+t))));
        }
        c = 0.2 + c / (inten * float(MAX_ITER));
        c = 1.17-pow(c, 1.4);
        c = pow(abs(c), 8.0);
        return c / sqrt(foaminess_factor);
    }
    
    void main() {
        float time = uTime * 0.1+23.0;
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 uv_square = vec2(uv.x * uResolution.x / uResolution.y, uv.y);
        float dist_center = pow(2.0*length(uv - 0.5), 2.0);
        float foaminess = smoothstep(0.4, 1.8, dist_center);
        float clearness = 0.1 + 0.9*smoothstep(0.1, 0.5, dist_center);
        
        vec2 p = mod(uv_square*TAU*TILING_FACTOR, TAU)-250.0;
        float c = waterHighlight(p, time, foaminess);
    
        vec3 water_color = vec3(0.0, 0.35, 0.5);
        vec3 color = vec3(c);
        color = clamp(color + water_color, 0.0, 1.0);
        color = mix(water_color, color, clearness);
        
        gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({AugustShaderMaterial});


const ShaderBackground = () => {
    const mesh = useRef();
    useFrame(({clock}) => {
        mesh.current.material.uniforms.uTime.value= clock.getElapsedTime()
    });
    const { size } = useThree()
    const {pixelWidth, pixelHeight} = core.getPixelWindow()


    return (
        <mesh ref={mesh}>
            <planeGeometry args={[size.width, size.height]} />
            <augustShaderMaterial uResolution={[pixelWidth, pixelHeight, 0]}/>
        </mesh>
    );
};


export default function BackgroundShader() {
    return (
        <View style={styles.container}>
            <Canvas>
                <Suspense fallback={null}>
                    <ShaderBackground/>
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
