An experiment: is it possible to work out the note being played on a piano with the Web Audio API?


1. `git clone https://github.com/davidgilbertson/sight-reader`
2. `npm install`
3. `npm build`
4. `node index`
5. `http://localhost:8080`

To run in dev mode, run `npm run dev`.

The result. No, it's not really possible.
It gets the note right 80% of the time if it's loud, but often jumps about as the note trails off.

It gets three of the four samples when played directly into the `audioContext` but only the two middles ones
when played out the through the speakers, in through a mic and captured with `navigator.getUserMedia`

## Weird build
Also, this is an experiment in packaging without packaging. It's dumb, but...

- Each file is an IIFE that puts its constants/class on a global object called `SP_APP`, 
  that's the equivalent of 'exporting' the module
- Classes are then accessed off this object like `const {Piano} = SP_APP` - the equivalent
  to `import Piano from './Piano'`.
- There is no actual importing/exporting, so the site is 'built' by just concatenating all files.
- So when `main.js` lands in the browser and is parsed, the `SP_APP` object gets populated with
  constants and classes and utils and whatever else.
- Because there's no importing, it means no npm packages allowed.
- In the HTML file, `window.SP_APP = {}` is created, 
  then the single script is loaded/executed, then `SP_APP.start()` is called,
  so I know that all classes are defined and ready to go before I start executing any code
   (e.g. I can instantiate one class in the constructor of another class because that will have been 
   created and added to `SP_APP` at that point)