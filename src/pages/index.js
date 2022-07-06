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
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, data, getDocs } from "firebase/firestore";
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

const IndexPage = () => {

  /*
    TO DO:
    - definitely a safer way to protect the site but whatever.
    - add date/metadata etc to documents
    - export markdown
    - export richtext
    - contentful/github integration? would be AMAZING to be able to get readme.md docs from a repo
    - optimize the nav bar populator so that it's not called every time a character changes???????
    - security rules
    - make sure offline mode works - it seems to already
  */

  const dummyText = " "
  
  const [postLists, setPostList] = React.useState([]);
  const [input, setInput] = React.useState();
  const [docSelected, setDocSelected] = React.useState("document1")

  const [collectionSelection, setCollectionSelection] = React.useState("Collection1")

  const postsCollectionRef = collection(db, (collectionSelection ? collectionSelection : dummyText))
  const docDefault = doc(db, (collectionSelection ? collectionSelection : dummyText), docSelected)

  

  // Gets posts from firestore - unsure if both are needed? same as below
  // React.useEffect(() => { 
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);
  //     setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getPosts();
  // }, []);
  
  // get populates postList state with documents from firestore
  React.useEffect(() => {
    

      const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getPosts();
    
  }, [input, collectionSelection])

    // get single document data from firestore - for updating the editor with the document selected in the nav
    React.useEffect(() => {
      if (collectionSelection) {
      
        const waitForDoc = async () => {
          const docSnap = await getDoc(docDefault)
          const dataTemp = docSnap.data()
          setInput(dataTemp.entry)
          
        }
        waitForDoc()
      }
    }, [docSelected]) 

    const updatePost = async () => {
      if (docDefault && collectionSelection) {
        const document1Reference = doc(db, collectionSelection, docSelected)
        if (input) { 
          await updateDoc(document1Reference, {
            
            entry: input
          })
        }
      }
    }
    React.useEffect(() => { // this loads input after the 'get' finishes & updates it as changes are made
      updatePost()
    }, [input])





    
    
    
    // might have to add conditional logic like we did before to make it so that nothing is attempting to read the undefined state ^
    console.log(`this is the collection selection: ${collectionSelection}`)
    
  return (
    <main className="app">

      <input 
        type="text"
        value={collectionSelection}
        onChange={(e) => setCollectionSelection(e.target.value)}
      ></input>
    {/* <div className="canvasContainer">
        
      <Canvas>
      <Stars radius={200} depth={25} count={5000} factor={4} saturation={10} fade speed={2} />
      <Sparkles count={50} size={5} scale={10} color="white" noise={1}/>
    </Canvas>
    </div> */}
    
    
    <div>
      {/* <h1 className="headerTitle">Collaborative Markdown Editor 🔥</h1> */}
      <div className="layout">
  
        <nav>
          <ul>
          {postLists.map((post) => {
            return (
              <li 
              className="navItem" 
              key={post.id}
              onClick={() => setDocSelected(post.id)} 
              >
                {post.entry}
              </li>
            )
          })}
            
          </ul>
        </nav>
        
          <div className="markdownEditorContainer">

          <textarea
            className="textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <ReactMarkdown 
            children={input}
            className="markdown"
          />


          </div>
        
      </div>
    </div>
    

      

    </main>
  )
}

export default IndexPage


/* <ReactMarkdown
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
      /> */