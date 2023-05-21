import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { MeshStandardMaterial } from "three"

function Component ({}) {
    let $text:any = useRef()
    useFrame(({ mouse }, delta)=>{
        if (!$text.current) {
            return
        }
        $text.current.rotation.y += 0.005
    })

    return (            
        <group ref={$text}>
            <FontText position={[0.35,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
                material={new MeshStandardMaterial({ side: 0, color: "#009900" })}
            >
                Hello
            </FontText>
            <FontText position={[-0.35,0,0]} fontSize={0.25} rotation={[0,0,0]} 
                material={new MeshStandardMaterial({ side: 0, color: "#009900" })}
            >
                Hello
            </FontText>
            <FontText position={[-0.35,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
                material={new MeshStandardMaterial({ side: 0, color: "#0099ff" })}
            >
                World
            </FontText>
            <FontText position={[0.35,0,0]} fontSize={0.25} rotation={[0,0,0]} 
                material={new MeshStandardMaterial({ side: 0, color: "#0099ff" })}
            >
                World
            </FontText>
        </group>
    )    
}

export default Component