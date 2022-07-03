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
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, data } from "firebase/firestore";
 

import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDe3yv_VmOb8FonSbYQCYkdeVvhdcKTeic",
  authDomain: "markdowneditor-a40c5.firebaseapp.com",
  projectId: "markdowneditor-a40c5",
  storageBucket: "markdowneditor-a40c5.appspot.com",
  messagingSenderId: "700207360755",
  appId: "1:700207360755:web:cfbd96aaf5cd863ebb2586",
  databaseURL: "https://markdowneditor-a40c5-default-rtdb.firebaseio.com/",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig); // this has to go before the database is referenced below
const database = getDatabase(app); // this has to go after the app is initialized
const db = getFirestore(app);

// realtime database function
// function writeUserData(userId, name, email, imageUrl, entry) {
//   const db = getDatabase();
//   const reference = ref(db, 'users/' + userId);

//   set(reference, {
//     username: name,
//     email: email,
//     profile_picture : imageUrl,
//     entry: entry
//   });
// }


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
    
    // writeUserData("yeah", "uwu", "pleas", "begging", input)
    
    // React.useEffect(() => {
    //   const createCollection1 = async () => {
    //     const docRef = await addDoc(collection(db, "users"), {
    //       first: "Ada",
    //       last: "Lovelace",
    //       born: 1815
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    //   }
    //   createCollection1()
    // }, []);
    
    
    // React.useEffect(() => {
    //   const addNewDoc = async () => {
    //     const docRef = await addDoc(collection(db, "users"), {
    //       first: "Alan",
    //       middle: "Mathison",
    //       last: "Turing",
    //       born: 1912
    //     });
    //     console.log("documentAdded: ", docRef.id);
    //   }
    //   addNewDoc()
    // }, []);

    

    // React.useEffect(() => {
    //   const commitRichText = async () => {
        
    //     const docRef = await addDoc(collection(db, "users"), {
          
    //       entry: input
    //     });
    //     console.log("documentAdded: ", docRef.id);
    //   }
    //   commitRichText()
    // }, []);
    

    const [input, setInput] = React.useState("");


    const docDefault = doc(db, "Collection1", "document1") //setting reference to document
    // const docSnap = await getDoc(docDefault)
    // const [input, setInput] = React.useState(docDefault.data());

    

    React.useEffect(() => {
      const waitForDoc = async () => {
        const docSnap = await getDoc(docDefault)
        // console.log(docSnap.data())
        const dataTemp = docSnap.data()
        
        setInput(dataTemp.entry)
      }
      waitForDoc()
    }, [])

    //

    //

    //








    

    // need to figure out how get the value of a document and set it as the default state of "input"
    // I've got textarea updating the document as i type but since I have to put something as the default value it wipes on refresh
    // I need something in the default because its existence is the dependency array for update doc
          // but maybe I should trigger that with an onChange handler instead
    // either way I just need to figure out how to 
        // write rich text, 
            // have it update the document, 
                // and load it back into state after a refresh



    // IT WORKS IF I DISABLE THE UPDATE METHOD BUT U OBVIOUSLY NEED THIS. 
    // FIGURE IT OUT
    

    // React.useEffect(() => {
    //   const document1Reference = doc(db, "Collection1", "document1")
    //   const updateSingleDoc = async () => {
        
    //     await updateDoc(document1Reference, {
          
    //       entry: input
    //     });
        
    //   }
    //   updateSingleDoc()
    // }, [input]);












    //

    //

    //

    
    // console.log(docSnap.data())
    
    
    // const docRef = doc(db, "cities", "SF");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    
    // React.useEffect(() => {
    //   const docDefaultSnap = async () => {
    //     await getDoc(docDefault)
    //   }
    //   docDefaultSnap()
    // }, []);



    // React.useEffect(() => {
    //   const document1Reference = doc(db, "Collection1", "document1")
    //   const updateSingleDoc = async () => {
        
    //     await updateDoc(document1Reference, {
          
    //       entry: input
    //     });
        
    //   }
    //   updateSingleDoc()
    // }, [input]);


    

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
      }
      
      />

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