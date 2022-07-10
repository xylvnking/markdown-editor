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
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, data, getDocs, setDoc } from "firebase/firestore";
import { getDatabase, ref, set, onValue, update } from "firebase/database";



import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth'





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
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

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
    
    - security rules
    - syntax highlighter (had it working before just disabled for firebase integration to lower chance of edge case errors)
    - replace fake auth with real auth
    
    To do if this was a real product:
    - add date/metadata etc to documents
    - contentful/github integration? would be AMAZING to be able to get readme.md docs from a repo
    - optimize the nav bar populator so that it's not called every time a character changes???????
    - export markdown
    - export richtext
  */

  const collectionDefault = "Collection1"
  const [postLists, setPostList] = React.useState([]);
  const [input, setInput] = React.useState();
  const [docSelected, setDocSelected] = React.useState("document1")
  const [collectionSelection, setCollectionSelection] = React.useState(collectionDefault)
  const [isAuthorized, setIsAuthorized] = React.useState(false)
  const [unauthorizedData, setUnauthorizedData] = React.useState([])

  console.log(`input::::: ${input}`)

  const createDefaultDocuments = () => {
    setDoc(doc(db, auth.currentUser.uid, "document1"), {
    });
  }

  const signInWithGoogle = () => {
    const signInFunction = async () => {
      await signInWithPopup(auth, provider).then((result) => {
      createDefaultDocuments()
      setDocSelected(postLists[1].id)
      }) 
    }
    signInFunction()
    
  }

  const signUserOut = () => {
    signOut(auth).then(() => {
      setIsAuthorized(false)
      setCollectionSelection(collectionDefault)
      window.location.pathname = '/'
    })
  }

  // returns index of currently selected document
  const getIndex = () => {
    if (isAuthorized) {
      const documentIndexBeingEdited = postLists.findIndex(x => {
        return x.id === docSelected
      })
      return documentIndexBeingEdited
    } else {
      const documentIndexBeingEdited = unauthorizedData.findIndex(x => {
        return x.id === docSelected
      })
      return documentIndexBeingEdited
    }
  }

  const updateNav = async () => {
    const curCollection = collection(db, (isAuthorized ? auth.currentUser.uid : collectionDefault)) // added this but it didn't seem to have any effect, i think it was done elsewhere already and so putting it here makes sense but is technically redundant
    const data = await getDocs(curCollection);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setUnauthorizedData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const getSnapshot = async () => {
    const docSnap = await getDoc(doc(db, (isAuthorized ? collectionSelection : collectionDefault), (isAuthorized ? postLists[getIndex()].id : docSelected)))
    // const docSnap = await getDoc(docDefault) // oh this is 100% is
    const dataTemp = docSnap.data()
    if (dataTemp) {
      setInput(dataTemp.entry)
      
    }
  } 

  const getUnauthorizedDataAtIndexOfCurrentlySelectedDocument = () => {
    let items = [...unauthorizedData]
    let item = {...items[getIndex()]}
    // console.log("docu want switchy")
    return item
  }

  const setUnauthorizedDataAccordingToInput = () => {
    
    let items = [...unauthorizedData]
    let item = {...items[getIndex()]}
    item.entry = input
    items[getIndex()] = item
    setUnauthorizedData(items)
  }

  const setInputAccordingToUnauthorizedData = () => { 
    setInput(getUnauthorizedDataAtIndexOfCurrentlySelectedDocument().entry) // loading the entry from unauthorizedData into the editor (input)
  }

  const initialLoad = () => {
    if (auth.currentUser) {
      setIsAuthorized(true)
      setCollectionSelection(auth.currentUser.uid)
      // uncomment to get out of error state: Uncaught (in promise) FirebaseError: No document to update:
      // signUserOut()
    } else {
      setCollectionSelection(collectionDefault)
    }
  }
  
  // LOAD DATA from firebase
  React.useEffect(() => {
    const getPosts = async () => {
      await updateNav()
      await getSnapshot()
      initialLoad()
      };
      getPosts();
    }, [])

  const switchDocumentSelected = (postId) => {
    const waitForDoc = async () => {
      if (isAuthorized) {
        setDocSelected(postId)
        // setInput(postLists[getIndex()].entry)
      } else {
        setDocSelected(postId)
        setInputAccordingToUnauthorizedData()
      }
      console.log(`The document selected is: ${docSelected}`)
    } 
    waitForDoc()
  }

  React.useEffect(() => {
    const updatePost = async () => {
      if ( input && isAuthorized ) {
          updateNav()
          getSnapshot()
          await updateDoc(doc(db, collectionSelection, postLists[getIndex()].id), {
          entry: input
        })
      } else {
        setUnauthorizedDataAccordingToInput()
      }
    }
      updatePost()
  }, [input])

  return (
    <main className="app">
      {`authorization status: ${(isAuthorized ? `signed in` : `logged out`)}`}
      { isAuthorized ? <button onClick={signUserOut}>Sign Out</button> : <button onClick={signInWithGoogle}>Sign In with Google</button>}

    {/* <div className="canvasContainer"> 
      <Canvas>
      <Stars radius={200} depth={25} count={15000} factor={4} saturation={10} fade speed={2} />
      <Sparkles count={50} size={6} scale={5} color="white" noise={1}/>
    </Canvas>
    </div> */}
    
    <div>
      {/* <h1 className="headerTitle">Collaborative Markdown Editor 🔥</h1> */}
      <div className="layout">
  
        <nav>
          <ul>
          {(isAuthorized ? postLists : unauthorizedData).map((post) => { // using a ternary to choose whether to map through data sourced from firebase or the "unauthorizedData" which is set on load and never written to firebase again
            return (
              <li 
                className={(post.id == docSelected) ? "selected" : "navItem"}
                key={post.id}
                // onClick={() => setDocSelected(post.id)}
                onClick={() => switchDocumentSelected(post.id)}>
                {post.entry} 
              </li>
            )
          })}
          </ul>
        </nav>
          <div className="markdownEditorContainer">
            <textarea
              className="textarea"
              value={isAuthorized ? postLists[getIndex()].entry : input }
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


//       rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2022, 8, 2);
//     }
//   }
// }