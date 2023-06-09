import { Vector3 } from "three"

function TradeButtons ({ tokensArrayArray, state, calls }:any) {
    return ( <group position={[0,-0.1,0]}>
        
        {/* STATE MODE */}
        {/* <mesh castShadow receiveShadow onClick={!tokensArrayArray ? calls.join : calls.leave}
            rotation={[0,0,!tokensArrayArray ? 0.25 : -0.25]} scale={state.score.score ? 1 : 3}
            position={[  0.35,  - 0.34,  0.1,]}
        >
            <boxGeometry args={[0.07, 0.02, 0.03]} />
            <meshStandardMaterial color={!tokensArrayArray ? "#776666" : "#559933"} />
        </mesh> */}
        
        {/* <mesh castShadow receiveShadow onClick={!tokensArrayArray ? calls.join : calls.leave}
            scale={3}
            position={[  0.35,  -0.37,  0.1,]}
        >
            <boxGeometry args={[0.08, 0.02, 0.04]} />
            <meshStandardMaterial color={"#888"} />
        </mesh> */}

        {/* buy/sell */}
      {state.isSelectedId && state.selectedHasArray && <group>
      <mesh castShadow receiveShadow onClick={() => calls.toggleGame()} scale={state.score.score ? 1 : 3}
        position={[
          !state.clicked ?  - 0.05 :  + 0.11,
          state.clicked ?  - 0.33 :  - 0.3,
          +0.35,
        ]}        
      >
        <boxGeometry args={[0.1, state.clicked ? 0.015 : 0.04, 0.04]} />
        <meshPhongMaterial color={state.clicked ? "red" : "#55bb11"} />
      </mesh>
      
      </group>}
      
      {/* STATIC button holder */}
      {!!tokensArrayArray && state.selectedHasArray &&
      <mesh castShadow receiveShadow 
            scale={3}
            position={[  0.03,  -0.355,  0.349,]}
        >
            <boxGeometry args={[0.165, 0.01, 0.046]} />
            <meshStandardMaterial color={"#908274"} />
        </mesh>
}



      {!!tokensArrayArray &&
            <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
            onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn}
            position={[   0.38,  state.selectedHasArray ? - 0.35 : -0.32,  + 0.31, ]}
            // rotation={[state.selectedHasArray ? -0.25 : 0.25 ,0,0]}          
            >
            <boxGeometry args={[0.03, 0.04, 0.03]} />
            <meshStandardMaterial color={(!!tokensArrayArray && !!state.selectedHasArray) ? "#A69284" : "#9A7465"} />
            </mesh>
        }



        
        {/* grass ledge */}
        {!!tokensArrayArray && state.selectedHasArray && <>
              <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
              position={[   0.38,  -0.31,  + 0.31, ]}
              >
              <boxGeometry args={[0.015, 0.03, 0.015]} />
              <meshStandardMaterial color={"#559933"} />
              </mesh>
              {/* LEAFS */}
              {/* <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
              position={[   0.38,  state.selectedHasArray ? - 0.15 : -0.12,  + 0.31, ]}
              >
              <boxGeometry args={[0.025, 0.06, 0.025]} />
              <meshStandardMaterial color={"#669F36"} opacity={0.8} transparent={true} />
              </mesh> */}
        </>}
        
        
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

    </group>)
}
export default TradeButtons