"use client";

import { Canvas } from "@react-three/fiber";
import TheButton from "./TheButton";
import SceneLight from "./SceneLight";
import { OrbitControls } from "@react-three/drei";
import React from "react";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function Effects() {
    return (
      <EffectComposer>
        <SSAO
          blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
          samples={31}
          radius={5}
          intensity={100}
        />
      </EffectComposer>
    );
  }
  
function Component ( {
    children
} : any ) {
    
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement<any>(child)) {
          return React.cloneElement(child, {
            });
        }
        return child;
      });

    return (
        <Canvas camera={{ fov: 35, position: [0, 2, 3], }}  shadows 
            
        >
            {/* <Effects /> */}
             
            <OrbitControls minPolarAngle={0.11} maxPolarAngle={1.77} 
                minDistance={1} maxDistance={7} enablePan={false}
            />

            {!!children && <>
                {childrenWithProps}
            </>}
            {!children && <>
                <SceneLight />
                <TheButton />
            </>}
            
        </Canvas>
    )
}

export default Component;