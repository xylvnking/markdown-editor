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

const unauthorizedData = "this would be an object of unauthorized data"
const [documentIdSelected, setDocumentIdSelected] = React.useState()
const [currentEditorText, setCurrentEditorText] = React.useState()


const [offlineData, setOfflineData] = React.useState(props.userData)
// console.log(`offline data is: ${offlineData}`)
console.log(offlineData)

const selectDocumentAndSetCurrentEditorText = (postId, postEntry) => {
    setDocumentIdSelected(postId)
    setCurrentEditorText(postEntry)
}

React.useEffect(() => {
    setOfflineData(props.userData)
}, [props.userData])

const updateObjectInArray = (documentId, currentEditorText) => {
    setOfflineData(current =>
      current.map(obj => {
        if (obj.id === documentId) {
          return {...obj, entry: currentEditorText};
        }

        return obj;
      }),
    );
  };


const updateDocumentOnFirebase = async (documentId) => {
    if(documentIdSelected == documentId) {
        // update document selected
        await updateDoc(doc(props.db, props.userInfo.uid, documentIdSelected), {
            entry: currentEditorText
        })
        // const objIndex = offlineData.findIndex((document => document.id == documentId));
        updateObjectInArray(documentId, currentEditorText)
        setCurrentEditorText(currentEditorText) // puts the documents entry into currenteditortext
    }
}

// const updateOfflineDataWithoutSaving = (value) => {
//     updateObjectInArray(documentIdSelected, currentEditorText)
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
                {/* <button onClick={() => updateDocumentOnFirebase()}>
                    save
                </button> */}
            </nav>

            
                <div className="markdownEditorContainer">
                    <textarea
                    className="textarea"
                    value={currentEditorText}
                      onChange={(e) => setCurrentEditorText(e.target.value)} 
                    //   onChange={(e) => setInput(e.target.value)} 
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
