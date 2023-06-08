import { Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"


function Component ({}) {
    return (<>
        <group position={[0,-0.51,0]}>
            {/* ROAD */}
            <Box args={[8,0.07,0.6]} position={[0.25,0.01,0]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
            <Box args={[0.5,0.011,0.05]} position={[0,0,0]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#797672"}/>
            </Box>
            <Box args={[0.5,0.011,0.05]} position={[1,0,0]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#797672"}/>
            </Box>
            <Box args={[0.5,0.011,0.05]} position={[-1,0,0]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#797672"}/>
            </Box>
            <Box args={[0.5,0.011,0.05]} position={[2,0,0]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#797672"}/>
            </Box>
            <Box args={[0.5,0.011,0.05]} position={[-2,0,0]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#797672"}/>
            </Box>
            {/* <Box args={[5,0.07,0.14]} position={[0.,-0.4,-0.295]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#777"}/>
            </Box> */}
        </group>
    </>)
}

export default Component