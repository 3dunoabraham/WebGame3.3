import { Vector3 } from "three"
import DynaText from "./DynaText"

function Component ({ tokensArrayArray, state, calls }:any) {
    return ( <>
        
        <mesh castShadow receiveShadow onClick={!tokensArrayArray ? calls.join : calls.leave}
            rotation={[!tokensArrayArray ? 0.25 : -0.25,0,0]} scale={state.score.score ? 1 : 3}
            position={[  - 0.44,  - 0.35,  + 0.38,]}
        >
            <boxGeometry args={[0.025, 0.02, 0.05]} />
            <meshStandardMaterial color={!tokensArrayArray ? "#776666" : "#558855"} />
        </mesh>
        
        {!!tokensArrayArray &&
            <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
            onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn}
            position={[  - 0.32,  - 0.35,  + 0.38, ]}
            rotation={[state.selectedHasArray ? -0.25 : 0.25 ,0,0]}          
            >
            <boxGeometry args={[0.025, 0.02, 0.05]} />
            <meshStandardMaterial color={
                !tokensArrayArray ? "#777777" : 
                state.isSelectedId ? (!!state.selectedHasArray ? "#558855" : "#31958F") : "#777777" 
                } />
            </mesh>
        }

        
        {!!tokensArrayArray && 
            <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
            onClick={state.isDowntrend ? calls.trendDown : calls.trendUp}
            rotation={state.isDowntrend ? [0,-0.5,0] : [0,0.5,0]}
            position={[  0.4,  - 0.35,   0.42]}
            >
            <boxGeometry args={[0.04, 0.025, 0.01]} />
            <meshStandardMaterial color={state.isDowntrend ? "#7F524D" : "#527F4D" } />
            </mesh>
        }

    </>)
}
export default Component