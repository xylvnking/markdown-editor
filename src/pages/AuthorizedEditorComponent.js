import { doc, updateDoc, collection, getDocs, documentId, setDoc, addDoc, deleteDoc } from 'firebase/firestore'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'
import AwesomeDebouncePromise from 'awesome-debounce-promise';


let filterTimeout
let reloadTimer
export default function AuthorizedEditorComponent(props) {





    // when a new document is created set the text editor to that
    // and also reload the data/make sure it's at the top after sort
    // text area should not accept typing if no document is selected


    // order posts by most recently edited


    // i need a way to trigger a reload of offline data, without calling to firebase.
    // the sorting is happening only when firebase is called though
    // so i might need to use a similar approach with an intermediary array to make offline data reload 

    
    const unauthorizedData = "this would be an object of unauthorized data"
    const [documentIdSelected, setDocumentIdSelected] = React.useState()
    const [currentEditorText, setCurrentEditorText] = React.useState()
    const [offlineData, setOfflineData] = React.useState(props.userData)
    const [autoSave, setAutoSave] = React.useState()

    const [reloadTrigger, setReloadTrigger] = React.useState(true)
    
    // console.log('Offline data is' + JSON.stringify(offlineData, null, 2))

    
    React.useEffect(() => {
        // sorting an array of objects coming from firebase and going into state within a subcomponent
        let x = []
        x = props.userData
        if (x) {
            x.sort((a, b) => b.lastEdited - a.lastEdited)
        }
        if (props.userData) {        
            const indexOfSettingsDocumentFromFirebase = props.userData.findIndex((document => document.id == "userSettings"));
            setAutoSave(props.userData[indexOfSettingsDocumentFromFirebase].autoSave)
        }
        setOfflineData(x)
    }, [props.userData])

const updateSettingsDocumentOnFirebase = async () => {
    setAutoSave(!autoSave)
    await updateDoc(doc(props.db, props.userInfo.uid, "userSettings"), {
        autoSave: !autoSave,
        autoSaveString: "this was saved from the program"
    })
}

const selectDocumentAndSetCurrentEditorText = (postId, postEntry) => {
    setDocumentIdSelected(postId)
    setCurrentEditorText(postEntry)
}

// this works but it causes 4 extra reads from firebase
React.useEffect(()=> {
    // props.reloadAllData()
}, [documentIdSelected, reloadTrigger])

const updateSingleObjectInOfflineData = (documentId, eventValue) => {
    setOfflineData(current =>
      current.map(obj => {
        if (obj.id === documentId) {
          return {...obj, entry: eventValue}
        }
        return obj
      }),
    )
  }

// update single document on firebase
const updateDocumentOnFirebase = async (documentId, eventValue) => {
    if(documentIdSelected === documentId) {
        clearTimeout(filterTimeout)
        filterTimeout = setTimeout(() => {
            console.log('writing to firebase...')
            updateDoc(doc(props.db, props.userInfo.uid, documentIdSelected), {
                entry: eventValue,
                lastEdited: Date.now()
                // lastEdited: Date()
            })
            setReloadTrigger(!reloadTrigger)
            // props.reloadAllData()
        }, 500)
        setCurrentEditorText(autoSave ? eventValue : currentEditorText )      
    }
}

const handleTyping = (eventValue) => {
    setCurrentEditorText(eventValue)
    updateSingleObjectInOfflineData(documentIdSelected, eventValue)
    if (autoSave) {
        updateDocumentOnFirebase(documentIdSelected, eventValue)
    } 
}

const addNewDocumentOnFirebase = async () => {
    const newDocument = {
        entry: "ok bet!",
        lastEdited: Date.now()
    }
    await addDoc(collection(props.db, `${props.userInfo.uid}`), newDocument);
    // props.reloadAllData()
    props.reloadAllData()
}

const deleteDocument = async (documentId) => {
    await deleteDoc(doc(props.db, `${props.userInfo.uid}`, `${documentId}`));
    // console.log(documentId)
    setCurrentEditorText("")
    props.reloadAllData()
}

const sortTest = () => {
}

    return (
        <main className="app">
            {/* {`authorization status: ${(isAuthorized ? `signed in` : `logged out`)}`} */}
            {/* {userInfo ? <button onClick={signUserOut}>Sign Out</button> : <button onClick={signInWithGoogle}>Sign In with Google</button>} */}
            {/* {(userInfo && userData) ? <AuthorizedEditorComponent userInfo={userInfo} userData={userData}/> : ""} */}
            <div>
            <div className="layout">
            <nav>
                <ul>
                
            {offlineData ?
                // offlineData.sort((a, b) => b.lastEdited + a.lastEdited).map((document) => {
                offlineData.map((document) => {
                    return (
                        
                        <li 
                        // user settings get mapped over but the classname ternary hides them
                        // maybe consider handling the data differently, but I don't see an issue with this
                        // the scope of this project is very likely to increase, so on the off chance it does this can be reworked
                        className={(document.id === 'userSettings') ? "hidden" : "navItem"}
                        // className={"hidden"}
                        key={document.id}
                        onClick={() => selectDocumentAndSetCurrentEditorText(document.id, document.entry)}>
                                
                        {document.entry ? document.entry : "okayyy"} 
                        {/* {document.lastEdited} */}
                        
                        <p>

                        {document.lastEdited ? document.lastEdited : "no edit"} 
                        </p>
                        
                        {/* {document.entry}  */}
                        
                        {/* <p>
                            {document.id}
                        
                        </p> */}
                        <button 
                        onClick={() => deleteDocument(document.id)}>
                            X
                        </button>

                        </li>
                    
                )
                }) : "unauthorizedData"
            }
                </ul>
                {/* <button onClick={() => updateSettingsDocumentOnFirebase()}> {`autosave is set to ${autoSave}`}</button> */}
                <button onClick={() => updateSettingsDocumentOnFirebase()}> 
                
                {/* {`autosave is set to ${autoSave}`} */}
                {autoSave ? "Autosave: ON" : "Autosave: OFF"}
                </button>
                <button onClick={() => addNewDocumentOnFirebase()}>Add new document</button>
                <button onClick={() => sortTest()}>sort test</button>
                
                <div>

                   
                </div>
                {/* <button onClick={() => updateDocumentOnFirebase()}>
                    save
                </button> */}
            </nav>

            
                <div className="markdownEditorContainer">
                    <textarea
                    className="textarea"
                    value={currentEditorText}
                    //   onChange={(e) => updateOfflineDataWithoutSaving(e.target.value)} 
                      onChange={(e) => handleTyping(e.target.value)} 
                    
                    />
                    <ReactMarkdown 
                    children={currentEditorText}
                    className="markdown"
                    />
                </div>
            </div>
            {/* <h1 className="headerTitle">Collaborative Markdown Editor 🔥</h1> */}
            </div>

            </main>
        
        
    
  )
}



// const delay = ms => new Promise(
//     resolve => setTimeout(resolve, ms)
//   );

// const delayTest = async () => {
//     await delay(1000)
// }