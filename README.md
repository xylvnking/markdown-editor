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

<details>
<summary>Asynchronous programming requires special considerations, especially when relying on the data for core functionality</summary>
  <ul>
    <li>I first wrote the program as a client side only application, so didn't have to think much about asynchronous functions when passing the data around</li>
    <li>After deciding to introduce firebase I had to rewrite everything</li>
  </ul>
</details>

<details>
<summary>Reducing API calls to the backend requires creativity</summary>
  <ul>
    <li>I solved this by making a copy of the users data when the application loads, and then updating that every time a write is made to firebase. This works well for this portfolio project, but introduces a problem. If the user opens the project in multiple tabs, they don't stay in sync. The solution is to disable this 'local client user data copy' mode and just drive everything from firebase, but this increases reads by a degree which felt excessive, since the all the users documents would need to be read after every (debounced) write is made. I decided this trade off was good, and that in a real application this decision would be made according to monetization goals, which obviously don't exist for the application in its current state.</li>
  </ul>
</details>

<details>
<summary>Securing the backend is complicated, but thankfully easier with Firebase security rules</summary>
  <ul>
    <li>I solved this by making a copy of the users data when the application loads, and then updating that every time a write is made to firebase. This works well for this portfolio project, but introduces a problem. If the user opens the project in multiple tabs, they don't stay in sync. The solution is to disable this 'local client user data copy' mode and just drive everything from firebase, but this increases reads by a degree which felt excessive, since the all the users documents would need to be read after every (debounced) write is made. I decided this trade off was good, and that in a real application this decision would be made according to monetization goals, which obviously don't exist for the application in its current state.</li>
  </ul>
</details>

