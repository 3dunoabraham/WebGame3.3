import { Torus } from "@react-three/drei"

function Component ({state, calls }:any) {
    return ( <>
        
        <mesh castShadow receiveShadow onClick={calls.onTextClick}
          position={[ 0, (state.boundaries[1] / 2 + state.wallWidth) - (1 ), 0,]}
        >
          <boxGeometry args={[1, state.wallWidth, 1]} />
          <meshStandardMaterial color={!state.isSelectedId ? "#B6AfA5" : "#B6AfA5"}  />
        </mesh>        


        {state.isSelectedId && state.hasAnyToken && <>
          <Torus args={[0.7,0.006,4,4]}   rotation={[Math.PI/2,0,Math.PI/4]} position={[ 0, -0.345, 0, ]}
          >
            <meshStandardMaterial  attach="material" color="#b6b" />
          </Torus>
        </>}
        {<>
          <Torus args={[0.71,0.013,4,4]}   rotation={[Math.PI/2,0,Math.PI/4]} position={[ 0, -0.45, 0, ]}
          >
            <meshStandardMaterial  attach="material" color="#A69284" />
          </Torus>
        </>}
        
        {/* selected ring */}
        {state.clicked && <group scale={[1,1.4,1]} position={[ 0, -0.44, 0, ]}>
          <Torus args={[0.7,0.04,4,4]}  rotation={[Math.PI/2,0,Math.PI/4]} 
            receiveShadow castShadow
          >
            <meshStandardMaterial  attach="material" color="#615958" />
          </Torus>
        </group>}
    </>)
}
export default Component