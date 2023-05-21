import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({}) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        // $textGroup.current.position.z = Math.sin(Date.now()/500)/10 + 1.15
        $textGroup.current.position.y = Math.cos(Date.now()/500)/10 + 0.0
    })

    return (<group ref={$textGroup} position={[2.8,0,1.1]} rotation={[-1,0,0]}>
        <Text position={[1,2.3,-0.9]} fontSize={0.22} rotation={[0,Math.PI,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#005500" })}>
            Wait for profit
        </Text>
        <Text position={[-1,2.3,-0.9]} fontSize={0.22} rotation={[0,0,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#005500" })}>
            Wait for profit
        </Text>
        <Text position={[-1.7,-0.8,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#aa0000" })}> 
            Wait for profit, then click Sell 
        </Text>
        <Text position={[-1.7,-0.8,0]} fontSize={0.25} rotation={[0,0,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#aa0000" })}> 
            Wait for profit, then click Sell 
        </Text>
    </group>)
}
export default Component