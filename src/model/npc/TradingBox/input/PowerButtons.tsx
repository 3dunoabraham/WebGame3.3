import { Vector3 } from "three"
import DynaText from "../DynaText"
import { Torus } from "@react-three/drei"

function Component ({ tokensArrayArray, state, calls }:any) {
    return ( <>
        
        {/* STATE MODE */}
        <group onClick={!tokensArrayArray ? calls.join : calls.leave} 
            position={[0,-0.47,0]}
        >
        {/* KEY */}
        <group position={[!tokensArrayArray ? 0 : -0.25,0,0]}>
            <mesh castShadow receiveShadow 
                rotation={[0,0,0]} scale={state.score.score ? 1 : 3}
                position={[  0.67,  0,  0,]}
            >
                <boxGeometry args={[0.1, 0.01, 0.015]} />
                <meshStandardMaterial color={!tokensArrayArray ? "#ff9900" : "#00ff00"} />
            </mesh>
            
            <mesh castShadow receiveShadow 
                rotation={[0,0,0]} scale={state.score.score ? 1 : 3}
                position={[  0.62,  0,  0.05,]}
            >
                <boxGeometry args={[0.033, 0.008, 0.02]} />
                <meshStandardMaterial color={!tokensArrayArray ? "#ff9900" : "#00ff00"} />
            </mesh>
            
            <Torus args={[0.1,0.033,6,4]} rotation={[Math.PI/2,0,Math.PI/4*3]} 
                position={[0.9,0,0]}
            >
                <meshStandardMaterial flatShading={true} color={!tokensArrayArray ? "#ff9900" : "#00ff00" } />

            </Torus>
        </group>
        
        {/* LOCK */}
        <Torus args={[0.1,0.033,6,4]} rotation={[Math.PI/2,0,Math.PI/4*3]} 
            position={[0.28,0.03,0]}
        >
            <meshStandardMaterial flatShading={true} color={!state.isDowntrend ? "#aaaaaa" : "#ff9900" } />

        </Torus>
        <mesh castShadow receiveShadow onClick={!tokensArrayArray ? calls.join : calls.leave}
            scale={3}
            position={[  0.41,  0,  0,]}
        >
            <boxGeometry args={[0.07, 0.04, 0.08]} />
            <meshStandardMaterial color={"#888"} />
        </mesh>
        </group>
        
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

        
        {/* TURN VIP FEATURE SUBSCRIPTION */}
        {/* TREND LEVELER */}
        {!!tokensArrayArray && state.selectedHasArray &&
            <mesh castShadow receiveShadow scale={!state.isDowntrend ? 1 : 2}
            onClick={!state.isDowntrend ? calls.trendDown : calls.trendUp}
            rotation={state.isDowntrend ? [0,Math.PI/4,0] : [0,0,0]}
            position={[  -0.34,  state.isDowntrend ? - 0.32 : -0.35,   0.37]}
            >
            <boxGeometry args={[0.033, 0.025, 0.033]} />
            <meshStandardMaterial color={state.isDowntrend ? "#A69284" : "#aaaaaa" } />
            </mesh>
        }
        {/* TREE */}
        {!!state.isDowntrend && <group position={[-0.12,0,0.07]}>
            
            <mesh castShadow receiveShadow 
            position={[  -0.34,  -0.25,   0.37]}
            >
            <boxGeometry args={[0.02, 0.3, 0.01]} />
            <meshStandardMaterial color={"#664422"} />
            </mesh>
            <mesh castShadow receiveShadow 
            position={[  -0.34,  -0.15,   0.37]}
            >
            <sphereGeometry args={[0.1, 1, 3]} />
            <meshStandardMaterial color={"#559933" } />
            </mesh>
        </group>}
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