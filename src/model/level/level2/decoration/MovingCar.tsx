import { Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"


function Component ({}) {
    const [carSpeed, s__carSpeed] = useState(0.015)
    const movingPart1:any = useRef()
    const movingPart2:any = useRef()
    
    useFrame(({state,delta}:any) => {
        if (!movingPart1.current) return
        if (movingPart1.current.position.x > 5)
        {
            s__carSpeed(0.015 * (1+ (Math.random()/2+0.5)))
            movingPart1.current.scale.set(1 + (Math.random()/2+0.5)/2,1+ (Math.random()+0.5),0.3 + (Math.random()/3+0.3))
            movingPart1.current.position.x = 0 - (Math.random()+1.5)*2
            return
        }
        movingPart1.current.position.x += carSpeed
        // movingPart1.current.rotation.y += 0.02
        // movingPart1.current.rotation.z += 0.02
     })

    return (<>
        <group>
            {/* CAR */}
            <group ref={movingPart1} position={[-5,-0.34,-0.33]}>
                {/* BODY */}
                <Box args={[0.15,0.1,0.2]} position={[0,0.04,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={"#ccc"}/>
                </Box>
                <Box args={[0.35,0.06,0.21]} position={[0,0.021,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={"#bbb"}/>
                </Box>
                {/* WHEELS */}
                <Box args={[0.06,0.05,0.22]} position={[0.13,0.0,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={"#777"}/>
                </Box>
                <Box args={[0.06,0.05,0.22]} position={[-0.13,0.0,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={"#777"}/>
                </Box>
            </group>

            {/* ROAD */}
            {/* <Box args={[5,0.07,0.14]} position={[0.,-0.4,-0.295]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#777"}/>
            </Box> */}
        </group>
    </>)
}

export default Component