import React from 'react'
import '../style.css'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, data, getDocs, setDoc, collectionGroup, enableIndexedDbPersistence} from "firebase/firestore";
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

const IndexPage = () => {

  const [userInfo, setUserInfo] = React.useState()
  const [userData, setUserData] = React.useState()

  // using this as a trigger for a useeffect
  const [reloadData, setReloadData] = React.useState()
  
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) => {
      console.log("signing in")
    }) 
  }
  
  const signUserOut = async () => {
    await signOut(auth).then(() => {
      console.log("signing out")
      setUserData("") // removes nav previews if not signed in
    })
  }

  const reloadAllData = () => {
    setReloadData(!reloadData)
  }

  const addDefaultDocuments = async (user) => {
    await setDoc(doc(db, `${user.uid}`, "userSettings"), {
      autoSave: true,
      autoSaveString: "this is a string"
    });
    await setDoc(doc(db, `${user.uid}`, "Default Document"), {
      entry: "thank you for being here I love you",
      lastEdited: Date.now()
    });
    // reloads data after new user signs in
    // setReloadData(!reloadData)
    reloadAllData()
  }

  const checkIfNewUser = async (user) => {
    // check to see if settings document exists to determine whether user exists
    const docRef = doc(db, `${user.uid}`, 'userSettings')
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log('user exists, dont do anything')
    } else {
      addDefaultDocuments(user)
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserInfo(user)
      checkIfNewUser(user)
    } else {
      setUserInfo()
    }
  })
  
  // once the user is logged in, get their data
  React.useEffect(() => {
    const getDocumentData = async () => {
      if (userInfo) {
        const currentCollection = collection(db, userInfo.uid)
        const data = await getDocs(currentCollection);
        setUserData(data.docs.map((doc) => ({
          ...doc.data(), id: doc.id 
        })))
      }
    }
    getDocumentData()

  }, [userInfo, reloadData])
  
  return (
    <div>
      {/* <h1 className="headerTitle">Collaborative Markdown Editor 🔥</h1> */}
      {
        userInfo ? <button onClick={signUserOut}>Sign Out</button> : <button onClick={signInWithGoogle}>Sign In with Google</button>
      }
      {
        userInfo ?
        <AuthorizedEditorComponent 
          userData={userData}
          db={db}
          userInfo={userInfo}
          reloadAllData={() => reloadAllData()}
        />
        :
        ""
      }
    </div>
    )
}

export default IndexPage
