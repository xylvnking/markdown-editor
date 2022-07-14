import { doc, updateDoc, collection, getDocs, documentId, setDoc, addDoc, deleteDoc } from 'firebase/firestore'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'
import AwesomeDebouncePromise from 'awesome-debounce-promise';

let filterTimeout
export default function AuthorizedEditorComponent(props) {



    // text area should not accept typing if no document is selected
    // add ability to change background color of document - store it in firebase
        // would improve ux imo
            // maybe dont worry about it until we design though

    // MAKE FIRESTORE CONFIG FILE - HAVING IT IN THE MAIN FILE IS WHY YOU'RE MAKING SO MANY CALLS CONSTANTLY

    // make unauthorized version




    const [documentIdSelected, setDocumentIdSelected] = React.useState()
    const [currentEditorText, setCurrentEditorText] = React.useState()
    const [offlineData, setOfflineData] = React.useState(props.userData)
    const [autoSave, setAutoSave] = React.useState()
    const [reloadTrigger, setReloadTrigger] = React.useState(true) 

    React.useEffect(() => {
        // sorting an array of objects coming from firebase and going into state within a subcomponent
        let x = []
        x = props.userData
        if (x) { // if statement makes sure data loaded in already from firebase before attempting to sort it
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

    // don't think i need this, delete if it isn't used tomorrow 
    React.useEffect(()=> {
        // props.reloadAllData()
    }, [documentIdSelected, reloadTrigger])

    const updateAndSortOfflineData = (documentId, eventValue) => {
        let x = []
        x = offlineData
        x = x.map(obj => {
            if (obj.id === documentId) {
            return {...obj, entry: eventValue, lastEdited: Date.now()}
            }
            return obj
        })
        x.sort((a, b) => b.lastEdited - a.lastEdited)
        setOfflineData(x)
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
            }, 500)
            setCurrentEditorText(autoSave ? eventValue : currentEditorText )      
        }
    }

    const handleTyping = (eventValue) => {
        setCurrentEditorText(eventValue)
        updateAndSortOfflineData(documentIdSelected, eventValue)
        if (autoSave) {
            updateDocumentOnFirebase(documentIdSelected, eventValue)
        } 
    }

    const addNewDocumentOnFirebase = async () => {
        const newDocument = {
            entry: "here is a new document, create something",
            lastEdited: Date.now()
        }
        await addDoc(collection(props.db, `${props.userInfo.uid}`), newDocument);
        setCurrentEditorText(newDocument.entry)
        // props.reloadAllData()
        props.reloadAllData()
    }

    const deleteDocument = async (documentId) => {
        await deleteDoc(doc(props.db, `${props.userInfo.uid}`, `${documentId}`));
        setCurrentEditorText("")
        props.reloadAllData()
    }

    return (
        <main className="app">
            
            <div className="layout">
            <nav>
                <ul>
            {offlineData ?
                offlineData.map((document) => {
                    return (
                        <li 
                        className={(document.id === 'userSettings') ? "hidden" : "navItem"}
                        key={document.id}
                        onClick={() => selectDocumentAndSetCurrentEditorText(document.id, document.entry)}>
                        {document.entry ? document.entry : "okayyy"} 
                        <p>{document.lastEdited ? document.lastEdited : "no edit"} </p>
                        <button onClick={() => deleteDocument(document.id)}> X </button>
                        </li>
                    )
                }) : "unauthorizedData"
            }
                </ul>
                <button onClick={() => updateSettingsDocumentOnFirebase()}> 
                {autoSave ? "Autosave: ON" : "Autosave: OFF"}
                </button>
                <button onClick={() => addNewDocumentOnFirebase()}>Add new document</button>
            </nav>
                <div className="markdownEditorContainer">
                    <textarea
                    className="textarea"
                    value={currentEditorText}
                      onChange={(e) => handleTyping(e.target.value)} 
                    />
                    <ReactMarkdown 
                    children={currentEditorText}
                    className="markdown"
                    />
                </div>
            
            </div>
            </main>   
  )
}