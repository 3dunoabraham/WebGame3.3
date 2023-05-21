import { Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"


function Component ({}) {
    return (<>
        <group>
            {/* ROAD */}
            <Box args={[8,0.07,0.6]} position={[0.,-0.4,-0.21]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#777"}/>
            </Box>
            {/* <Box args={[5,0.07,0.14]} position={[0.,-0.4,-0.295]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#777"}/>
            </Box> */}
        </group>
    </>)
}

export default Component