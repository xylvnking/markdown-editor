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



// markup
const Layout = ({children}, props) => {

  const [postLists, setPostList] = React.useState([]);
  const postsCollectionRef = collection(db, "Collection1")


  // i think this could be optimized. it's reading all documents anytime a character is typed.
  // for this small project it's fine (for now at least) but either cacheing the data or 
  // I think if when the document is selected and it's being edited, we would want to drive the data for the preview
  // by the state instead of by having to make a call to firebase for data we already have locally in state
  // yeah that makes sense

  React.useEffect(() => { 
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
      console.log("docsCalled")
      
    };
    getPosts();
  }, [children]);

  // console.log(props)
  // why can't i pass props to this?

  
  console.log(`${props.yerr} yeeeh`)
  
  return (
    <div>
      <h1 className="headerTitle">Collaborative Markdown Editor 🔥</h1>
      <div className="layout">
  
        <nav>
          <ul>
            
            {postLists.map((post) => {
              return (

                <li 

                className="navItem" 
                key={post.id}


                // why are on click events not firing at all?


                // onClick={setDocSelected(post.id)}
                
                >
                  
                  {post.entry}
                
                </li>

              ) //when a list element is clicked pass the [post.id] into setDocSelected
              
            })}
          </ul>
        </nav>
        <main>
          {children}
        </main>
      </div>
    </div>
    )
}
const IndexPage = () => {

  /*
    TO DO:
    - make it so that when you select a document on the nav bar, it loads that into the editor
      - I think I have to have state in IndexPage() which is set by a onClick/Change event called from clicking on <li>
      - which then also passes the id of that document to the state which then reloads the editor. something like that.
    - add date/metadata etc to documents
    - create a pseudo userId which is just stored on local storage? pseudo password protection?
    - export markdown
    - export richtext
    - contentful/github integration? would be AMAZING to be able to get readme.md docs from a repo
    - optimize the nav bar populator so that it's not called every time a character changes
    - security rules
    - offline mode 
  */
    
    
 const [input, setInput] = React.useState();
 
 const [docSelected, setDocSelected] = React.useState("document3")
 const docDefault = doc(db, "Collection1", docSelected)

    React.useEffect(() => {
      const waitForDoc = async () => {
        const docSnap = await getDoc(docDefault)
        const dataTemp = docSnap.data()
        setInput(dataTemp.entry)
      }
      waitForDoc()
    }, [])

    




    // const updatePost = async () => {
    //   const document1Reference = doc(db, "Collection1", "document1") // this document ref from nav selection
    //   if (input) { 
    //     await updateDoc(document1Reference, {
    //       entry: input
    //     })
    //   }
    // }

    const updatePost = async () => {
      // const document1Reference = doc(db, "Collection1", "document1")
      if (docDefault) {
        const document1Reference = doc(db, "Collection1", docSelected)
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
    
    const shit = "fuck"
  return (
    <main className="app">

      <Layout
      //  docSelected={docSelected}
      //   setDocSelected={setDocSelected}
        yerr="shit" WHWYWHWYWYWHWHYWH
      >
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
        onChange={(e) => setInput(e.target.value)}
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

      </Layout>

    </main>
  )
}

export default IndexPage