import * as React from "react"
import ReactMarkdown from 'react-markdown'

const markdown = "a random string to **test the markdown**"

// markup
const IndexPage = () => {
  return (
    <ReactMarkdown children={markdown} />
  )
}

export default IndexPage
