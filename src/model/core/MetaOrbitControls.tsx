import { MapControls } from "@react-three/drei";

function Component({  }: any) {
  return (
    <group >
        <MapControls 
          minPolarAngle={0.11} maxPolarAngle={2.2} 
          minDistance={1} maxDistance={12}
         >
            
        </ MapControls>
    </group>
  );
}

export default Component;