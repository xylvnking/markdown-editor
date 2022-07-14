import { doc, updateDoc, collection, getDocs, documentId, setDoc, addDoc, deleteDoc } from 'firebase/firestore'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'
import { HexColorPicker } from "react-colorful";


let filterTimeout
let colorSelectionTimeout
export default function AuthorizedEditorComponent(props) {

    // unauthorized mode
    // security rules
    // refactor and write notes about what we've learned

    const [documentIdSelected, setDocumentIdSelected] = React.useState()
    const [currentEditorText, setCurrentEditorText] = React.useState()
    const [offlineData, setOfflineData] = React.useState(props.userData)
    const [autoSave, setAutoSave] = React.useState()
    const [reloadTrigger, setReloadTrigger] = React.useState(true) 
    const [tempColor, setTempColor] = React.useState("")

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

    // handle list item clicked
    const selectDocumentAndSetCurrentEditorText = (documentId, documentEntry) => {
        setDocumentIdSelected(documentId)
        setCurrentEditorText(documentEntry)
        // updates the background color on firebase and offlineData
        if (documentIdSelected) {
            const handleColorChange = async () => {
                clearTimeout(colorSelectionTimeout)
                colorSelectionTimeout = setTimeout(() => {
                    updateDoc(doc(props.db, props.userInfo.uid, documentIdSelected), {
                        backgroundColor:tempColor
                    })
                }, 500)
                // maybe just make this update and not sort
                // so that changing the color doesn't put it to the top of the list
                // updateAndSortOfflineData(documentId, documentEntry, tempColor)
                updateOfflineData(documentId, documentEntry, tempColor, false)
            }
            handleColorChange()
        }
    }

    // 
    const updateOfflineData = (documentId, eventValue, colorPicked, shouldSort) => {
        
        let x = []
        x = offlineData
        x = x.map(obj => {
            if (obj.id === documentId) {
                if (colorPicked) {
                    return {...obj, entry: eventValue, lastEdited: Date.now(), backgroundColor: colorPicked}
                } else {
                    return {...obj, entry: eventValue, lastEdited: Date.now()}
                }
            }
            return obj
        })
        if (shouldSort) {
            x.sort((a, b) => b.lastEdited - a.lastEdited)
        }
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
                    lastEdited: Date.now(),
                    // lastEdited: Date()
                    // backgroundColor: tempColor

                })
                setReloadTrigger(!reloadTrigger)
            }, 500)
            setCurrentEditorText(autoSave ? eventValue : currentEditorText )      
        }
    }

    const handleTyping = (eventValue) => {
        // setCurrentEditorText(eventValue) // this is also being done in updateDocumentOnFirebase()
        updateOfflineData(documentIdSelected, eventValue, null, true)
        if (autoSave) {
            updateDocumentOnFirebase(documentIdSelected, eventValue)
        } 
    }

    const addNewDocumentOnFirebase = async () => {
        const newDocument = {
            entry: "here is a new document, create something",
            lastEdited: Date.now(),
            backgroundColor: '#000000'
        }
        await addDoc(collection(props.db, `${props.userInfo.uid}`), newDocument);
        setCurrentEditorText(newDocument.entry)
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
                        <div>

                            <li 
                            className={(document.id === 'userSettings') ? "hidden" : "navItem"}
                            key={document.id}
                            onClick={() => selectDocumentAndSetCurrentEditorText(document.id, document.entry, document.backgroundColor)}
                            style={{backgroundColor: document.backgroundColor}}>
                            {document.entry ? document.entry : ""} 
                            <p>{document.lastEdited ? document.lastEdited : "no edit"} </p>
                            <button onClick={() => deleteDocument(document.id)}> X </button>
                            <HexColorPicker 
                                key={document.id}
                                color={document.backgroundColor}
                                onChange={setTempColor} // this syntax sets the value of the color picker to tempColor
                            />
                            </li>
                        </div>
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
                    {
                        documentIdSelected ?
                    <textarea
                        className="textarea"
                        value={currentEditorText}
                        onChange={(e) => handleTyping(e.target.value)} 
                    />
                        : ""
                    }
                    <ReactMarkdown 
                    children={currentEditorText}
                    className="markdown"
                    />
                </div>
            
            </div>
            </main>   
  )
}