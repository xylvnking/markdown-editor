import { doc, updateDoc, collection, getDocs, documentId } from 'firebase/firestore'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'
import AwesomeDebouncePromise from 'awesome-debounce-promise';


let filterTimeout
export default function AuthorizedEditorComponent(props) {


    // debounce hook to stop autosave from updating after every single keystroke
    // create an update function for the user settings (source it initially and keep online and offline updated like userData?)


    // maybe save to local storage and a YOU HAVE UNSAVED CHANGES message would suffice



const unauthorizedData = "this would be an object of unauthorized data"
const [documentIdSelected, setDocumentIdSelected] = React.useState()
const [currentEditorText, setCurrentEditorText] = React.useState()
const [offlineData, setOfflineData] = React.useState(props.userData)
const [autoSave, setAutoSave] = React.useState()

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

React.useEffect(() => {
    setOfflineData(props.userData)
    if (props.userData) {
        const indexOfSettingsDocumentFromFirebase = props.userData.findIndex((document => document.id == "userSettings"));
        setAutoSave(props.userData[indexOfSettingsDocumentFromFirebase].autoSave)
    }
}, [props.userData])

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
            console.log('logloglog')
            updateDoc(doc(props.db, props.userInfo.uid, documentIdSelected), {
                entry: eventValue
            })
        }, 1000)
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
                offlineData.map((document) => {
                return (
                    
                        <li 
                            className={"navItem"}
                            key={document.id}
                            onClick={() => selectDocumentAndSetCurrentEditorText(document.id, document.entry)}>
                        {document.entry ? document.entry : "THIS DOC IS MISSING ENTRY FIELD"} 
                        <p>
                            {document.id}
                        </p>

                        {/* <button 
                            onClick={() => updateDocumentOnFirebase(document.id)}>
                            save
                        </button> */}

                        </li>
                    
                )
                }) : unauthorizedData
            }
                </ul>
                <button onClick={() => updateSettingsDocumentOnFirebase()}> {`autosave is set to ${autoSave}`}</button>
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