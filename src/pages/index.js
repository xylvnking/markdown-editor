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

// functions.auth.user().onCreate((user) => {
// })

const IndexPage = () => {
  
  const [isAuthorized, setIsAuthorized] = React.useState()
  const [userData, setUserData] = React.useState()
  // const [users, setUsers] = React.useState()
  
  const getAllDocumentsInCollection = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    // console.log(`users is: ` + JSON.stringify(querySnapshot, null, 2))
    
    querySnapshot.forEach((doc) => {
      
      // console.log(doc.id, " => ", doc.data());
      
  });
  }
  const getDocumentData = async () => {
    if (userData) {
      // console.log(`users isfsdfsdf: ` + JSON.stringify(userData.uid, null, 2))
      const docRef = doc(db, "users", userData.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // getCollections()
      // setIsAuthorized(true)
      setUserData(user)
      // getAllDocumentsInCollection()
      getDocumentData()

      
      // console.log(user.uid)
      
      // console.log(userData)


      const uid = user.uid;
      // userData = user 
      
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

  console.log("rerender")
  
  return (
    <main className="app">
      {/* {`authorization status: ${(isAuthorized ? `signed in` : `logged out`)}`} */}
      {userData ? <button onClick={signUserOut}>Sign Out</button> : <button onClick={signInWithGoogle}>Sign In with Google</button>}
      {userData ? <AuthorizedEditorComponent userData={userData}/> : ""}
      
    </main>
    )
}

export default IndexPage
