import DynaText from "@/model/npc/TradingBox/DynaText"
import { Box, Cylinder, Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef, useState } from "react"
import { useAuth } from "@/../script/state/context/AuthContext"
function getCompleteTrades(transactionString: string): any[] {
  const transactions: string[] = transactionString.split('&&&').filter(Boolean);
  const trades: { [symbol: string]: any[] } = {};
  const completeTrades: any[] = [];
  console.log("transactions", transactions);

  transactions.forEach((transaction: string) => {
    try {
      const trade = JSON.parse(transaction);
      const { symbol, isBuyer, price, qty } = trade;

      if (isBuyer) {
        if (!trades[symbol]) {
          trades[symbol] = [];
        }

        trades[symbol].push(trade);
      }
      if (!isBuyer) {

        if (trades[symbol] && trades[symbol].length >= 1) {
          const buyTrade = trades[symbol].shift();
          const profitLoss = (price - buyTrade.price) * qty;

          buyTrade.profitLoss = profitLoss;
          trade.profitLoss = profitLoss;

          completeTrades.push({...trade,
            entryPrice: buyTrade.price,
            closePrice: trade.price,
          });
          
          if (trades[symbol] && trades[symbol].length == 0) {
            delete trades[symbol];
          }
        }
      }
    } catch (error) {
      console.log('Error parsing transaction:', error);
    }
  });

  console.log("completeTrades", completeTrades);
  return completeTrades;
}



function Component ({calls, state, projectionMode, s__projectionMode}:any) {
  const { superuser, do:{login, demo}, jwt }:any = useAuth()
  
  const $claimButton:any = useRef()
  const realProfitCount = useMemo(()=>{
    return state.profitHistory.filter((atrade:any, index:any) => {
      return atrade[1] == "profit"
    }).length
  },[state.profitHistory])

  useFrame(()=>{
    if (!$claimButton.current) return
    if (realProfitCount < 4) return
    $claimButton.current.rotation.y += 0.01
  })

  const state_savedStringObj = useMemo (()=> {
    try {
      return !!state.savedString ? JSON.parse(state.savedString).trades : {}
    } catch (e:any) {
      return null
    }
  }, [state.savedString])
  const toggleProjection = () => {
    s__projectionMode(!projectionMode)
  }
  const userDatabaseArray = useMemo(()=>{
    try {
      let fullarray = getCompleteTrades(superuser.trades)
      console.log("getCompleteTrades", fullarray)
      return fullarray
      // return superuser.trades.split("&&&")
    } catch (e:unknown) {

    }
    return []
  },[superuser])
  const databaseProfitCount = useMemo(()=>{
    let filteredProfits = userDatabaseArray.filter((aTrade:any,index:number)=>{
      return aTrade.profitLoss > 0
    })
    return filteredProfits.length
  },[userDatabaseArray])
  const databaseLossCount = useMemo(()=>{
    let filteredProfits = userDatabaseArray.filter((aTrade:any,index:number)=>{
      return aTrade.profitLoss <= 0
    })
    return filteredProfits.length
  },[userDatabaseArray])


  // const databaseProfitCount = useMemo(()=>{
  //   return getCompleteTrades()
  // },[userDatabaseArray])
  const syncConvertAttempt = async () => {
    calls.triggerSyncGoodPlace()
  }
  const setAPIKeys = async (e:any) => {
    calls.setAPIKeys()
    e.stopPropagation()
  }

  return (<>



{state.hasAnyToken && <>

            {/* <Box args={[3,0.2,3]} position={[0,-0.27,4.8]} castShadow receiveShadow>
              <meshStandardMaterial color={"#996644"}/>
            </Box>
            <Box args={[3.01,0.1,3.01]} position={[0,-0.2,4.8]} castShadow receiveShadow>
              <meshStandardMaterial color={"#66ff65"}/>
            </Box> */}
            
            <Cylinder position={[0,-0.27,6]} args={[3,3,0.15,4]} >
              <meshStandardMaterial color={"#996644"}/>
            </Cylinder>
            
            <Cylinder position={[0,-0.2,6]} args={[3.02,3.02,0.02,4]} >
              <meshStandardMaterial color={"#66ff65"}/>
            </Cylinder>

            {/* LONG BRiDGE */}
          <Box args={[0.5,0.1,5.6]} position={[0,-1.12,1]} castShadow receiveShadow
            rotation={[0.03,0,0]}
          >
              <meshStandardMaterial color={"#eee"}/>
            </Box>
          <Box args={[0.1,0.4,0.2]} position={[0.15,-0.85,-1.65]} castShadow receiveShadow>
              <meshStandardMaterial color={"#dddddd"}/>
            </Box>
          <Box args={[0.1,0.4,0.2]} position={[-0.15,-0.85,-1.65]} castShadow receiveShadow>
              <meshStandardMaterial color={"#dddddd"}/>
            </Box>
          <Box args={[0.45,0.1,0.22]} position={[0,-0.65,-1.65]} castShadow receiveShadow>
              <meshStandardMaterial color={"#d0d0d0"}/>
            </Box>
            <Cylinder position={[0,-0.7,3.5]} args={[0.05,0.15,0.8,4]} >
              <meshStandardMaterial color={"#bbb"}/>
            </Cylinder>
            <Cylinder position={[0,-1.05,3.5]} args={[0.3,0.15,0.25,5]} >
              <meshStandardMaterial color={"#aaa"}/>
            </Cylinder>
            <Sphere position={[0,-1,-1.65]}  args={[0.5, 8, 8]}>
              <meshStandardMaterial color={"#cff"} opacity={0.5} transparent={true}/>
            </Sphere>
          </>} 


    {/* {state.hasAnyToken && !!superuser &&  <>
      <group position={[0,0,2.01]} rotation={[Math.PI/2,0,0]}>
        {!superuser.subscription && <>
          
          <DynaText text={"SYNC \n API KEYS!"} color={ "#ff9900"} font={0.05}
            position={[0,0.305,0.14]}
              rotation={[-Math.PI/2,0,0]}

              // position={[0,-0.15,-1.19]} font={0.15}
            />
        </>}
        {!superuser.subscription && <>
        <Cylinder args={[0.15,0.15,0.1,4]} position={[0,0.25,0.15]} castShadow receiveShadow ref={$claimButton}
          onClick={setAPIKeys}
        >
          <meshStandardMaterial color={!projectionMode ? "#a0dFf3" : "#f93"}/>
        </Cylinder>
        </>}
        {!!superuser.subscription && <>
        <Cylinder args={[0.12,0.12,0.1,projectionMode ? 4 : 3]} position={[0,0.25,0.15]} castShadow receiveShadow ref={$claimButton}
          onClick={()=>{toggleProjection()}}
        >
          <meshStandardMaterial color={!projectionMode ? "#a0dFf3" : "#f93"}/>
        </Cylinder>
        </>}
        <Cylinder args={[0.16,0.16,0.12,12]} position={[0,0.22,0.15]} castShadow receiveShadow 
        >
          <meshStandardMaterial color={"#c0c0c0"}/>
        </Cylinder>
      </group>
    </>}


 */}







    {/* {state.hasAnyToken && !!superuser && superuser.subscription && databaseProfitCount > 0 && <>
      <group position={[0,-0.3,1.9]} rotation={[-Math.PI/2,0,0]}>
        <Cylinder args={[0.08,0.08,0.1,projectionMode ? 4 : 3]} position={[0,0.25,0.15]} castShadow receiveShadow ref={$claimButton}
          onClick={()=>{syncConvertAttempt()}}
        >
          <meshStandardMaterial color={"#f93"}/>
        </Cylinder>
        <Cylinder args={[0.11,0.11,0.12,12]} position={[0,0.22,0.15]} castShadow receiveShadow 
        >
          <meshStandardMaterial color={"#bbb"}/>
        </Cylinder>
      </group>
    </>}



    {userDatabaseArray.length > 0 && <group position={[0,0,-0.8]}>
      <DynaText text={userDatabaseArray.length} color={ "#666666"} font={0.24}
        position={[0.03,-.459,1]}
          rotation={[-Math.PI/2,0,0]}

        />
        <DynaText text={userDatabaseArray.length == 1 ? "Trade" : "Trades"} color={ "#666666"} font={0.05}
          position={[0.02,-.459,1.15]}
            rotation={[-Math.PI/2,0,0]}

        />
    </group>}

        
    {databaseLossCount > 0 && <group position={[0,0,-0.3]}>
      <DynaText text={databaseLossCount} color={ "#cc0000"} font={0.1}
        position={[0.03,-.459,1]}
          rotation={[-Math.PI/2,0,0]}

        />
        <DynaText text={databaseLossCount == 1 ? "Loss" : "Losses"} color={ "#cc0000"} font={0.06}
          position={[0.02,-.459,1.07]}
            rotation={[-Math.PI/2,0,0]}

        />
    </group>}


    {databaseProfitCount > 0 && <>
      <DynaText text={databaseProfitCount} color={ "#ff9933"} font={0.2}
        position={[0.03,-.459,1.09]}
          rotation={[-Math.PI/2,0,0]}

        />
        <DynaText text={databaseProfitCount == 1 ? "Profit" : "Profits"} color={ "#ff9933"} font={0.07}
          position={[0.04,-.459,1.2]}
            rotation={[-Math.PI/2,0,0]}
  
        />
    </>}
    
        
    {!!superuser && superuser.subscription && 
    <group>
      <DynaText text={superuser.subscription} color={ "#cc33cc"}
        position={[0,-1.06,0.5]}
          rotation={[-Math.PI/2,0,0]}

        />
        
      <DynaText text={superuser.subscription == 1 ? "Node" : "Nodes"} color={ "#cc33cc"} font={0.09}
        position={[0.02,-1.06,0.7]}
          rotation={[-Math.PI/2,0,0]}

        />
      </group>
    } */}






  

    {/* {state.hasAnyToken &&
      <group position={[0,0,1.95]}>
        <Cylinder args={[0.25,0.38,0.75,6]} position={[0,-0.32,0]} castShadow receiveShadow 
        >
          <meshStandardMaterial color={"#ccc"}/>
        </Cylinder>
      </group>
    }
    {state.hasAnyToken && <>
      <group position={[-0.15,-0.55,1.95]}>
          {userDatabaseArray.filter((aTrade:any,index:number)=>(aTrade.profitLoss > 0)).slice(0,5).map((anOrder:any, index:any)=>{
            return (
              <Box args={[0.07,0.11,0.07]} position={[index*0.075,0.6,0]}  castShadow receiveShadow key={index}>
                <meshStandardMaterial color={anOrder.profitLoss == 0 ? "#f990" : "#ccc"}/>
              </Box>
            )
          })} 
          {userDatabaseArray.filter((aTrade:any,index:number)=>(aTrade.profitLoss > 0)).slice(0,5).map((anOrder:any, index:any)=>{
            return (
              <Box args={[0.065,0.1,0.18]} position={[index*0.075,0.6,0]}  castShadow receiveShadow key={index}>
                <meshStandardMaterial color={anOrder.profitLoss == 0  ? "#aaaaaa" : "#ffaa33"}
                />
              </Box>
            )
          })}
          
          {[0,1,2,3,4].map((anOrder:any, index:any)=>{
            return (
              <Box args={[0.065,0.1,0.18]} position={[index*0.075,0.6,0]}   key={index}>
                <meshStandardMaterial color={"#ff9933"}
                  transparent={true} opacity={0.15}
                />
              </Box>
            )
          })}
        </group>
      </>}



      
      {state.hasAnyToken && <>
            <Box args={[1.5,0.66,1.2]} position={[0.05,-0.81,1.88]} castShadow receiveShadow>
              <meshStandardMaterial color={"#fff"}/>
            </Box>
            <Box args={[0.9,0.6,0.95]} position={[0.05,-0.75,1.84]} castShadow receiveShadow>
              <meshStandardMaterial color={"#B6AfA5"}/>
            </Box>
          <Box args={[0.5,0.1,2.2]} position={[0.08,-1.12,1]} castShadow receiveShadow>
              <meshStandardMaterial color={"#eee"}/>
            </Box>
          <Box args={[0.85,0.2,0.85]} position={[0.08,-1.12,-0.5]} castShadow receiveShadow>
              <meshStandardMaterial color={"#ddd"}/>
            </Box>
          </>} */}



    </>
  )
}

export default Component