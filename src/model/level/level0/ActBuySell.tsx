"use client";

import FontText from "@/model/npc/TradingBox/FontText";
import { Box, Cylinder, Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { MeshStandardMaterial } from "three"

function Component ({}) {
    let $wormhole:any = useRef()
    let $topPart:any = useRef()
    let $middlePart:any = useRef()
    let $text:any = useRef()
    let [totaldelta, s__totaldelta]:any = useState(0)
    let [forms, s__forms]:any = useState({
        isClicked: false,
        score: 0,
    })
    const setForm = (key:string, value:any) => {
        s__forms({...forms,...{[key]:value}})
    }
    useFrame(({ mouse }, delta)=>{
        if (!$wormhole.current) {
            return
        }
        if (!!$text && !!$text.current)
        {
            $text.current.rotation.y += 0.01
        }
        
        if ($text.current && !forms.isClicked) {
            s__totaldelta(totaldelta+delta)
            $text.current.position.y = Math.sin(totaldelta*4)/10 + 1
        }
        if (!forms.isClicked) 
        {
            return
        }
        $middlePart.current.rotation.y += 0.005
        if ($middlePart.current.position.y < -3.5) {
            $middlePart.current.position.x = Math.random()-0.5
            $middlePart.current.position.y = 2.5
            $middlePart.current.position.z = Math.random()-0.5
        } else {
            $middlePart.current.position.y -= 0.15
        }
    })
    const turnOff = ()  => {
        s__forms({
            isClicked: false,
            score: forms.score+1
        })
    }
    const turnOn = ()  => {
        if (forms.score > 9 ) return alert("no")

        setForm("isClicked",!forms.isClicked)
    }

    return (
        <group ref={$wormhole} rotation={[0, 0, 0]}>
            
            <Box args={[1,1,1]} scale={0.7}  position={[0,-1 - (forms.isClicked ? 0.3 : 0),0]} 
                onClick={forms.isClicked ? turnOff : turnOn}
            >
                <meshStandardMaterial attach="material"  color={forms.isClicked ? 0xff0000 : 0x009900} />
            </Box>
            

            <FontText position={[0.5,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>Buy low</FontText>
            <FontText position={[-0.5,0,0]} fontSize={0.25} rotation={[0,0,0]} material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>Buy low</FontText>
            <FontText position={[-0.5,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} material={new MeshStandardMaterial({ side: 0, color: "#ff0000" })}>Sell high</FontText>
            <FontText position={[0.5,0,0]} fontSize={0.25} rotation={[0,0,0]} material={new MeshStandardMaterial({ side: 0, color: "#ff0000" })}>Sell high</FontText>
            {!!forms.score &&
                <group ref={$text}  position={[0,1.2,0]}>
                    <FontText fontSize={0.5} material={new MeshStandardMaterial({ side: 0, color: "grey" })}>{forms.score}</FontText>
                    <FontText fontSize={0.5} rotation={[0,Math.PI,0]} material={new MeshStandardMaterial({ side: 0, color: "grey" })}>{forms.score}</FontText>
                </group>
            }

            {
                <group ref={$topPart}>
                    {!!forms.isClicked &&
                        <Cylinder args={[0.05, 0.1, 0.2, 5, 3]} receiveShadow castShadow position={[0,0,0]}  ref={$middlePart}>
                            <meshStandardMaterial attach="material" color={0x0099ff} wireframe={true} />
                        </Cylinder>
                    }
                </group>
            }

            <Cylinder args={[1, forms.isClicked ? 3 : 2, 2, 4, 3]} receiveShadow castShadow position={[0,-2,0]}>
                <meshStandardMaterial attach="material"  color={0xffffff} />
            </Cylinder>
            
        </group>
    )    
}

export default Component