import React, { useEffect, useRef, useState } from "react";
import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import DynaText from "./TradingBox/DynaText";

export function BitCrush() {
  const [computerPosition, setComputerPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [ballPosition, setBallPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [ballXVelocity, setBallXVelocity] = useState(0.02);
  const [ballZVelocity, setBallZVelocity] = useState(0);
  const [playerPaddlePosition, setPlayerPaddlePosition] = useState(new THREE.Vector3(0, 0, 0));
    const [score, s__score] = useState(-1)
    const [lastScore, s__Lastscore] = useState(0)
  const $theBall:any = useRef(null);
  const $computerPaddle:any = useRef(null);
  const $playerPaddle:any = useRef(null);
  const [mouseY, setMouseY] = useState(0);

  // Function to update the position of the ball
  const updateBallPosition = () => {

    if (score < 0) return;
    if (!$theBall.current) return;
    let newBallPosition = $theBall.current.position;
    newBallPosition.z += ballZVelocity;
    newBallPosition.x += ballXVelocity;

    // console.log("newBallPosition.z", newBallPosition.z)
    
    // Check for collision with the walls
    if (newBallPosition.x > 1.2 || newBallPosition.x < -1.2) {
        if (newBallPosition.x > 1.2) {
                    
            const paddleCenter = $playerPaddle.current.position.z; // Assuming playerPaddle is the paddle the ball collides with
            const distanceFromCenter = newBallPosition.z - paddleCenter;
            if (distanceFromCenter >= -0.25 && distanceFromCenter <= 0.25) {
                
                s__score(score+1)

            }
            // console.log("distanceFromCenter", distanceFromCenter, newBallPosition.z, $playerPaddle.current.position.z)
                // console.log("distanceFromCenter", distanceFromCenter)
                if (distanceFromCenter >= 0 && distanceFromCenter <= 0.25)
            {
                // console.log("distanceFromCenter", distanceFromCenter)
                setBallZVelocity((score/100)+(distanceFromCenter/2*(Math.random()/2+0.5))); 
            } else if (distanceFromCenter <= 0 && distanceFromCenter >= -0.25)
            {
                // console.log("distanceFromCenter", distanceFromCenter)
                setBallZVelocity((score/100)+(distanceFromCenter/2*(Math.random()/2+0.5))); 
            } else {
                s__Lastscore(score < lastScore ? lastScore : score)
                s__score(-1)
                setBallZVelocity(0); 
                return 
                // return alert(score)
            }
            
        } else if (newBallPosition.x < -1.2) {
            console.log("newBallPosition.x", newBallPosition.x)
            setComputerPosition({...newBallPosition});
        }
        

        setBallXVelocity(-ballXVelocity);
    }
    if (newBallPosition.z > 1 || newBallPosition.z < -1) {
        setBallZVelocity(-ballZVelocity);
    }

    setBallPosition(newBallPosition);
  };

  // Function to move the player paddle up
  const movePlayerPaddleSouth = () => {
    if (!$playerPaddle.current) return;
    if ($playerPaddle.current.position.z < -1) {return}
    let newPosition = $playerPaddle.current.position;
    newPosition.z -= 0.1; // Move the paddle closer to the screen
    setPlayerPaddlePosition(newPosition);
  };

  // Function to move the player paddle down
  const movePlayerPaddleNorth = () => {
    if (!$playerPaddle.current) return;
    if ($playerPaddle.current.position.z > 1) {return}
    let newPosition = $playerPaddle.current.position;
    newPosition.z += 0.1; // Move the paddle away from the screen
    setPlayerPaddlePosition(newPosition);
  };
  const updateComputerPaddle = ()=>{
    
  }
  const startGame = ()=>{
    setBallZVelocity((Math.random()-0.5)/10)
    s__score(0)
    $theBall.current.position.set(0,0,0)
  }
  let maxMouseYMovement = window.innerHeight; // Initialize with the height of the window

  useFrame(({ mouse }, delta)=>{
    if (score < 0) return;
    // Call the update functions inside the animation frame loop
    updateComputerPaddle();
    updateBallPosition();

    handleMouseMove(mouse)
  });
  
    const handleMouseMove = (event:any) => {
        // console.log("event.clientY", score,)
        // const mouseYMovement = mouse.y * window.innerHeight; // Calculate the current Y mouse position relative to the window height
        // console.log("event.y / window.innerHeight", event.y , window.innerHeight)
        let clientY = event.y / window.innerHeight
        setMouseY(clientY);
        // console.log("event.clientY",event.y, clientY)
        let newPosition = $playerPaddle.current.position;
        newPosition.z = clientY*1000
        setPlayerPaddlePosition(newPosition);
    };
  
//   useEffect(() => {
//     const handleMouseMove = (event:any) => {
//         // console.log("event.clientY", score,)
//         if (score < 0) return
//         setMouseY(event.clientY);
//         // console.log("event.clientY", event.clientY)
//         let newPosition = $playerPaddle.current.position;
//         newPosition.z = event.clientY
//         setPlayerPaddlePosition(newPosition);
//     };
  
//     window.addEventListener("mousemove", handleMouseMove);
  
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);
  
  return (
    <>
    {/* SCORE */}
      <group position={[0, -0.145, 7.45]} rotation={[0,Math.PI,0]} >
        <DynaText color={"#0099ff"} text={score < 0 ? "Click to Play" : score} font={0.3}/>
        { lastScore > 0 && 
           <DynaText color={"#ff9900"} text={lastScore} font={0.75} position={[0,0,-0.75]}/>
        }
    </group>

      {/* SCREEN */}
      <group position={[0, -0.2, 6]}>
        <Box args={[2.5, 0.1, 3.3]} castShadow receiveShadow>
          <meshStandardMaterial color="#eee" />
        </Box>
      </group>
      <group position={[0, -0.2, 6]}>
        <Box args={[2.4, 0.15, 2.2]} castShadow receiveShadow>
          <meshStandardMaterial color="#333" />
        </Box>
      </group>
      {/* SCREEN */}

      <group position={[0, 0, 6]}>
        {/* START BUTTON */}
        <Box args={[0.5, 0.2, 0.3]} castShadow receiveShadow position={[0, -0.2, 1.1]}
            onClick={startGame}
        >
          <meshStandardMaterial color="#0099ff" />
        </Box>
        {/* SOUTH BUTTON */}
        {/* <Box args={[0.5, 0.2, 0.3]} castShadow receiveShadow position={[0, -0.2, -0.9]}
            onClick={movePlayerPaddleNorth}
        >
          <meshStandardMaterial color="#9933ff" />
        </Box>
        <Box args={[0.5, 0.2, 0.3]} castShadow receiveShadow position={[0, -0.2, -1.3]}
            onClick={movePlayerPaddleSouth}
        >
          <meshStandardMaterial color="#cc99cc" />
        </Box> */}
        {/* NORTH BUTTON */}

        {/* BALL */}
        <Box args={[0.1, 0.1, 0.1]} castShadow receiveShadow ref={$theBall}>
          <meshStandardMaterial color="#009900" />
        </Box>
        {/* END OF BALL */}

        {/* PLAYER PADDLE */}
        <Box args={[0.1, 0.1, 0.4]} position={[1.25, playerPaddlePosition.y, playerPaddlePosition.z]} castShadow receiveShadow ref={$playerPaddle}>
          <meshStandardMaterial color="#ff9900" />
        </Box>
        {/* END OF PLAYER PADDLE */}

        {/* COMPUTER PADDLE */}
        <Box args={[0.1, 0.1, 0.4]} castShadow position={[-1.25, computerPosition.y, computerPosition.z]} receiveShadow>
          <meshStandardMaterial color="#ff0000" />
        </Box>
        {/* END OF COMPUTER PADDLE */}
      </group>
    </>
  );
}

export default BitCrush;