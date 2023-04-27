import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({}) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        $textGroup.current.position.y = Math.sin(Date.now()/500)/10
    })

    return (<group ref={$textGroup}>
        <Text position={[0.6,0,0.6]} fontSize={0.25} rotation={[0,Math.PI,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>
                Click button
        </Text>
        <Text position={[-0.6,0,0.6]} fontSize={0.25} rotation={[0,0,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>
                Click button
        </Text>
        <Text position={[-0.5,0,0.6]} fontSize={0.25} rotation={[0,Math.PI,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>
                to Buy
        </Text>
        <Text position={[0.5,0,0.6]} fontSize={0.25} rotation={[0,0,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>
                to Buy
        </Text>
    </group>)
}
export default Component