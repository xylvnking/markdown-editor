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
const users = collection(db, "users")

// i think i can use this to create data for the user so they have some entries by default
// functions.auth.user().onCreate((user) => {
// })

const IndexPage = () => {
  
  // const [isAuthorized, setIsAuthorized] = React.useState()
  const [userData, setUserData] = React.useState()
  // const [users, setUsers] = React.useState()
  
  const getDocumentData = async () => {
    // if the user is signed in
    if (userData) {
      // console.log(`users isfsdfsdf: ` + JSON.stringify(userData.uid, null, 2))
      // get a reference to their document which is named after their UID
      const docRef = doc(db, "users", userData.uid);
      // make sure that reference has been set
      const docSnap = await getDoc(docRef);
      // if the reference is set properly
      if (docSnap.exists()) {
        // log all of their data to the console
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
  }

  onAuthStateChanged(auth, (user) => {
    // if the user is signed in, 
    // set user data stores information about the user in state
    // get document data gets all of their stored data 
        //which are field:values held in one document named according their uid
    if (user) {
      setUserData(user)
      getDocumentData()
    // otherwise if the user is not signed in, set user data to none
    // and probably set document data to the "unauthorized data" like before
    } else {
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
  
  return (
    <main className="app">
      {/* {`authorization status: ${(isAuthorized ? `signed in` : `logged out`)}`} */}
      {userData ? <button onClick={signUserOut}>Sign Out</button> : <button onClick={signInWithGoogle}>Sign In with Google</button>}
      {userData ? <AuthorizedEditorComponent userData={userData}/> : ""}
    </main>
    )
}

export default IndexPage
