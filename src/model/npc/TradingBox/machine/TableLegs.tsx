function Component ({}) {
    return ( <>
        
        <mesh castShadow receiveShadow 
            position={[ 0.4, -0.7, -0.4, ]}          
          >
            <boxGeometry args={[0.05, 0.6, 0.05]} />
            <meshStandardMaterial  color={"#ccc"}  />
          </mesh>
          <mesh castShadow receiveShadow 
            position={[ -0.4, -0.7, -0.4, ]}          
          >
            <boxGeometry args={[0.05, 0.6, 0.05]} />
            <meshStandardMaterial  color={"#ccc"}  />
          </mesh>
          <mesh castShadow receiveShadow 
            position={[ 0.4, -0.7, 0.4, ]}          
          >
            <boxGeometry args={[0.05, 0.6, 0.05]} />
            <meshStandardMaterial  color={"#ccc"}  />
          </mesh>
          <mesh castShadow receiveShadow 
            position={[ -0.4, -0.7, 0.4, ]}          
          >
            <boxGeometry args={[0.05, 0.6, 0.05]} />
            <meshStandardMaterial  color={"#ccc"}  />
          </mesh>
    </>)
}
export default Component