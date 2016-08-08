SP_APP.start = () => {
  const {Audio, Piano} = SP_APP;

  // build refs object
  const refEls = document.querySelectorAll('[data-ref]');
  SP_APP.refs = {};
  for (let refEl of refEls) {
    const ref = refEl.getAttribute('data-ref'); // dataset doesn't work on <svg>
    SP_APP.refs[ref] = refEl;
  }


  const piano = new Piano();
  piano.render();

  // build the refs after rendering the piano
  SP_APP.refManager = new SP_APP.RefManager();
  SP_APP.refManager.getRefs();

  const audio = new Audio();
  audio.start();
};
