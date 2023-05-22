import { Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"


function Component ({}) {
    return (<>
        <group>
            {/* ROAD */}
            <Box args={[0.3,0.07,5]} position={[0.34,-0.395,-0.]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
            {/* <Box args={[5,0.07,0.14]} position={[0.,-0.4,-0.295]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#777"}/>
            </Box> */}
        </group>
    </>)
}

export default Component