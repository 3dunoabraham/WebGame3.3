import { Sphere } from "@react-three/drei"
import { BackSide } from "three"

function Component ({}) {
    return (
        <>
            <fog attach="fog" args={['#0099ff', 3, 8]} />
        
      <ambientLight intensity={0.3}  color={"#ffffff"} />
      <pointLight intensity={2} position={[-2.5, 0.75, 1.5]} castShadow color={"#ffeedd"}  />

      <Sphere args={[3.73]}>
        <meshStandardMaterial side={BackSide} color={"#0099ff"} emissive={"#0099ff"} />
      </Sphere>
      </>
    )
}

export default Component