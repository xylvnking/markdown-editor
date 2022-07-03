# Markdown Editor

[react-markdown](https://www.npmjs.com/package/react-markdown)
[react-syntax-highlighter styles](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/)
[react-scroll-sync](https://github.com/okonet/react-scroll-sync)
[bloom triangles post processing](https://codesandbox.io/s/jflps?file=/src/App.js)
[rotating cube r3f](https://codesandbox.io/s/github/onion2k/r3f-by-example/tree/develop/examples/hooks/rotating-cube?file=/src/index.js)
[I want this to apply to <Html>](https://github.com/pmndrs/react-postprocessing)
[html label stick to object but didn't use](https://codesandbox.io/s/github/onion2k/r3f-by-example/tree/develop/examples/other/html-labels?file=/src/index.js:259-363)


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


getting scroll position for window (didn't need because i neede it for element)
```js
 
const [scrollPosition, setScrollPosition] = React.useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
```