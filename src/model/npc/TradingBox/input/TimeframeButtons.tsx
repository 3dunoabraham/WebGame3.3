import { Vector3 } from "three"
import DynaText from "../DynaText"
const DEFAULT_TIMEFRAME_ARRAY = ["3m","15m","4h","1d","1w"]  


function Component ({ tokensArrayArray, state, calls }:any) {
    return ( <>
        
        {state.isSelectedId && !!tokensArrayArray && <>

            <mesh  castShadow receiveShadow scale={state.score.score ? 1 : 3}
            onClick={() => { calls.onTimeframeClick(state.token, DEFAULT_TIMEFRAME_ARRAY.indexOf(state.selectedTimeframe)) }}
            position={[
                0.35 +(state.selectedTimeframeIndex*0.04),
                0.05 - (state.selectedTimeframeIndex == state.selectedTimeframeIndex ? 0.34 : 0.37),
                - 0.12 + (state.selectedTimeframeIndex*0.1),
            ]}
            >
            <cylinderGeometry args={[0.005, 0.013, 0.015, 3+(state.selectedTimeframeIndex)]} />
            <meshStandardMaterial 
                color={!!tokensArrayArray[state.selectedTimeframeIndex].state ? `#${state.selectedTimeframeIndex*28+40}${state.selectedTimeframeIndex*25+20}${state.selectedTimeframeIndex*25+20}` : 'gray'} 
            />
            </mesh>

            </>}
            {state.isSelectedId && !!tokensArrayArray && ["3m","15m","4h"].map((aTimeframe, index) => {
            return (<group key={index}>

            <DynaText text={aTimeframe} color={index == state.selectedTimeframeIndex ? 0xff00ff : 0x333333}
            position={new Vector3(
                0.25 +(index*0.04),
                - (index == index ? 0.34 : 0.37),
                - 0.12 + (index*0.1),
            )}
            isSelected={state.isSelectedId}  font={0.04} onClick={()=>{calls.onTextClick()}}
            />
            <mesh  castShadow receiveShadow scale={state.score.score ? 1 : 3}
                onClick={() => { calls.onTimeframeClick(state.token, DEFAULT_TIMEFRAME_ARRAY.indexOf(aTimeframe)) }}
                position={[
                    0.35 +(index*0.04),
                - (index == state.selectedTimeframeIndex ? 0.34 : 0.37),
                - 0.12 + (index*0.1),
                ]}
            >
                <cylinderGeometry args={[0.005, 0.013, 0.04, 3+(index)]} />
                <meshStandardMaterial 
                color={!!tokensArrayArray[index].state ? `#${index*28+40}${index*25+20}${index*25+20}` : 'gray'} 
                />
            </mesh>
            </group>)
            })}
    </>)
}
export default Component