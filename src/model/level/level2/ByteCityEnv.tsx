import { Sphere } from "@react-three/drei"
import { BackSide } from "three"

function Component ({}) {
    return (
        <>
            <fog attach="fog" args={['#a2e0f3', 2, 7]} />
        
      <ambientLight intensity={0.3}  color={"#ffffff"} />
      <pointLight intensity={2} position={[-2.5, 0.75, 1.5]} castShadow color={"#ffeedd"}  />

      <Sphere args={[3.73]}>
        <meshStandardMaterial side={BackSide} color={"#3287B3"} emissive={"#125783"} />
      </Sphere>
      </>
    )
}

export default Component