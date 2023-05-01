import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({}) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        $textGroup.current.position.z = Math.sin(Date.now()/500)/10 + 1.25
    })

    return (<group ref={$textGroup} position={[2.8,0,1.3]} rotation={[-1,0,0]}>
        <Text position={[0.8,1.2,-1.2]} fontSize={0.25} rotation={[0,Math.PI,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#004400" })}>
            Wait for profit
        </Text>
        <Text position={[-0.8,1.2,-1.2]} fontSize={0.25} rotation={[0,0,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#004400" })}>
            Wait for profit
        </Text>
        <Text position={[-1.9,-0.1,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#ff00ff" })}> 
            Wait, then click Sell 
        </Text>
        <Text position={[-1.9,-0.1,0]} fontSize={0.25} rotation={[0,0,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#ff00ff" })}> 
            Wait, then click Sell 
        </Text>
    </group>)
}
export default Component