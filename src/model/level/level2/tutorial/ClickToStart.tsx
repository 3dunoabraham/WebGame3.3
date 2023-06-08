import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';


import DynaText from '@/model/npc/TradingBox/DynaText';

function Component ({calls}:any) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        $textGroup.current.position.y = Math.sin(Date.now()/500)/50
    })


    
    return (<>
        <group position={[0.4,0,0.5]}>
        <group ref={$textGroup}>
            <DynaText onClick={()=>{calls.join("btc")}} text="Start" color="#cc0000" font={0.15}
            position={[-0.65,-0.34,-0.92]} rotation={[0,0.4,0]}
            >        
        </DynaText>
            <DynaText onClick={()=>{calls.join("btc")}} text="Start"
            color="#cc0000" font={0.15} position={[-0.65,-0.34,-0.92]} rotation={[0,Math.PI+0.4,0]}
            >        
        </DynaText>
        </group>
        <DynaText text="Click the button" color="#ff0000"font={0.1}
            position={[-0.92,-0.445,-0.7]} rotation={[-Math.PI/2,0,0.3]}
            >        
        </DynaText>
        </group>
    </>)
}
export default Component