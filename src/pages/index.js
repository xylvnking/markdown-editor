import * as React from "react"
import ReactMarkdown from 'react-markdown'
import '../style.css'

// import SyntaxHighlighter from 'react-syntax-highlighter';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const markdown = `Here is some JavaScript code:

~~~js
console.log('It works!')
~~~
`

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
      className="markdown"
      renderers={{
        code: Component
      }} />
    </main>
  )
}

export default IndexPage

const Component = ({value}) => {
  
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {value}
    </SyntaxHighlighter>
  );
};
