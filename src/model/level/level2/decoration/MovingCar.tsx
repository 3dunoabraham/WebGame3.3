import { Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"


function Component ({ calls }:any) {
    const [carSpeed, s__carSpeed] = useState(0.018)
    const movingPart1:any = useRef()
    const movingPart2:any = useRef()
    const [counter, s__counter]:any = useState(0)
    const [carColor, s__carColor]:any = useState("#6f7276")
    const carColorCycle = ["#6f7276","#afa2a6",]
    const clickHandler = (e:any)=> {
        console.log("counter", counter)
        if (carColor != "#afa2a6") return
        s__counter(counter+1)
        calls.onClicked(e)
        if (counter > 3) {
            triggerReset()
        }
    }

    const triggerReset = () => {

        s__carSpeed(0.015 * (1+ (Math.random()/2+0.5)))
        movingPart1.current.scale.set(1 + (Math.random()/2+0.5)/2,1+ (Math.random()+0.5),0.3 + (Math.random()/3+0.3))
        movingPart1.current.position.x = 0 - (Math.random()+1.5)*2
        s__carColor(carColorCycle[Math.round(Math.random())])
        s__counter(0)
    }
    
    useFrame(({state,delta}:any) => {
        if (!movingPart1.current) return
        if (movingPart1.current.position.x > 5)
        {
            triggerReset()
            return
        }
        movingPart1.current.position.x += carSpeed
        // movingPart1.current.rotation.y += 0.02
        // movingPart1.current.rotation.z += 0.02
     })

    return (<>
        <group>
            {/* CAR */}
            <group ref={movingPart1} position={[-5,-0.37,-0.33]} scale={[1,1.3,0.7]} >
                {/* BODY */}
                <Box args={[0.15,0.06,0.13]} position={[0,0.04,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={carColor}/>
                </Box>
                <Box args={[0.14,0.05,0.12]} position={[0.01,0.04,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={"#ddeeff"}/>
                </Box>
                <Box args={[0.3,0.04,0.15]} position={[0,0.025,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={"#5f6063"}/>
                </Box>
                {/* WHEELS */}
                <Box args={[0.04,0.03,0.18]} position={[0.09,0.005,-0.]} castShadow receiveShadow
                    onClick={clickHandler}
                >
                    <meshStandardMaterial color={"#333"}/>
                </Box>
                <Box args={[0.04,0.03,0.18]} position={[-0.09,0.005,-0.]} castShadow receiveShadow
                    onClick={clickHandler}
                >
                    <meshStandardMaterial color={"#333"}/>
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