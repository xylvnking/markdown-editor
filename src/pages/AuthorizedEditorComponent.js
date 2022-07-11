import { doc, updateDoc, collection, getDocs } from 'firebase/firestore'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'

export default function AuthorizedEditorComponent(props) {

const unauthorizedData = "this would be an object of unauthorized data"
const [documentIdSelected, setDocumentIdSelected] = React.useState()
const [currentEditorText, setCurrentEditorText] = React.useState()

const selectDocumentAndSetCurrentEditorText = (postId, postEntry) => {
    setDocumentIdSelected(postId)
    setCurrentEditorText(postEntry)
}

const updateDocumentOnFirebase = async () => {
    if(documentIdSelected) {
        // update document
        await updateDoc(doc(props.db, props.userInfo.uid, documentIdSelected), {
            entry: currentEditorText
        })
        // reload data to update nav
        const currentCollection = collection(props.db, props.userInfo.uid)
        const data = await getDocs(currentCollection);
        props.reloadData(data.docs.map((doc) => ({
          ...doc.data(), id: doc.id 
        })))
    }
}



/*


it might be possible to take the useEffect from index which sets the data initially and put it here.
within that a function could be taken out which reloads the data, which it would call as would the update function
just have to remove props from some places, make sure everything loads in properly initially

otherwise,

- we need to decide upon and implement a way for individual documents to be in saved/unsaved state
- right now if you're editing one document then go to another, your edits are lost, which obviously isn't good
- creating state containing all the userData, then driving changes to those pieces of state with textarea onchange
    and then having a dedicated save button for each document which passes a "documentIdSelected " esque value
        into the updateDoc function would work. currently i think it would also reload all of the data so it might
            overwrite the other unsaved documents? unsure. problem for another day. almost 40 hours of work in 3 days lol
                we out here

                - but yeah holding everything in an "offline" state would allow the nav to be updated without making calls also
                - figure it out xox

*/





    return (
        <main className="app">
            {/* {`authorization status: ${(isAuthorized ? `signed in` : `logged out`)}`} */}
            {/* {userInfo ? <button onClick={signUserOut}>Sign Out</button> : <button onClick={signInWithGoogle}>Sign In with Google</button>} */}
            {/* {(userInfo && userData) ? <AuthorizedEditorComponent userInfo={userInfo} userData={userData}/> : ""} */}
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
