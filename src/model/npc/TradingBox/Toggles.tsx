import { Vector3 } from "three"
import DynaText from "./DynaText"

function Component ({ tokensArrayArray, state, calls }:any) {
    return ( <>
        
        {/* STATE MODE */}
        <mesh castShadow receiveShadow onClick={!tokensArrayArray ? calls.join : calls.leave}
            rotation={[0,0,!tokensArrayArray ? 0.25 : -0.25]} scale={state.score.score ? 1 : 3}
            position={[  0.35,  - 0.34,  0.1,]}
        >
            <boxGeometry args={[0.07, 0.02, 0.03]} />
            <meshStandardMaterial color={!tokensArrayArray ? "#776666" : "#558855"} />
        </mesh>
        
        <mesh castShadow receiveShadow onClick={!tokensArrayArray ? calls.join : calls.leave}
            scale={3}
            position={[  0.35,  -0.37,  0.1,]}
        >
            <boxGeometry args={[0.08, 0.02, 0.04]} />
            <meshStandardMaterial color={"#888"} />
        </mesh>
        
        {/* DEMO MODE */}
        {/* {!!tokensArrayArray &&
            <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
            onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn}
            position={[  - 0.308,  - 0.35,  + 0.35, ]}
            rotation={[state.selectedHasArray ? -0.25 : 0.25 ,0,0]}          
            >
            <boxGeometry args={[0.025, 0.02, 0.05]} />
            <meshStandardMaterial color={state.selectedHasArray ? "#558855" : "#776666"
                } />
            </mesh>
        } */}

        {!!tokensArrayArray &&
            <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
            onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn}
            position={[   0.38,  state.selectedHasArray ? - 0.35 : -0.32,  + 0.31, ]}
            // rotation={[state.selectedHasArray ? -0.25 : 0.25 ,0,0]}          
            >
            <boxGeometry args={[0.045, 0.02, 0.045]} />
            <meshStandardMaterial color={state.selectedHasArray ? "#558855" : "#776666"
                } />
            </mesh>
        }

        
        {/* TREND LEVELER */}
        {/* {!!tokensArrayArray && 
            <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
            onClick={state.isDowntrend ? calls.trendDown : calls.trendUp}
            rotation={state.isDowntrend ? [0,-0.5,0] : [0,0.5,0]}
            position={[  0.4,  - 0.35,   0.42]}
            >
            <boxGeometry args={[0.04, 0.025, 0.01]} />
            <meshStandardMaterial color={state.isDowntrend ? "#7F524D" : "#527F4D" } />
            </mesh>
        } */}

    </>)
}
export default Component