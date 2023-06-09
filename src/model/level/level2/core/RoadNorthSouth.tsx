import { Box } from "@react-three/drei"


function RoadNorthSouth ({}) {
    return (<>
        <group position={[0,-0.5,0]}>
            {/* ROAD */}
            <Box args={[0.5,0.07,5]}  castShadow receiveShadow
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group>
    </>)
}

export default RoadNorthSouth