SP_APP.start = () => {
  const {audio} = SP_APP;

  function buildRefs() {
    const refEls = document.querySelectorAll('[data-ref]');
    SP_APP.refs = {};
    for (let refEl of refEls) {
      SP_APP.refs[refEl.dataset.ref] = refEl;
    }
  }

  buildRefs();

  audio.start();
};
