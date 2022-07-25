import React from 'react'
import '../style.css'
import { getDatabase, ref, set, onValue, update } from "firebase/database";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, data, getDocs, setDoc, collectionGroup, enableIndexedDbPersistence} from "firebase/firestore";
import AuthorizedEditorComponent from './AuthorizedEditorComponent';
import UnauthorizedEditorComponent from './UnauthorizedEditorComponent'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'

import { db, auth, provider } from '../firebase-config';

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
      lastEdited: Date.now(),
      backgroundColor: '#000000'
    });
    // reloads data after new user signs in
    // setReloadData(!reloadData)
    reloadAllData()
  }

  const checkIfNewUser = async (user) => {
    console.log('checking if new user')
    // check to see if settings document exists to determine whether user exists
    const docRef = doc(db, `${user.uid}`, 'userSettings')
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    } else {
      addDefaultDocuments(user)
    }
    
  }

  onAuthStateChanged(auth, (user) => {
    console.log('auth state changed')
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
    <div className='index'>
      {/* {
        userInfo ? "" : <button onClick={signInWithGoogle}>Sign In with Google</button>
      } */}
      {
        userInfo ?
        <AuthorizedEditorComponent 
          userData={userData}
          db={db}
          userInfo={userInfo}
          reloadAllData={() => reloadAllData()}
          signOut={() => signUserOut()}
        />
        :
        <UnauthorizedEditorComponent 
          signIn={() => signInWithGoogle()}
          // userData={userData}
          // db={db}
          // userInfo={userInfo}
          // reloadAllData={() => reloadAllData()}
          // signOut={() => signUserOut()}
        />
      }
    </div>
    )
}

export default IndexPage
