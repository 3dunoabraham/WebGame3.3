import { Vector3 } from "three"
import DynaText from "../DynaText"
import { Torus } from "@react-three/drei"

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

        {/* {!!tokensArrayArray &&
            <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
            onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn}
            position={[   0.38,  state.selectedHasArray ? - 0.35 : -0.32,  + 0.31, ]}
            // rotation={[state.selectedHasArray ? -0.25 : 0.25 ,0,0]}          
            >
            <boxGeometry args={[0.045, 0.02, 0.045]} />
            <meshStandardMaterial color={state.selectedHasArray ? "#558855" : "#776666"
                } />
            </mesh>
        } */}

        
        {/* TREND LEVELER */}
        {!!tokensArrayArray && state.selectedHasArray &&
            <mesh castShadow receiveShadow scale={!state.isDowntrend ? 1 : 2}
            onClick={!state.isDowntrend ? calls.trendDown : calls.trendUp}
            rotation={state.isDowntrend ? [0,Math.PI/4,0] : [0,0,0]}
            position={[  -0.34,  state.isDowntrend ? - 0.32 : -0.35,   0.37]}
            >
            <boxGeometry args={[0.033, 0.025, 0.033]} />
            <meshStandardMaterial color={state.isDowntrend ? "#009900" : "#aaaaaa" } />
            </mesh>
        }
        {!!tokensArrayArray && state.selectedHasArray && <>
            <Torus args={[0.05,0.01,3,4]} rotation={[Math.PI/2,0,0]} position={[-0.34,-0.354,0.37]}
            >
                <meshStandardMaterial color={state.isDowntrend ? "#009900" : "#888888" } />

            </Torus>
          <DynaText color={state.isDowntrend ? "#009900" : "#666666" }  // TREND
              onClick={state.selectedHasArray ? calls.trendDown : calls.trendUp}
              text={state.isDowntrend ? "Watching" : "Waiting" } 
            // position={new Vector3(-0.31,-0.345,+0.46)}
            position={new Vector3(-0.34,-0.345,+0.45)}
            isSelected={state.isSelectedId}  font={0.035} 
          />
        </>}

    </>)
}
export default Component