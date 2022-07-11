import { doc, updateDoc, collection, getDocs } from 'firebase/firestore'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'

export default function AuthorizedEditorComponent(props) {

    // when you switch to a different document, your changes shouldn't be lost
    // when you hit save, you should only update the document which is currently selected

    // if i dont reload the data on save but instead only write it
    // and use a clone of user data "offline" which is updated when firebase is
    // but since the data will only be changing from this program
    // we dont actually have to read it since our offline clone will be kept up to date with what it "would" be
    // this allows full offline mode if i also employ local storage?
    // also means that i'll drastically reduce my reads from firebase


    // maybe save to local storage and a YOU HAVE UNSAVED CHANGES message would suffice


const unauthorizedData = "this would be an object of unauthorized data"
const [documentIdSelected, setDocumentIdSelected] = React.useState()
const [currentEditorText, setCurrentEditorText] = React.useState()
const [offlineData, setOfflineData] = React.useState(props.userData)


const [autoSave, setAutoSave] = React.useState(true)

console.log(autoSave)


const selectDocumentAndSetCurrentEditorText = (postId, postEntry) => {
    setDocumentIdSelected(postId)
    setCurrentEditorText(postEntry)
}

// get index within states array of object currently being edited ::
// const objIndex = offlineData.findIndex((document => document.id == documentId));

// when the entire app reloads, set offlineData according to userData from firestore
React.useEffect(() => {
    setOfflineData(props.userData)
}, [props.userData])

// update only specific document/entry being edited so that changes are held offline and not lost on document switch
// like they were when values were being driven by the current input/editor text like they used to be
const updateObjectInArray = (documentId, eventValue) => {
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
        // update document selected
        await updateDoc(doc(props.db, props.userInfo.uid, documentIdSelected), {
            entry: currentEditorText
        })
        // offline mode
        setCurrentEditorText(autoSave ? eventValue : currentEditorText )
        // online mode
        // setCurrentEditorText(eventValue)
    }
}

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

const delayTest = async () => {
    // console.log('before')
    await delay(1000)
    // console.log('after')
}



// every keystroke the offline data is updated
// this allows the user to switch documents without changes being lost
// need to decide on how i want to handle refreshing the page - keep info?
// ability to toggle this off and update firebase with every keystroke or close to it like google docs?
// you'd need to save a past version of the document, consider whether autosave is best. maybe an option to toggle on

const handleTyping = (eventValue) => {

    setCurrentEditorText(eventValue)
    updateObjectInArray(documentIdSelected, eventValue)

    if (autoSave) {
        updateDocumentOnFirebase(documentIdSelected, eventValue)
    } 
}

// const updateOfflineDataWithoutSaving = (eventValue) => {
//     updateObjectInArray(documentIdSelected, eventValue)
//     setCurrentEditorText(eventValue)
// }

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

                        <button 
                            onClick={() => updateDocumentOnFirebase(document.id)}>
                            save
                        </button>

                        </li>
                    
                )
                }) : unauthorizedData
            }
                </ul>
                <button 
                    onClick={() => delayTest()}>
                    save
                </button>
                <button onClick={() => setAutoSave(!autoSave)}> {`autosave is set to ${autoSave}`}</button>
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
