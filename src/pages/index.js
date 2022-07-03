import * as React from "react"
import ReactMarkdown from 'react-markdown'
import '../style.css'

// import SyntaxHighlighter from 'react-syntax-highlighter';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {zenburn} from 'react-syntax-highlighter/dist/esm/styles/prism'


import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


import { Canvas, useThree, extend, useFrame } from '@react-three/fiber'

// import { Text } from "troika-three-text";

import {Text, Html, Stars, Sparkles, Sky} from "@react-three/drei"
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

    <div className="canvasContainer">
        
      {/* <Canvas>
      <Stars radius={200} depth={25} count={5000} factor={4} saturation={10} fade speed={2} />
      <Sparkles count={50} size={5} scale={10} color="white" noise={1}/>
      
      
      </Canvas> */}
    </div>
    <div className="markdownEditorContainer">

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
    </div>



      
    </main>
  )
}

export default IndexPage

// console.log(IndexPage)