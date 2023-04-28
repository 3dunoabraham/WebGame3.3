import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({}) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        $textGroup.current.position.y = Math.sin(Date.now()/500)/10 - 0.3
    })

    return (<group ref={$textGroup} position={[1.2,0,1]} rotation={[-1,0,0]}>
        <Text position={[0.7,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#FF00FF" })}>
            Then click red
        </Text>
        <Text position={[-0.7,0,0]} fontSize={0.25} rotation={[0,0,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#FF00FF" })}>
            Then click red
        </Text>
        <Text position={[-0.5,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#990000" })}> 
        to Sell
    </Text>
        <Text position={[0.5,0,0]} fontSize={0.25} rotation={[0,0,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#990000" })}> 
        to Sell
    </Text>
    </group>)
}
export default Component