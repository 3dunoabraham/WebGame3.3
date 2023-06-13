import React, { useState, useRef } from "react";
import { Box, Cylinder, MapControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function LockCameraOnBox() {
  const [cameraLocked, setCameraLocked] = useState(false);
  const controlsRef:any = useRef();

  const handleBoxClick = () => {
    setCameraLocked(!cameraLocked);
  };

  useFrame(() => {
    if (controlsRef.current && cameraLocked) {
      controlsRef.current.target.set(0, 0, 12.5); // Make the controls target the scene origin
      controlsRef.current.object.position.set(0, 4, 12); // Set the camera position to (0, 10, 0) when cameraLocked is true
    }
  });

  return (
    <group>
      <Box position={[0, -0.67, 14.25]} onClick={cameraLocked ? ()=>(handleBoxClick()) : ()=>(null) }>
        <meshStandardMaterial color={"#ffffff"} />
      </Box>
      {!cameraLocked && (
        <>
          <Box
            position={[0, -0.17, 14]}
            onClick={handleBoxClick}
            args={[0.5, 0.1, 0.2]}
          >
            <meshStandardMaterial color={"#00ff99"} />
          </Box>
        </>
      )}
      {cameraLocked && (
        <>
          <Cylinder
            position={[0, -0.17, 13.7]}
            onClick={handleBoxClick}
            args={[0.1, 0.1, 0.2, 12, 3]}
          >
            <meshStandardMaterial color={"#ff9900"} />
          </Cylinder>
        </>
      )}
      <MapControls
        ref={controlsRef}
        minPolarAngle={0.11}
        maxPolarAngle={2.2}
        minDistance={1}
        maxDistance={12}
        enablePan={!cameraLocked}
        enableZoom={true}
        enableRotate={!cameraLocked}
      />
    </group>
  );
}

export default LockCameraOnBox;
