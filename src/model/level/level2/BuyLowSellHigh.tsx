import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({}) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        $textGroup.current.position.y = Math.sin(Date.now()/500)/10-0.39
    })

    return (<group ref={$textGroup} position={[0.6,0,0.5]} rotation={[-0.5,0,0]}>
        <Text position={[0.7,0,0.6]} fontSize={0.25} rotation={[0,Math.PI,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#ff00ff" })}>
                Then click here
        </Text>
        <Text position={[-0.7,0,0.6]} fontSize={0.25} rotation={[0,0,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#ff00ff" })}>
                Then click here
        </Text>
        <Text position={[-0.55,0,0.6]} fontSize={0.25} rotation={[0,Math.PI,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>
                to buy
        </Text>
        <Text position={[0.55,0,0.6]} fontSize={0.25} rotation={[0,0,0]} 
            material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>
                to buy
        </Text>
    </group>)
}
export default Component