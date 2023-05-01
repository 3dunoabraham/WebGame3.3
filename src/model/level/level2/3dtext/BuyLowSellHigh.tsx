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

  return (
    <group ref={$textGroup} position={[0.3,0,0.5]} rotation={[-0.5,0,0]}>
      <Text position={[0.2,0.28,0.6]} fontSize={0.3} rotation={[0,Math.PI,0]} 
        material={new MeshStandardMaterial({ side: 0, color: "#005500" })}
      >
          Click the button
      </Text>
      <Text position={[-0.2,0.28,0.6]} fontSize={0.3} rotation={[0,0,0]} 
        material={new MeshStandardMaterial({ side: 0, color: "#005500" })}
      >
          Click the button
      </Text>
      <Text position={[-0.,0,0.6]} fontSize={0.35} rotation={[0,Math.PI,0]} 
        material={new MeshStandardMaterial({ side: 0, color: "#cc00cc" })}
      >
        to buy
      </Text>
      <Text position={[0.,0,0.6]} fontSize={0.35} rotation={[0,0,0]} 
        material={new MeshStandardMaterial({ side: 0, color: "#cc00cc" })}
      >
        to buy
      </Text>
    </group>
  )
}

export default Component