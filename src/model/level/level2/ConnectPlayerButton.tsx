import DynaText from "@/model/npc/TradingBox/DynaText"
import { Cylinder } from "@react-three/drei"




function ConnectPlayerButton ({calls, state}: any) {
    return (<>
        
      {state.isDefaultUser && <>
        <Cylinder args={[0.1,0.1,0.2,6]} position={[0,-0.95,0]} castShadow receiveShadow 
          onClick={()=>{ calls.triggerLogin() }}
        >
          <meshStandardMaterial color={ "#eee"}/>
        </Cylinder>
        
        <DynaText text={"Connect"} color={"#5a5"} font={0.06} position={[0,-0.94,-0.17]} >        
        </DynaText>
      </>}

      {!state.isDefaultUser && <>
        <Cylinder args={[0.1,0.1,0.2,6]} position={[0,!state.isDefaultUser?-1:-0.95,0]} castShadow receiveShadow 
          onClick={()=>{ calls.triggerLogout() }}
        >
          <meshStandardMaterial color={ "#ddd"}/>
        </Cylinder>
        
        <DynaText text={"Disconnect"} color={"#a55"} font={0.06} position={[0,-0.94,-0.17]} >        </DynaText>
      </>}

      {<>
        <Cylinder args={[0.05,0.05,0.05,12]} position={[0,-1.135,0]} castShadow receiveShadow 
          onClick={()=>{ calls.triggerResetAll() }}
        >
          <meshStandardMaterial color={ "#f99"}/>
        </Cylinder>
        
        <DynaText text={"RESET LOCAL \n \n STORAGE"} color={"#dfdfdf"} font={0.10} position={[0,-1.165,-0.]}
          rotation={[Math.PI/2,0,0]}
         >        </DynaText>
      </>}
    </>)
}
export default ConnectPlayerButton