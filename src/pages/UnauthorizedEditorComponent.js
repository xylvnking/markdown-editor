import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { stringify } from '@firebase/util'



const dataLoad = [
    {
        entry: `# thanks for checking out my portfolio project!\n\n### This is the unauthorized version of the project\n\nIt is fully functional, but doesn't make any calls to or from firebase unless you sign in with Google, so any changes made here will not persist if the page is reloaded.\n \n If you sign in, you have full CRUD functionality with the data being stored in a Google Firestore backend.`,
        lastEdited: 1658756930912,
        id: 'DGTQsw2dKlWO9kVbBGtp'
    },
    {
        entry: `# check out code syntax highlighting!\n\n> javascript\n\n\`\`\`js\n// uncle bob says no comments!\n\nlet counter = 0\nconst functionName = () => {\n     counter++\n}\n\`\`\`\n\n> css\n\n\`\`\`css\n.markdown {\n     padding: 25px;\n     margin: 5px;\n}\n\`\`\``,
        lastEdited: 1658756930000,
        id: '3hzhFF3qN7e6TSOO0r0Z'
    }
]

let unauthorizedDocumentCounter = 1

export default function AuthorizedEditorComponent(props) {

    const [documentIdSelected, setDocumentIdSelected] = React.useState('DGTQsw2dKlWO9kVbBGtp')
    const [currentEditorText, setCurrentEditorText] = React.useState(dataLoad[0].entry)
    const [documentsListShowing, setDocumentsListShowing] = React.useState(true)
    const [unauthorizedData, setUnauthorizedData] = React.useState()

    React.useEffect(() => {
        setUnauthorizedData(dataLoad)
        // setCurrentEditorText(dataLoad[1].entry)

    }, [])

    const selectDocumentAndSetCurrentEditorText = (documentId, documentEntry) => {
        setDocumentIdSelected(documentId)
        setCurrentEditorText(documentEntry)
    }
    
    const updateOfflineData = (documentId, eventValue, shouldSort) => {
        let x = []
        x = unauthorizedData
        x = x.map(obj => {
            if (obj.id === documentId) {
                
                    return {...obj, entry: eventValue, lastEdited: Date.now()}
            }
            return obj
        })
        if (shouldSort) {
            x.sort((a, b) => b.lastEdited - a.lastEdited)
        }
        setUnauthorizedData(x)
        setCurrentEditorText(eventValue)
    }

    const addNewDocument = () => {
        let defaultEntry = "yer"
        const newDocument = {
            entry: defaultEntry,
            lastEdited: Date.now(),
            id: unauthorizedDocumentCounter
        }
        let x = []
        x = unauthorizedData
        x.unshift(newDocument)
        setUnauthorizedData(x)
        setDocumentIdSelected(unauthorizedDocumentCounter)
        setCurrentEditorText(defaultEntry)
        unauthorizedDocumentCounter++;
    }

    const deleteDocument = async () => {
        setDocumentIdSelected("")
        setCurrentEditorText("")
        const indexOfSelectedDocument = unauthorizedData.findIndex((document => document.id == documentIdSelected));
        console.log(indexOfSelectedDocument)
        unauthorizedData.splice(indexOfSelectedDocument, 1)
    }

    return (
        <main className="app">
            <section className='buttonsTop'>
                <div>
                    
                    <button 
                    onClick={() => addNewDocument()}
                    className="button6">Add</button>
                    {documentIdSelected
                    ?
                    <button onClick={() => deleteDocument(documentIdSelected)}
                    className="button6"
                    
                    > Delete</button>
                    :
                    ""
                    }
                </div>
                <div>
                    {/* <button onClick={() => updateSettingsDocumentOnFirebase()}
                            className="button6"> 
                        {autoSave ? "Autosave: ON" : "Autosave: OFF"}
                    </button> */}
                    <button 
                        onClick={props.signOut}
                        className="button6"
                        style={{color: 'grey'}}
                        >Sign Out
                    </button>
                    <h1
                        className='button6 mobileHamburger'
                        onClick={() => setDocumentsListShowing(!documentsListShowing)}>
                        ☰
                    </h1>
                </div>
            </section>
            <div className="layout">
                <nav>
                        
                    <ul
                        className={(documentsListShowing) ? "" : "hidden"}>
                            {unauthorizedData &&
                                unauthorizedData.map((document) => {
                                    return (
                                        <li 
                                            className={(document.id === 'userSettings') ? "hidden" : "navItem"}
                                            key={document.id}
                                            onClick={() => selectDocumentAndSetCurrentEditorText(document.id, document.entry, document.backgroundColor)}
                                            style={{borderRightColor: document.backgroundColor}}>
                                            <p 
                                                className='navItemEntry'>
                                                    {document.entry ? document.entry : ""} 
                                            </p>
                                        </li>
                                    )
                                }) 
                            }
                    </ul>
                    
                </nav>
                    {
                        documentIdSelected ?
                        <textarea
                            className="textarea"
                            value={currentEditorText}
                            // onChange={(e) => handleTyping(e.target.value)} 
                            onChange={(e) => updateOfflineData(documentIdSelected, (e.target.value), true)} 
                            
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
