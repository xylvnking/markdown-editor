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

  const dummyText = " "
  const [postLists, setPostList] = React.useState([]);
  const [input, setInput] = React.useState();
  const [docSelected, setDocSelected] = React.useState("document1")
  const [collectionSelection, setCollectionSelection] = React.useState("Collection1")
  const [isAuthorized, setIsAuthorized] = React.useState(false)
  const [unauthorizedData, setUnauthorizedData] = React.useState([])
  const [validCollectionIsSelected, setValidCollectionIsSelected] = React.useState(false)
  const postsCollectionRef = collection(db, (collectionSelection ? collectionSelection : dummyText))
  const docDefault = doc(db, (collectionSelection ? collectionSelection : dummyText), docSelected)


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // localStorage.setItem("isAuth", true)
      // localStorage.setItem("authorName", auth.currentUser.displayName)
      // localStorage.setItem("authorUid", auth.currentUser.uid)
      // localStorage.setItem("loggedInAt", Date())
      setIsAuthorized(true)
      // navigate("/") //redirects user to the home page after a succesful login
      
      console.log('sign in called')
      console.log(JSON.stringify(auth, null, 2))
    })
  }

  const signUserOut = () => {
    signOut(auth).then(() => {
      // localStorage.clear()
      setIsAuthorized(false) // updates state to reflect that the user has signed out
      // window.location.pathname = '/login' // redirects user to the login page after signing out
    })
  }

  

  const getIndex = () => {
    const documentIndexBeingEdited = unauthorizedData.findIndex(x => {
      return x.id === docSelected
    })
    return documentIndexBeingEdited
  }

  const updateNav = async () => {
    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setUnauthorizedData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const getSnapshot = async () => {
    const docSnap = await getDoc(docDefault)
    const dataTemp = docSnap.data()
    if (dataTemp) {
      setInput(dataTemp.entry)
      setValidCollectionIsSelected(true)
    } else {
      setValidCollectionIsSelected(false)
      // setInput("") // this makes it so that nothing can be typed in editor if no valid collection is selected. Looks a bit funny, better to do this elsewhere.
    }
  } 

  const getUnauthorizedDataAtIndexOfCurrentlySelectedDocument = () => {
    let items = [...unauthorizedData]
    let item = {...items[getIndex()]}
    return item
  }

  

  const setUnauthorizedDataAccordingToInput = () => {
    // let items = [...unauthorizedData]
    // let item = {...items[getIndex()]}
    // item.entry = input
    // items[getIndex()] = item
    // setUnauthorizedData(items)

    // this works but i don't really know if there's a point
    let items = [...unauthorizedData]
    let item = getUnauthorizedDataAtIndexOfCurrentlySelectedDocument()
    item.entry = input
    items[getIndex()] = item
    setUnauthorizedData(items)


  }

  const setInputAccordingToUnauthorizedData = () => { 
    // let items = [...unauthorizedData]
    // let item = {...items[getIndex()]}
    setInput(getUnauthorizedDataAtIndexOfCurrentlySelectedDocument().entry) // loading the entry from unauthorizedData into the editor (input)
  }
  
  // LOAD DATA from firebase
  React.useEffect(() => {
    const getPosts = async () => {


      
      console.log(JSON.stringify(auth, null, 2))

      

      await updateNav()
      await getSnapshot()
      };
      getPosts();
    }, [])

  // SWITCH DOCUMENT
  React.useEffect(() => {
    if (collectionSelection) {
      const waitForDoc = async () => {
        if (isAuthorized && validCollectionIsSelected) {
          getSnapshot()
        } else {
          setInputAccordingToUnauthorizedData()
        }
      }
      waitForDoc()
    }
  }, [docSelected]) 
    
    // UPDATE FIREBASE or UPDATE UNAUTHORIZED DATA
  React.useEffect(() => {
    const updatePost = async () => {
      if (docDefault && collectionSelection && validCollectionIsSelected) {
        const document1Reference = doc(db, collectionSelection, docSelected)
        if (input && isAuthorized) {
          await updateDoc(document1Reference, {
            entry: input
          })
        } else  {
          setUnauthorizedDataAccordingToInput()
        }
      }
    }
      updatePost()
  }, [input])

  // update nav previews in realtime - if authorized
  React.useEffect(() => {
    if (isAuthorized) {
      const getPosts = async () => {
        updateNav()
        getSnapshot()
      };
      getPosts();
    }
  // }, [input, docSelected, collectionSelection])
  }, [input, collectionSelection])

  return (
    <main className="app">

      <input 
        type="text"
        value={collectionSelection}
        onChange={(e) => setCollectionSelection(e.target.value)}
      ></input>
      <button
        onClick={() => setIsAuthorized(!isAuthorized)}
      >
        {`is authorized: ${isAuthorized}`}
      </button>

      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={signUserOut}>Sign Out</button>
     
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



          {/* need to make it so that if they are authorized, it sources the database for this always
          and if they are not, it only sources the database on load and then afterwards uses unauthorizedData */}




            {/* this would be for "online mode" if the data on the page is to be constantly sourced from firestore */}


          
          {(isAuthorized ? postLists : unauthorizedData).map((post) => { // using a ternary to choose whether to map through data sourced from firebase or the "unauthorizedData" which is set on load and never written to firebase again
            return (
              <li 
              // className="navItem" 
              className={(post.id == docSelected) ? "selected" : "navItem"}
              key={post.id}
              // if it is selected set class to li selected
              onClick={() => setDocSelected(post.id)} 
              >

                {/* {post.entry} */}
                {(post.id == docSelected) ? input : post.entry} 


                {/* {input} */}
                {/* {post.entry} */}
                {/* ^^^ONLINE MODE^^^ */}
                {/* if li being created's post.id equals the document selected then put the input here, otherwise put the post.entry? */}
              </li>
            )
          })}




            {/* this would be for "offline mode" where the initial page load gets data from firestore but doesn't write it to the database again (unless authorized) */}
          {/* {postLists.map((post) => {
            return (
              <li 
              // className="navItem" 
              className={(post.id == docSelected) ? "selected" : "navItem"}
              key={post.id}
              // if it is selected set class to li selected
              onClick={() => setDocSelected(post.id)} 
              >
                {(post.id == docSelected) ? input : post.entry} 
                
              </li>
            )
          })} */}






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




          {/* <textarea
            className="textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <ReactMarkdown 
            children={input}
            className="markdown"
          /> */}

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