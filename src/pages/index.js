import * as React from "react"
import ReactMarkdown from 'react-markdown'
import '../style.css'

// import SyntaxHighlighter from 'react-syntax-highlighter';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {zenburn} from 'react-syntax-highlighter/dist/esm/styles/prism'

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
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={zenburn}
                language={match[1]}
                PreTag="div"
                showLineNumbers={true}
                wrapLines="true"
                wrapLongLines="true"
                //probly lots more I could do here
                {...props}
              />
              
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      />
    </main>
  )
}

export default IndexPage

