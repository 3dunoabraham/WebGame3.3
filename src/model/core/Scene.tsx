"use client";

import { Canvas } from "@react-three/fiber";
import TheButton from "./TheButton";
import SceneLight from "./SceneLight";
import { OrbitControls } from "@react-three/drei";
import React from "react";

  
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
        <Canvas camera={{ fov: 35, position: [1.5, 1, 2], }}  shadows 
            
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