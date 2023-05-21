import FontText from '@/model/npc/TradingBox/FontText';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({}) {
  const $textGroup:any = useRef()

  useFrame((ctx, delta)=>{
    if (!$textGroup.current) return

    $textGroup.current.position.y = Math.sin(Date.now()/500)/10-0.48
  })

  return (
    <group ref={$textGroup} position={[-0.5,0,0.9]} rotation={[-0.5,0,0]}>
      <FontText position={[0.4,0.28,0.6]} fontSize={0.3} rotation={[0,Math.PI,0]} 
        material={new MeshStandardMaterial({ side: 0, color: "#000000" })}
      >
          Click the green button
      </FontText>
      <FontText position={[-0.4,0.28,0.6]} fontSize={0.3} rotation={[0,0,0]} 
        material={new MeshStandardMaterial({ side: 0, color: "#000000" })}
      >
          Click the green button
      </FontText>
      <FontText position={[-0.,-0.1,0.6]} fontSize={0.5} rotation={[0,Math.PI,0]} 
        material={new MeshStandardMaterial({ side: 0, color: "#ff0000" })}
      >
        to BUY
      </FontText>
      <FontText position={[0.,-0.1,0.6]} fontSize={0.5} rotation={[0,0,0]} 
        material={new MeshStandardMaterial({ side: 0, color: "#ff0000" })}
      >
        to BUY
      </FontText>
    </group>
  )
}

export default Component