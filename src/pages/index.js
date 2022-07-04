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
const Layout = ({children}) => {

  // const [postLists, setPostList] = React.useState([]);
  // const postsCollectionRef = collection(db, "Collection1")

  // React.useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);
  //     setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     // console.log(postLists[2])
  //     console.log("yeahhh")
      
  //   };
  //   getPosts();
  // }, []);

  // console.log(postLists[2])



  return (
    <div>

        <h1>title thing</h1>
      <div className="layout">
  
        <nav>
          <ul>

            <li className="navItem">

            I'm baby tumeric dreamcatcher flexitarian +1 3 wolf moon unicorn cold-pressed skateboard intelligentsia la croix brunch truffaut. Umami quinoa PBR&B man bun, iceland listicle hell of 8-bit. Roof party gentrify pabst, sriracha austin semiotics microdosing truffaut. Fanny pack pok pok banh mi, pug celiac waistcoat 90's unicorn truffaut neutra locavore microdosing typewriter vegan. Pok pok PBR&B hexagon raw denim humblebrag actually. Meh deep v etsy, wolf pickled man braid mixtape cred salvia kickstarter tacos freegan succulents.



            </li>

            <li className="navItem">

            Air plant try-hard affogato brunch, celiac vexillologist portland taiyaki kogi tote bag actually tousled wolf bespoke pabst. Sartorial wayfarers tilde unicorn tonx jianbing you probably haven't heard of them deep v normcore. Scenester helvetica salvia fashion axe prism coloring book kitsch poutine mlkshk offal cardigan. 90's ethical hoodie put a bird on it leggings irony salvia mumblecore health goth gochujang lo-fi bespoke portland. Biodiesel celiac green juice hashtag, pork belly blue bottle flexitarian tousled bespoke synth poutine. Brooklyn synth meditation, affogato lo-fi pitchfork kogi asymmetrical. Vape austin humblebrag art 

            </li>

            <li className="navItem">
            
            Beard ennui fixie, sartorial art party marfa la croix vice gastropub. Pork belly twee YOLO schlitz, meh cold-pressed locavore VHS tote bag food truck direct trade lomo vice. Readymade shabby chic normcore authentic. Art party meditation tattooed, keffiyeh af sartorial cold-pressed.

            </li>

            <li className="navItem">

            Tonx 8-bit vaporware fixie leggings scenester yuccie mumblecore slow-carb trust fund. Poke artisan godard hot chicken direct trade. Edison bulb vegan tonx roof party before they sold out irony gastropub. Vaporware sartorial prism scenester copper mug, snackwave health goth lo-fi salvia green juice.
              
            </li>
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
    
    
    const docDefault = doc(db, "Collection1", "document1")
    
    const [input, setInput] = React.useState();

    React.useEffect(() => {
      const waitForDoc = async () => {
        const docSnap = await getDoc(docDefault)
        const dataTemp = docSnap.data()
        
        setInput(dataTemp.entry)
      }
      waitForDoc()
    }, [])

    const updatePost = async () => {
      const document1Reference = doc(db, "Collection1", "document1")

      if (input) { 
        // this if statement it needed to stop the update doc function from using undefined data
        // the input state cannot have a default or else it will overwrite itself ever load
        // it has to be set by reading from firestore
        // because this update relies on input being defined, the if statement prevents it from reading input before it's defined
        // once input is loaded in it triggers useEffect > updatePost > defined input

        await updateDoc(document1Reference, {
          entry: input
        })
      }
    }


    React.useEffect(() => { // this loads input after the 'get' finishes & updates it as changes are made
      updatePost()
    }, [input])
    

  return (
    <main className="app">

      <Layout>
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