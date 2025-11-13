**These project follows Generative Gestaltung book Chapter 2**


To run the project, first install dependencies:

1. `npm install`

To start TypeScript in watch mode for live compilation:

1. `npm run watch`

To start a local server and view your work in the browser:

1. `npm run dev`

By default, the project loads the sketch in `src/P_2_0/helloShape1.ts`.

---

To switch between different sketches (TypeScript files) in the `src` folder without stopping the server:

1. `npm run switch -- sub-folder/file-name.ts`

For example, to switch to `P_2_0/helloShape0.ts`:

```
npm run switch -- P_2_0/helloShape0.ts
```
*Note: When the project is switched, the previously selected project may show errors.  
This occurs because p5.js uses global functions (e.g., `setup()`, `draw()`), and having multiple files with these functions in the same compilation scope causes conflicts.  
The switch script ensures only one sketch is compiled at a time.*

After switching, the server will serve the new sketch on refresh.
  
---


