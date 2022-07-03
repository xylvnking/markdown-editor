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


const markdown = `Here is some JavaScript code:

~~~js
console.log('It works!')
~~~
`


  
  
  
  // markup
  const IndexPage = () => {
    
    const [input, setInput] = React.useState();


  // const texxxxt = "yeahyeahyeah"

  return (
    <main className="app">

    <div style={{ width: "50vw", height: "50vh", backgroundColor: "lightblue"}}>
        
        <Canvas>
          
        <CameraController />
        



        <mesh>
          <Html position={[10, 10, 10]}> 
          <ReactMarkdown 
                children={input}
                className="markdown"
                
                />
          </Html>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"#7BEDFA"}/>
          <Text color="black" anchorX="center" anchorY="middle" fontSize={1}>
            {/* {input} */}
                </Text>


        </mesh>
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