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
    - security rules
    - make sure offline mode works - it seems to already

    - i think a more elegant solution would be to load all the collections/documents into an object and then update values with state
              - i want to be able to edit a document, switch to another, and then switch back and keep my edits. right now it all gets deleted
                  since we aren't holding the data we get from firebase in a state which isn't being updated continuously
                     - postlists is sort of that but it's being called elsewhere? wait no
                              - would need to have pieces of states for each documents entry, not just holding everything in "input" and updating that
                              maybe put all of th documents entry into an object held in state and then if write permissions update the object to/from firebase
                              but if not just use it with state? hopefully this makes sense tomorrow. not going to get super crazy bout this mvp though.
    
    maybe to do:
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

  const postsCollectionRef = collection(db, (collectionSelection ? collectionSelection : dummyText))
  const docDefault = doc(db, (collectionSelection ? collectionSelection : dummyText), docSelected)

  const [isAuthorized, setIsAuthorized] = React.useState(false)


  const [unauthorizedData, setUnauthorizedData] = React.useState([])

  // Gets posts from firestore - unsure if both are needed? same as below
  // React.useEffect(() => { 
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);
  //     setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getPosts();
  // }, []);
  const docIndex = unauthorizedData.findIndex(x => {
    return x.id === docSelected
  })

  // ON LOAD // ON LOAD // ON LOAD // ON LOAD
  // get populates postList state with documents from firestore
  React.useEffect(() => {
      const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setUnauthorizedData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        const docSnap = await getDoc(docDefault)
        const dataTemp = docSnap.data()
        setInput(dataTemp.entry)

        // console.log(data)
        // setDocumentData(data.docs.map((doc) => ({entry: doc.entry, id: doc.id })));
      };
      getPosts();
       // ternary stops the input from triggering this if isAuthorized is false so that the nav isn't updated with information we can't see
    // }, [(isAuthorized ? input : null), collectionSelection])
    }, [])
    


    







    // get single document data from firestore - for updating the editor with the document selected in the nav
    React.useEffect(() => {
      if (collectionSelection) {
        const waitForDoc = async () => {
          const docSnap = await getDoc(docDefault)
          const dataTemp = docSnap.data()

          if (isAuthorized) {
            setInput(dataTemp.entry)
            console.log("setting input while authorized")
          } else {
            // loading the entry from unauthorizedData into the editor (input)
            const documentIndexBeingEdited = unauthorizedData.findIndex(x => {
              return x.id === docSelected
            })
            let items = [...unauthorizedData]
            let item = {...items[documentIndexBeingEdited]}
            setInput(item.entry)
            console.log("not authed else called")

            

          }
        }
        waitForDoc()
      }
    }, [docSelected]) 
    
    

    const updatePost = async () => {
      if (docDefault && collectionSelection) {
        const document1Reference = doc(db, collectionSelection, docSelected)
        if (input && isAuthorized) { // AUTH
          console.log('update doc in firebase')
          await updateDoc(document1Reference, {
            entry: input
          })
        } else  {
          // set the entry in the unauthorized data's corresponding document to the input so that when we switch documents the entry stays
          // how can i update the object within the unauthorizedData array's entry which has the id of documentSelected?

          const documentIndexBeingEdited = unauthorizedData.findIndex(x => {
            return x.id === docSelected
          })

          let items = [...unauthorizedData]
          let item = {...items[documentIndexBeingEdited]}
          item.entry = input
          items[documentIndexBeingEdited] = item
          setUnauthorizedData(items)
          
          // console.log(JSON.stringify(unauthorizedData, null, 2))

        }
      }
    }
    React.useEffect(() => { // this loads input after the 'get' finishes & updates it as changes are made
      updatePost()
    }, [input])



    // think i need a piece of boolean state to check whether collection selection is selecting a real collection 

    // to update nav previews if authorized
    React.useEffect(() => {
      if (isAuthorized) {
        const getPosts = async () => {
          const data = await getDocs(postsCollectionRef);
          setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
          // this block allows us to check whether a valid collection is selected
          const docSnap = await getDoc(docDefault)
          const dataTemp = docSnap.data() // returns undefined if no valid collection is selected
          if (dataTemp) {
            setInput(dataTemp.entry)
          }

        };
        getPosts();
      }
    // }, [input, docSelected])
    }, [input, docSelected, collectionSelection])


    


    
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