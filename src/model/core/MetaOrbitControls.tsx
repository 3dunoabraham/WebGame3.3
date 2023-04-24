import { MapControls, OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Component({ basePosition, ...props }: any) {
  const $orbitObject: any = useRef();

  
  useFrame((ctx, delta)=>{
    
    if (!$orbitObject.current) return
    if (!$orbitObject.current.camera) return
    // $orbitObject.current.camera.position.x = Math.sin(Date.now() / 500) / 10;
})

  return (
    <group >
        {/* {...props} */}
        <MapControls ref={$orbitObject}  >
            
        </ MapControls>
    </group>
  );
}

export default Component;