import DynaText from "@/model/npc/TradingBox/DynaText"
import { Cylinder } from "@react-three/drei"




function Component ({calls, state}: any) {
    return (<>
        
      {state.isDefaultUser && <>
        <Cylinder args={[0.1,0.1,0.2,6]} position={[0,-0.95,0]} castShadow receiveShadow 
          onClick={()=>{ calls.triggerLogin() }}
        >
          <meshStandardMaterial color={ "#fff"}/>
        </Cylinder>
        
        <DynaText text={"Sign In"} color={"#5a5"} font={0.06} position={[0,-0.94,-0.17]} >        
        </DynaText>
      </>}

      {!state.isDefaultUser && <>
        <Cylinder args={[0.1,0.1,0.2,6]} position={[0,!state.isDefaultUser?-1:-0.95,0]} castShadow receiveShadow 
          onClick={()=>{ calls.triggerLogout() }}
        >
          <meshStandardMaterial color={ "#ddd"}/>
        </Cylinder>
        
        <DynaText text={"Sign out"} color={"#a55"} font={0.06} position={[0,-0.94,-0.17]} >        </DynaText>
      </>}
    </>)
}
export default Component