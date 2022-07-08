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


# learned:

I was trying to load data from a firestore document into state (input) whenever the page loaded, but was also using the same state to drive the value of what was being used to update the value. This caused the issue where the updateDoc() function required a defined value, but I couldn't provide a default for the input state or else it would over write. I solved this simply by adding an if (input) logic check so that it wouldn't update the doc unless input was defined. The solution was simple but I was doing some net level stuff trying to use all these async functions and depenedancy arrays with triggers and it was a mess. The solution is very elegant if i do say so myself.

```js
const docDefault = doc(db, "Collection1", "document1")

    const [input, setInput] = React.useState();

    React.useEffect(() => {
      const waitForDoc = async () => {
        const docSnap = await getDoc(docDefault)
        const dataTemp = docSnap.data()
        setInput(dataTemp.entry)
      }
      waitForDoc()
    }, [])

    const updatePost = async () => {
      const document1Reference = doc(db, "Collection1", "document1")
      if (input) { 
        await updateDoc(document1Reference, {
          entry: input
        })
      }
    }
    React.useEffect(() => {
      updatePost()
    }, [input])
```

```js
  // prettify object data when logging it to the console:
  console.log(JSON.stringify(YOUR_OBJECT_HERE, null, 2))
```

```js
  /*
  I was using the index of the current document which was selected in multiple places
  Each time I'd needed it, I'd find it right before I needed it, meaning I was repeating code a lot
  At first I tried solving this with a useEffect and useState which would happen with almost every action on the page
  This was the wrong approach because I didn't need to hold the value in state, I just needed to know what it currently is. I only needed to read the index, not write it.
  I was overcomplicating the situation. I already had a function that got the index whenever I needed it, so all I had to do was write that as a normal function, not a useEffect
  When the only tool you've got is a hammer every problem looks like a nail
  */
  const getIndex = () => {
    const documentIndexBeingEdited = unauthorizedData.findIndex(x => {
      return x.id === docSelected
    })
    return documentIndexBeingEdited
  }

  const [docIndexEditing, setDocIndexEditing] = React.useState()
  React.useEffect(() => {
    const documentIndexBeingEdited = unauthorizedData.findIndex(x => {
      return x.id === docSelected
    })
    setDocIndexEditing(documentIndexBeingEdited) 
  },[input, collectionSelection, unauthorizedData])
```