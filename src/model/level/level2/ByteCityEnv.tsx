import { Sphere } from "@react-three/drei"
import { BackSide } from "three"

function Component ({}) {
    return (
        <>
            <fog attach="fog" args={['#72C0DD', 2, 8]} />
        
      <ambientLight intensity={0.25} color={"#ffeedd"} />
      <pointLight intensity={1.5} position={[1.5, 1, 2.5]} castShadow />

      <Sphere args={[3.5]}>
        <meshStandardMaterial side={BackSide} color={"#3287B3"} emissive={"#125783"} />
      </Sphere>
      </>
    )
}

export default Component