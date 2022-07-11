import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'

export default function AuthorizedEditorComponent(props) {

// const [userData, setUserData] = React.useState(props.userData)
// console.log(props.userInfo)
// console.log(props.userData)
// console.log(props.entry)
const unauthorizedData = "this would be an object of unauthorized data"
const [documentIdSelected, setDocumentIdSelected] = React.useState()
const [currentEditorText, setCurrentEditorText] = React.useState()

const selectDocumentAndSetCurrentEditorText = (postId, postEntry) => {
    setDocumentIdSelected(postId)
    setCurrentEditorText(postEntry)
}


const updateDocumentOnFirebase = () => {
    if(documentIdSelected) {
        updateDoc(doc(props.db, props.userInfo.uid, documentIdSelected), {
            entry: currentEditorText
        })
    }
}



    return (
        <main className="app">
            {/* {`authorization status: ${(isAuthorized ? `signed in` : `logged out`)}`} */}
            {/* {userInfo ? <button onClick={signUserOut}>Sign Out</button> : <button onClick={signInWithGoogle}>Sign In with Google</button>} */}
            {/* {(userInfo && userData) ? <AuthorizedEditorComponent userInfo={userInfo} userData={userData}/> : ""} */}
            
            {
                // returnStuff()
            }
            <div>
            <div className="layout">
            <nav>
                <ul>

            {props.userData ?
                props.userData.map((post) => {
                return (
                    <li 
                    className={"navItem"}
                    key={post.id}
                    onClick={() => selectDocumentAndSetCurrentEditorText(post.id, post.entry)}
                    >
                    {post.entry ? post.entry : "THIS DOC IS MISSING ENTRY FIELD"} 
                    </li>
                )
                }) : unauthorizedData
            }
                </ul>
                <button onClick={() => updateDocumentOnFirebase()}>
                    save
                </button>
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
