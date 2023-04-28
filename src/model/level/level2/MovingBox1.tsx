import { Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"


function Component ({}) {
    
    const movingPart1:any = useRef()
    const movingPart2:any = useRef()
    
    useFrame(({state,delta}:any) => {
        if (!movingPart1.current) return
        if (movingPart1.current.position.x > 0.5)
        {
            movingPart1.current.scale.set(0.3 + (Math.random()/3+0.3),0.3 + (Math.random()/3+0.3),0.3 + (Math.random()/3+0.3))
            movingPart1.current.position.x = 0 - (Math.random()/2)
            return
        }
        movingPart1.current.position.x += 0.009
        movingPart1.current.rotation.y += 0.02
        movingPart1.current.rotation.z += 0.02
     })

    return (<>
    
        <Box args={[0.03,0.02,0.03]} position={[0.35,-0.4,-1]} castShadow receiveShadow
            ref={movingPart1}
        >
            <meshStandardMaterial color={"#fff"}/>
        </Box>
        <Box args={[0.5,0.07,0.1]} position={[0.35,-0.45,-1]} castShadow receiveShadow
        >
            <meshStandardMaterial color={"#777"}/>
        </Box>
    </>)
}

export default Component