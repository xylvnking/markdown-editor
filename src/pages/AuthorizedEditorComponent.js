import { doc, updateDoc, collection, getDocs, documentId, setDoc, addDoc } from 'firebase/firestore'
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

console.log('Offline data is' + JSON.stringify(offlineData, null, 2))

React.useEffect(() => {
    setOfflineData(props.userData)
    if (props.userData && autoSave) {
        const indexOfSettingsDocumentFromFirebase = props.userData.findIndex((document => document.id == "userSettings"));
        setAutoSave(props.userData[indexOfSettingsDocumentFromFirebase].autoSave)
    }
    

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
        entry: "ok bet!"
    }

    await addDoc(collection(props.db, `${props.userInfo.uid}`), newDocument);
    // setOfflineData.push(newDocument)
    // setOfflineData(current => [current, newDocument])
    // props.setReloadData(!props.reloadData)
    props.reloadAllData()
    
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
                            // user settings get mapped over but the classname ternary hides them
                            // maybe consider handling the data differently, but I don't see an issue with this
                            // the scope of this project is very likely to increase, so on the off chance it does this can be reworked
                            className={(document.id === 'userSettings') ? "hidden" : "navItem"}
                            // className={"hidden"}
                            key={document.id}
                            onClick={() => selectDocumentAndSetCurrentEditorText(document.id, document.entry)}>
                                
                        {document.entry ? document.entry : "okayyy"} 
                        {/* {document.entry}  */}
                        <p>
                            {document.id}
                        </p>

                        </li>
                    
                )
                }) : unauthorizedData
            }
                </ul>
                <button onClick={() => updateSettingsDocumentOnFirebase()}> {`autosave is set to ${autoSave}`}</button>
                <button onClick={() => addNewDocumentOnFirebase()}>Add new document</button>
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