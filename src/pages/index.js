import React from 'react'
import '../style.css'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, data, getDocs, setDoc } from "firebase/firestore";
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
let userData = ""






const IndexPage = () => {
  

  const [isAuthorized, setIsAuthorized] = React.useState()
  const [userData, setUserData] = React.useState()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // setIsAuthorized(true)
      const uid = user.uid;
      // userData = user 
      setUserData(user)
      console.log(user)
    } else {
      // setIsAuthorized(false)
      setUserData()
    }
  })
  
  
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

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setIsAuthorized(true)
  //     const uid = user.uid;
  //   } else {
  //     setIsAuthorized(false)
  //   }
  // })

  console.log("rerender")
  
  return (
    <main className="app">
      {/* {`authorization status: ${(isAuthorized ? `signed in` : `logged out`)}`} */}
      {userData ? <button onClick={signUserOut}>Sign Out</button> : <button onClick={signInWithGoogle}>Sign In with Google</button>}
      {userData ? <AuthorizedEditorComponent /> : ""}
      
    </main>
    )
}

export default IndexPage
