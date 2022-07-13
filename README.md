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

# firebase security rules

[good article with some example rules - needed tweaking to get working but overall helpful](https://medium.com/@juliomacr/10-firebase-realtime-database-rule-templates-d4894a118a98)


# learned

most if not all firebase functions have to be done async

```js
  const signUserOut = async () => {
      await signOut(auth).then(() => { // this would fail to sign the user out unless await is specified
        setIsAuthorized(false)
      })
    }
```
keeping user signed in on refresh
```js
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
});
```

you cannot .listCollections() client side with firebase. this is inconvenient.
i'd have to do server side programming which is beyond the scope of this project.
[Get Firstore documents in nested collections](https://cloud.google.com/firestore/docs/samples/firestore-data-get-sub-collections)


# [updating an array of objects held in state](https://bobbyhadz.com/blog/react-update-state-array-of-objects)
```js
  const updateObjectInArray = (documentId, currentEditorText, eventValue) => {
      setOfflineData(current =>
        current.map(obj => {
          if (obj.id === documentId) {
            return {...obj, entry: eventValue};
          }

          return obj;
        }),
      );
    };
```

```js
// get index within states array of object currently being edited ::
const objIndex = offlineData.findIndex((document => document.id == documentId));
```

```js
  // using (e) => somefunction(e.target.value) 
  // allows us to get the current value of the textarea
  // and not just the last character typed, which I found interesting at the time
  <textarea
    value={currentEditorText}
    onChange={(e) => setCurrentEditorText(e.target.value)} 
  />
```

```js
// to use timeout it has to contain a promise. it wouldn't work if the function within it was console.log() instead of updateDoc, which is async and returns a promise.
// the 'filterTimeout' also has to be defined outside of the "main" function or else it gets reset every rerender and causes the timeout to just not work, meaning the api call is made on every key stroke instead of after the stated delay
let filterTimeout
export default function AuthorizedEditorComponent(props) {
  const updateDocumentOnFirebase = async (documentId, eventValue) => {
      if(documentIdSelected === documentId) {
          clearTimeout(filterTimeout)
          filterTimeout = setTimeout(() => {
              updateDoc(doc(props.db, props.userInfo.uid, documentIdSelected), {
                  entry: eventValue
              })
          }, 1000)
             
      }
  }
  return(
    //etc
  )
}
```

hi again again

```js
// sorting an array of objects coming from firebase and going into state within a subcomponent
// sorting mutates the original array so in order to sort the document from firebase according to their data I had
// to make a copy of the data i got from firebase temporarily, sort that, and then assign that sorted data to the 'offlineData'
// array which is then used throughout the component

// index.js
const currentCollection = collection(db, userInfo.uid)
        const data = await getDocs(currentCollection);
        setUserData(data.docs.map((doc) => ({
          ...doc.data(), id: doc.id 
        })))

// AuthorizedEditorComponent.js
React.useEffect(() => {
    let x = []
    x = props.userData
    if (x) {
        x.sort((a, b) => b.lastEdited - a.lastEdited)
    }
    setOfflineData(x)
}, [props.userData])
```