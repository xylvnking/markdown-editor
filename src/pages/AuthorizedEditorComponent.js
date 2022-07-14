import { doc, updateDoc, collection, getDocs, documentId, setDoc, addDoc, deleteDoc } from 'firebase/firestore'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'
import { HexColorPicker } from "react-colorful";


let filterTimeout
let colorSelectionTimeout
export default function AuthorizedEditorComponent(props) {


    // add ability to change background color of document - store it in firebase
        // would improve ux imo
            // maybe dont worry about it until we design though


    
    // make unauthorized version




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
            return {...obj, entry: eventValue, lastEdited: Date.now(), backgroundColor: tempColor}
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
                    lastEdited: Date.now(),
                    // lastEdited: Date()
                    backgroundColor: tempColor

                })
                setReloadTrigger(!reloadTrigger)
            }, 500)
            setCurrentEditorText(autoSave ? eventValue : currentEditorText )      
        }
    }




    React.useEffect(() => {
        if (documentIdSelected) {
            const handleColorChange = async () => {
                clearTimeout(colorSelectionTimeout)
                colorSelectionTimeout = setTimeout(() => {
                    
                    updateDoc(doc(props.db, props.userInfo.uid, documentIdSelected), {
                        backgroundColor:tempColor
                    })
                }, 500)
                
                
                const addColorToOfflineData = async (colorPicked) => {
                    let x = []
                    x = offlineData
                    // console.log(colorPicked)
                    x = x.map(obj => {
                        if (obj.id === documentIdSelected) {
                            console.log('doin thing')
                        return {...obj, backgroundColor: colorPicked}
                        }
                    })
                    // x.sort((a, b) => b.lastEdited - a.lastEdited)
                    // setOfflineData(x)
                    
                }
                addColorToOfflineData(tempColor)
            }
            handleColorChange()
        }
    }, [tempColor])



    const handleTyping = (eventValue) => {
        // setCurrentEditorText(eventValue) // this is also being done in updateDocumentOnFirebase()
        updateAndSortOfflineData(documentIdSelected, eventValue)
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
                        <div>

                            <li 
                            className={(document.id === 'userSettings') ? "hidden" : "navItem"}
                            key={document.id}
                            onClick={() => selectDocumentAndSetCurrentEditorText(document.id, document.entry)}
                            style={{backgroundColor: document.backgroundColor}}>
                            {document.entry ? document.entry : ""} 
                            <p>{document.lastEdited ? document.lastEdited : "no edit"} </p>
                            <button onClick={() => deleteDocument(document.id)}> X </button>
                            <HexColorPicker 
                                key={document.id}
                                color={document.backgroundColor}
                                onChange={setTempColor} // this syntax sets the value of the color picker to tempColor
                                
                                // onChange={(e) => console.log(color)}
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