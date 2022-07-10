import React from 'react'
import '../style.css'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, data, getDocs, setDoc, collectionGroup} from "firebase/firestore";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import AuthorizedEditorComponent from './AuthorizedEditorComponent';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDe3yv_VmOb8FonSbYQCYkdeVvhdcKTeic",
    authDomain: "markdowneditor-a40c5.firebaseapp.com",
    projectId: "markdowneditor-a40c5",
    storageBucket: "markdowneditor-a40c5.appspot.com",
    messagingSenderId: "700207360755",
    appId: "1:700207360755:web:cfbd96aaf5cd863ebb2586",
    databaseURL: "https://markdowneditor-a40c5-default-rtdb.firebaseio.com/",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
// const users = collection(db, "users")

// i think i can use this to create data for the user so they have some entries by default
// functions.auth.user().onCreate((user) => {
// })

const IndexPage = () => {
  
  const [userInfo, setUserInfo] = React.useState()
  const [userData, setUserData] = React.useState()
  const [userDataKeys, setUserDataKeys] = React.useState()
  const [entries, setEntries] = React.useState([])
  
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) => {
      console.log("signing in")
    }) 
  }
  
  const signUserOut = async () => {
    await signOut(auth).then(() => {
      console.log("signing out")
    })
  }
  
  // once the user is logged in, get their data
  React.useEffect(() => {
    const getDocumentData = async () => {
      if (userInfo) {
        const docRef = doc(db, "users", userInfo.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data())
          setUserDataKeys(Object.keys(docSnap.data()))
        } else {
          console.log("How are you even seeing this?");
        }
      }
    }
    getDocumentData()

  }, [userInfo])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserInfo(user)
    } else {
      setUserInfo()
    }
  })
  
  

 const returnStuff = () => {
  for (const key in userDataKeys) {
  entries.push(userDataKeys[key])
}
  return (

    entries.map((post) => {
      return (
        <li
          className="navItem"
          key={post}
        >
          {post}
        </li>
      )
    })
  )
 }
  
  return (
    <main className="app">
      {/* {`authorization status: ${(isAuthorized ? `signed in` : `logged out`)}`} */}
      {userInfo ? <button onClick={signUserOut}>Sign Out</button> : <button onClick={signInWithGoogle}>Sign In with Google</button>}
      {/* {(userInfo && userData) ? <AuthorizedEditorComponent userInfo={userInfo} userData={userData}/> : ""} */}
      
      {
        returnStuff()
      }

    </main>
    )
}

export default IndexPage
