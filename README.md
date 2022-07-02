# Markdown Editor

[react-markdown](https://www.npmjs.com/package/react-markdown)


```shell
# Markdown editor hellow world

import * as React from "react"
import ReactMarkdown from 'react-markdown'

const markdown = "Hello **world!**"

// markup
const IndexPage = () => {
  return (
    <ReactMarkdown children={markdown} />
  )
}

export default IndexPage
```

#misc

```shell
# this is required to remove the margin/padding from gatsby sites, I guess?
html, 
body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
```

