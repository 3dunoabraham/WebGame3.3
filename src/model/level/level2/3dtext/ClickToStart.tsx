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
        <group position={[0.4,0,0.5]}>
        <group ref={$textGroup}>
            <DynaText
            onClick={()=>{calls.join("btc")}}
            text="Start"
            color="#cc0000"
            font={0.15}
            position={[-0.65,-0.34,-0.92]}
            rotation={[0,0.4,0]}
            >        
        </DynaText>
            <DynaText
            onClick={()=>{calls.join("btc")}}
            text="Start"
            color="#cc0000"
            font={0.15}
            position={[-0.65,-0.34,-0.92]}
            rotation={[0,Math.PI+0.4,0]}
            >        
        </DynaText>
        </group>
        <DynaText
            // onClick={()=>{calls.join("btc")}}
            text="Click the start button"
            color="#cc00cc"
            font={0.08}
            position={[-0.84,-0.445,-0.78]}
            rotation={[-Math.PI/2,0,0]}
            >        
        </DynaText>
            {/* <DynaText
            onClick={()=>{calls.join("btc")}}
            text="Click here to"
            emissive="#ff0000"
            color="#ff0000"
            font={0.1}
            position={[-0.56,-0.3,-0.95]}
            rotation={[0,Math.PI+0.4,0]}
            >        
        </DynaText> */}
        </group>
    </>)
}
export default Component