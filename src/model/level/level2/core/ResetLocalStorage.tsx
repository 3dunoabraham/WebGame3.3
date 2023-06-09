import DynaText from "@/model/npc/TradingBox/DynaText"
import { Cylinder } from "@react-three/drei"




function ResetLocalStorage ({calls, state}: any) {
    return (<>
      {/* RESET LOCAL STORAGE */}
      <Cylinder args={[0.05,0.05,0.02,12]} position={[1.1,-1.2,1.125]} 
        castShadow receiveShadow  onClick={()=>{ calls.triggerResetAll() }}
      >
        <meshStandardMaterial color={ "#f99"}/>
      </Cylinder>      
      <DynaText text={"RESET \n LOCAL \n STORAGE ->"} color={"#dfdfdf"} 
        font={0.075} position={[0.8,-1.205,1.2]} rotation={[Math.PI/2,0,0]}
      />
    </>)
}
export default ResetLocalStorage