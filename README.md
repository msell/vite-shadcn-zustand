# Fold Frontend Challenge

While the instructions did specify to use create-react-app, CRA [has been deprecated](https://github.com/facebook/create-react-app?tab=readme-ov-file#deprecated) and is no longer a recommended way to bootstrap a new react app. I did however briefly attempt to use CRA since that was in the instructions but I quickly ran into issues even the initial `npx create-react-app` command had errors and failed to succeed. This may have been exlusive to the `--typescript` template I'm not certain. There are more details of other users facing this [same issue](https://github.com/facebook/create-react-app/issues/13717) when using CRA today.

Instead of trying to fix issues with a deprecated CRA app I decided to use Vite instead. This frontend challenge was initialized with the following command instead:

`npm create vite@latest fold-frontend-challenge -- --template react-ts`

---

In a real world repository I would reccomend using [Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage) instead of committing binary files such as the image assets included in this sample project.

Since we don't need to spend a lot of time thinking about styling for this work sample I made the decsion to use TailwindCSS with [shadcn](https://ui.shadcn.com/) so we could have have a nice modern look and feel without spending too much time re-styling components.

## State Management

For a simple app like this, useReducer with context would have been a viable option, but I chose Zustand for its simplicity and performance. I hadn’t worked with Zustand before, so I saw this coding challenge as an opportunity to explore it. I particularly liked its built-in persistence, which allows the cart state to survive refreshes without additional setup. While we could achieve the same effect by manually reading and writing to localStorage, having persistence baked in made it more convenient. I also integrated Zustand’s devtools support, enabling me to inspect state changes using Redux DevTools.

## Testing

I did write some unit tests just around the zustand store which is the meat of the application logic.

## Further design considerations

- Right now we don't have very many products coming back from our API - but if we are going to have lots of products we will want to implement pagination or infinite scroll along with some ability to search/filter products. The API will need to support pagination.

- If the product owner thought it would be valuable I would move all of the copy into resource files and implement i18n so that we could support multiple languages.
