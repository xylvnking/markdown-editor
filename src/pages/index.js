import * as React from "react"
import ReactMarkdown from 'react-markdown'
import '../style.css'

// import SyntaxHighlighter from 'react-syntax-highlighter';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {zenburn} from 'react-syntax-highlighter/dist/esm/styles/prism'


import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


import { Canvas, useThree, extend, useFrame } from '@react-three/fiber'

// import { Text } from "troika-three-text";

import {Text, Html} from "@react-three/drei"
import { BoxGeometry } from "three"

// extend({ Text });
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'



import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";



const CameraController = () => {
  const { camera, gl } = useThree();
  React.useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};




const Box = (props) => {
  const boxRef = React.useRef();

  useFrame(() => {
    boxRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={boxRef} rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}>
        <Text color="pink" anchorX="center" anchorY="middle">
        Text Node from drei
        </Text>
          <Html position={[1, 1, 1]} style={{width:"450px"}} > 
          <ReactMarkdown 
            //this has to be in the html tag or else three js can't figure it out
                children={props.input}
                className="markdown"
                />
          </Html>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* <boxGeometry args={[1, 1, 1]} /> */}
          <meshStandardMaterial color={"#7BEDFA"}/>
          


        </mesh>
  );
};
  
  
  
  // markup
  const IndexPage = () => {
    
    const [input, setInput] = React.useState();


  
    




  return (
    <main className="app">

    <div style={{ width: "50vw", height: "100vh", backgroundColor: "lightblue"}}>
        
        <Canvas>
          
        <CameraController />
        
        {/* <Box input={input}/> */}
        <EffectComposer>
        {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.5} />
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
      </EffectComposer>
        </Canvas>
      </div>

      <textarea
      className="textarea"
      value={input}
      onChange={
        (e) => setInput(e.target.value)
      }/>

      <ReactMarkdown 
                children={input}
                className="markdown"
                
                />



      {/* <ReactMarkdown
        children={input}
        className="markdown"
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={zenburn}
                language={match[1]}
                PreTag="div"
                showLineNumbers={true}
                wrapLines="true"
                wrapLongLines="true"
                //probly lots more I could do here
                {...props}
              />
              
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      /> */}


      
    </main>
  )
}

export default IndexPage

// console.log(IndexPage)