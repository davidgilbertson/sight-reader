(function() {
  class RefManager {
    getRefs() {
      const refEls = document.querySelectorAll('[data-ref]');
      SP_APP.refs = {};
      for (let refEl of refEls) {
        const ref = refEl.getAttribute('data-ref'); // dataset doesn't work on <svg>
        SP_APP.refs[ref] = refEl;
      }
    }
  }

  SP_APP.RefManager = RefManager;
})();
