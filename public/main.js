'use strict';

SP_APP.audio = {
    start: function start() {
        var _SP_APP = SP_APP;
        var refs = _SP_APP.refs;

        console.log('  --  >  audio.js:3 > start');

        var audioContext = new window.AudioContext();
        var audioSource = audioContext.createMediaElementSource(refs.audio);

        var analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);

        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        var canvasContext = refs.canvas.getContext('2d');

        canvasContext.fillStyle = 'firebrick';
        canvasContext.fillRect(10, 10, 50, 50);

        function drawWave() {
            analyser.getByteTimeDomainData(dataArray);

            dataArray.forEach(function (item, i) {
                canvasContext.fillRect(i, item, 1, 4);
            });
        }

        function drawFreq() {
            analyser.getByteFrequencyData(dataArray);

            dataArray.forEach(function (item, i) {
                canvasContext.fillRect(i, 500 - item, 1, item);
            });
        }

        function renderAudio() {
            requestAnimationFrame(renderAudio);
            if (refs.audio.paused) return;

            canvasContext.clearRect(0, 0, 1000, 500);

            drawFreq();
            drawWave();
        }

        renderAudio();

        audioSource.connect(audioContext.destination); // out to the speakers

        refs.audio.play();

        window.addEventListener('keydown', function (e) {
            if (e.keyCode === 32) {
                // space
                refs.audio.paused ? refs.audio.play() : refs.audio.pause();
            }
        });
    }
};
'use strict';

SP_APP.printNotes = function () {
  var notes = ['a', 'b', 'c'];

  notes.forEach(function (note) {
    console.log('note');
  });
};
'use strict';

SP_APP.start = function () {
  var _SP_APP = SP_APP;
  var audio = _SP_APP.audio;


  function buildRefs() {
    var refEls = document.querySelectorAll('[data-ref]');
    SP_APP.refs = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = refEls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var refEl = _step.value;

        SP_APP.refs[refEl.dataset.ref] = refEl;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  buildRefs();

  audio.start();
};
