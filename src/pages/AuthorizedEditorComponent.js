import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../style.css'

export default function AuthorizedEditorComponent(props) {

// const [userData, setUserData] = React.useState(props.userData)
// console.log(props.userData)

    return (

        
        <div>
        {/* <h1 className="headerTitle">Collaborative Markdown Editor 🔥</h1> */}
        <div className="layout">

            <nav>
            <ul>
                <li>
                    this is where the list items will go
                </li>
            {/* {userData.map((document) => { // using a ternary to choose whether to map through data sourced from firebase or the "unauthorizedData" which is set on load and never written to firebase again
                return (
                <li 
                    // className={(post.id == docSelected) ? "selected" : "navItem"}
                    className="navItem"
                    key={document.id}
                    // onClick={() => setDocSelected(post.id)}
                    // onClick={() => switchDocumentSelected(post.id)}
                    >
                    {document.entry} 
                </li>
                )
            })} */}
            </ul>
            </nav>
            <div className="markdownEditorContainer">
                <textarea
                className="textarea"
                // value={"replace this with the current thing being edited"}
                //   onChange={(e) => setInput(e.target.value)} 
                />
                <ReactMarkdown 
                children={"replace this with the current thing being edited"}
                className="markdown"
                />
            </div>
        </div>
        </div>
    
  )
}
