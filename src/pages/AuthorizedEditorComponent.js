import { doc, updateDoc, collection, getDocs, documentId, setDoc, addDoc, deleteDoc } from 'firebase/firestore'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'
import { HexColorPicker } from "react-colorful";
// import SyntaxHighlighter from 'react-syntax-highlighter';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {zenburn, nightOwl} from 'react-syntax-highlighter/dist/esm/styles/prism'


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
    const [documentSettingsOpen, setDocumentSettingsOpen] = React.useState(false)



    

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
        console.log("selectDocumentAndSetCurrentEditorText")
        console.log("this should not be called")
        setDocumentIdSelected(documentId)
        setCurrentEditorText(documentEntry)
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


    // update single document on firebase when typing
    const updateDocumentOnFirebase = async (documentId, eventValue) => {

        // updating doc with new entry
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
        setDocumentIdSelected("")
        setCurrentEditorText("")

        await deleteDoc(doc(props.db, `${props.userInfo.uid}`, `${documentId}`));
        props.reloadAllData()
    }

    return (
        <main className="app">
            <section className='buttonsTop'>
                <div>

                    <button 
                    onClick={() => addNewDocumentOnFirebase()}
                    className="button6">Add new document</button>
                    {documentIdSelected
                    ?
                    <button onClick={() => deleteDocument(documentIdSelected)}
                    className="button6"> Delete current document</button>
                    :
                    ""
                    }
                </div>

                <div>
                    {/* <button onClick={() => updateSettingsDocumentOnFirebase()}
                            className="button6"> 
                        {autoSave ? "Autosave: ON" : "Autosave: OFF"}
                    </button> */}
                    <button onClick={props.signOut}
                            className="button6"
                            style={{color: 'grey'}}
                            >Sign Out</button>
                </div>

            </section>
            <div className="layout">
            <nav>
                <ul>
            {offlineData ?
                offlineData.map((document) => {
                    return (
                        <li 
                        className={(document.id === 'userSettings') ? "hidden" : "navItem"}
                        key={document.id}
                        onClick={() => selectDocumentAndSetCurrentEditorText(document.id, document.entry, document.backgroundColor)}
                        // style={{backgroundColor: document.backgroundColor}}>
                        style={{borderRightColor: document.backgroundColor}}>
                            <p className='navItemEntry'>{document.entry ? document.entry : ""} </p>
                            
                        {/* <p>{document.lastEdited ? document.lastEdited : "no edit"} </p> */}

                            
                        {/* <button onClick={() => deleteDocument(documentIdSelected)}> Delete </button> */}
                        </li>
                    )
                }) : "unauthorizedData"
            }
                </ul>
                
            </nav>
                    {
                        documentIdSelected ?
                    <textarea
                        className="textarea"
                        value={currentEditorText}
                        onChange={(e) => handleTyping(e.target.value)} 
                    />
                        : ""
                    }
                    {/* <ReactMarkdown 
                    children={currentEditorText}
                    className="markdown"
                    /> */}

                   <ReactMarkdown
                        children={currentEditorText}
                        className="markdown"
                        components={{
                        code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={nightOwl}
                                language={match[1]}
                                PreTag="div"
                                showLineNumbers={true}
                                // wrapLines="true"
                                // wrapLongLines="true"
                                //probly lots more I could do here
                                {...props}
                            />
                            
                            ) : (
                            <code className="markdown" {...props}>
                                {children}
                            </code>
                            )
                        }
                        }}
                    /> 
            
            </div>
            </main>   
  )
}
