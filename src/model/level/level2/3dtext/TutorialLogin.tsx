import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({}) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        $textGroup.current.position.y = Math.sin(Date.now()/500)/10 - 0.0
    })

    return (<group position={[2,1.7,1]}>
            {/* <Text position={[0.85,-0.49,1.6]} fontSize={0.25} rotation={[-Math.PI/2,0,0]} 
                material={new MeshStandardMaterial({ side: 0, color: "#ff66ff" })}>
                Fee: 0
            </Text> */}
        <group ref={$textGroup} position={[1,0,1]} rotation={[-0.5,0,0]}>
            <Text position={[0.,0.6,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
                material={new MeshStandardMaterial({ side: 0, color: "#007700" })}>
                Connect to save 
            </Text>
            <Text position={[-0.,0.6,0]} fontSize={0.25} rotation={[0,0,0]} 
                material={new MeshStandardMaterial({ side: 0, color: "#007700" })}>
                Connect to save 
            </Text>
            <Text position={[-0.,0.28,0]} fontSize={0.35} rotation={[0,Math.PI,0]} 
                material={new MeshStandardMaterial({ side: 0, color: "#ff6600" })}> 
                your progress
            </Text>
                <Text position={[0.,0.28,0]} fontSize={0.35} rotation={[0,0,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#ff6600" })}> 
                your progress
            </Text>
            
            {/* <Text position={[-0.4,0.,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
                material={new MeshStandardMaterial({ side: 0, color: "#009900" })}> 
                to level up
            </Text>
                <Text position={[0.4,0.,0]} fontSize={0.25} rotation={[0,0,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#009900" })}> 
                to level up
            </Text> */}
        </group>
    </group>)
}
export default Component