import DynaText from '@/model/npc/TradingBox/DynaText';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({calls}:any) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        $textGroup.current.position.y = Math.sin(Date.now()/500)/50
    })

    return (<>
        <group ref={$textGroup}>
            <DynaText
            onClick={()=>{calls.join("btc")}}
            text="Here"
            color="#f00"
            font={0.15}
            position={[-0.65,-0.34,-0.95]}
            rotation={[0,0.4,0]}
            >        
        </DynaText>
            <DynaText
            onClick={()=>{calls.join("btc")}}
            text="Here"
            color="#f00"
            font={0.15}
            position={[-0.65,-0.34,-0.95]}
            rotation={[0,Math.PI+0.4,0]}
            >        
        </DynaText>
        </group>
        <DynaText
            onClick={()=>{calls.join("btc")}}
            text="Click            to Start"
            color="#000"
            font={0.15}
            position={[-0.56,-0.3,-0.95]}
            rotation={[0,0.4,0]}
            >        
        </DynaText>
            <DynaText
            onClick={()=>{calls.join("btc")}}
            text="Click            to Start"
            color="#000"
            font={0.15}
            position={[-0.56,-0.3,-0.95]}
            rotation={[0,Math.PI+0.4,0]}
            >        
        </DynaText>
    </>)
}
export default Component