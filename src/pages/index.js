import * as React from "react"
import ReactMarkdown from 'react-markdown'
import '../style.css'

const markdown = "Hello **world!**"



// markup
const IndexPage = () => {

  const [input, setInput] = React.useState();

  return (
    <main className="app">
      <textarea
      className="textarea"
      value={input}
      onChange={
        (e) => setInput(e.target.value)
      }/>
      
      <ReactMarkdown 
      children={input}
      className="textarea" />
    </main>
  )
}

export default IndexPage
