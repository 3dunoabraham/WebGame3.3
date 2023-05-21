import FontText from '@/model/npc/TradingBox/FontText';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({}) {
  const $textGroup:any = useRef()

  useFrame((ctx, delta)=>{
      if (!$textGroup.current) return

      $textGroup.current.position.z = Math.sin(Date.now()/500)/10 + 1.3
  })

  return (<group ref={$textGroup} rotation={[-1,0,0]} position={[0,0,1.4]}>
    <FontText position={[0.85,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
      material={new MeshStandardMaterial({ side: 0, color: "#00dd00" })}
    >
      Click              to continue
    </FontText>
    <FontText position={[0.85,0,0]} fontSize={0.25} rotation={[0,0,0]} 
      material={new MeshStandardMaterial({ side: 0, color: "#00dd00" })}
    >
      Click              to continue
    </FontText>
    <FontText position={[0.5,0,0]} fontSize={0.35} rotation={[0,Math.PI,0]} 
      material={new MeshStandardMaterial({ side: 0, color: "#cc00cc" })}
    >
      LIVE 
    </FontText>
    <FontText position={[0.5,0,0]} fontSize={0.35} rotation={[0,0,0]} 
      material={new MeshStandardMaterial({ side: 0, color: "#cc00cc" })}
    >
      LIVE 
    </FontText>
  </group>)
}
export default Component