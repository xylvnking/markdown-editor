# Markdown Editor with Firebase Backend (CRUD & authentication) 

React | Firebase | unifiedjs | PrismJS | Gatsby

[Visit the live site](www.thiswillbearealwebsite.com)

**note:** *the app works without signing in, but authentication is required to save data on refresh*

![](/src/images/screenshot1.png)

# About

I've learned other subjects online, and knew to avoid tutorial hell. I knew every other developer was making a notes app, so I decided to take that classic a few steps further while also not using any tutorials.

I was delighted to find that I didn't have to create my own markdown parser and instead opted to implement unified's. I finished that in an afternoon and felt like I cheated so I decided to add a backend for the first time. I chose firebase because I knew it would be great for a small project like this and figured Google would have excellent documentation.

It took me rewriting the application a few times to get it right but I'm really happy with where it ended up, especially with my solution for reducing api read calls, which is detailed in the next section.

I originally had a bunch of three.js graphics going, but it felt goofy to introduce that much of a performance hit to what should be such a lightweight app so I got rid of it. When you know the three.js hammer, it's difficult to not look at every application like a three.js nail.

# Learned how to:

- Write asynchronous functions 
- Make queries to a backend database using an SDK
- Authenticate users but provide an unauthorized mode for recruiters/hiring managers
- Manage a complex state driven dynamic ui
- Reduce API calls using debouncing and copying the users data client side on-load which is updated whenever firebase is written to so that reads can be made locally (this means that opening the application in multiple tabs isn't possible, but for this projects scope the tradeoff felt reasonable.)
- Monitor network activity to made sure no loops cause extraneous API calls, especially when using useEffect
- Used firebase security rules to prevent users from crud-ing anybody else's data
- Keep a form's values and pieces of state in sync

# Next steps:

- The UI is too minimal and not slick enough, but I want to move on to a more advanced project and won't be including this one after I'm done that anyways. I had originally used three.js with a nice fancy ui but it was overkill and performance intensive

- Learn about security rules for more advanced applications. Learning how to use firebase to make applications which are public facing but don't require authentication, allowing multiple users to securely access the same data, and also using the realtime database are important for me to learn next. This app is secure, but if I was required to add a ton of more functionality like that I'd need to first focus on security.

- Mobile-first. The app is responsive, but I could do more to make it 'feel like an app'. The scope of this project was purely to create the editor/crud functionality, so I'm comfortable with it not looking beautiful