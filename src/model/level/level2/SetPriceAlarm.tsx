import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({}) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        $textGroup.current.position.x = Math.sin(Date.now()/500)/10
    })

    return (<group ref={$textGroup}>
        <Text position={[0.35,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>Turn live</Text>
        <Text position={[-0.35,0,0]} fontSize={0.25} rotation={[0,0,0]} material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>Turn live</Text>
        <Text position={[-0.5,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} material={new MeshStandardMaterial({ side: 0, color: "#ff0000" })}>mode ON</Text>
        <Text position={[0.5,0,0]} fontSize={0.25} rotation={[0,0,0]} material={new MeshStandardMaterial({ side: 0, color: "#ff0000" })}>mode ON</Text>
    </group>)
}
export default Component