'use strict';

SP_APP.audio = {
  drawPitchMarkers: function drawPitchMarkers(canvas2Context) {
    canvas2Context.fillStyle = 'firebrick';
    canvas2Context.font = '14px serif';
    for (var i = 25; i < 1200; i += 25) {
      var pos = i / 2;
      canvas2Context.fillRect(70, pos, 4, 1);
      canvas2Context.fillText(i.toString(), 75, pos + 5);
    }
  },
  setupAudioContext: function setupAudioContext(audioEl) {
    var audioContext = new window.AudioContext();
    var audioSource = audioContext.createMediaElementSource(audioEl);
    var analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    audioSource.connect(audioContext.destination); // out to the speakers

    return { audioContext: audioContext, audioSource: audioSource, analyser: analyser };
  },
  start: function start() {
    var _SP_APP = SP_APP;
    var refs = _SP_APP.refs;


    var keys = [{ key: 1, hz: 27.5, name: 'A0 Double Pedal A' }, { key: 2, hz: 29.1352, name: 'A♯0/B♭0' }, { key: 3, hz: 30.8677, name: 'B0' }, { key: 4, hz: 32.7032, name: 'C1 Pedal C' }, { key: 5, hz: 34.6478, name: 'C♯1/D♭1' }, { key: 6, hz: 36.7081, name: 'D1' }, { key: 7, hz: 38.8909, name: 'D♯1/E♭1' }, { key: 8, hz: 41.2034, name: 'E1' }, { key: 9, hz: 43.6535, name: 'F1' }, { key: 10, hz: 46.2493, name: 'F♯1/G♭1' }, { key: 11, hz: 48.9994, name: 'G1' }, { key: 12, hz: 51.9131, name: 'G♯1/A♭1' }, { key: 13, hz: 55, name: 'A1' }, { key: 14, hz: 58.2705, name: 'A♯1/B♭1' }, { key: 15, hz: 61.7354, name: 'B1' }, { key: 16, hz: 65.4064, name: 'C2 Deep C' }, { key: 17, hz: 69.2957, name: 'C♯2/D♭2' }, { key: 18, hz: 73.4162, name: 'D2' }, { key: 19, hz: 77.7817, name: 'D♯2/E♭2' }, { key: 20, hz: 82.4069, name: 'E2' }, { key: 21, hz: 87.3071, name: 'F2' }, { key: 22, hz: 92.4986, name: 'F♯2/G♭2' }, { key: 23, hz: 97.9989, name: 'G2' }, { key: 24, hz: 103.826, name: 'G♯2/A♭2' }, { key: 25, hz: 110, name: 'A2' }, { key: 26, hz: 116.541, name: 'A♯2/B♭2' }, { key: 27, hz: 123.471, name: 'B2' }, { key: 28, hz: 130.813, name: 'C3' }, { key: 29, hz: 138.591, name: 'C♯3/D♭3' }, { key: 30, hz: 146.832, name: 'D3' }, { key: 31, hz: 155.563, name: 'D♯3/E♭3' }, { key: 32, hz: 164.814, name: 'E3' }, { key: 33, hz: 174.614, name: 'F3' }, { key: 34, hz: 184.997, name: 'F♯3/G♭3' }, { key: 35, hz: 195.998, name: 'G3' }, { key: 36, hz: 207.652, name: 'G♯3/A♭3' }, { key: 37, hz: 220, name: 'A3' }, { key: 38, hz: 233.082, name: 'A♯3/B♭3' }, { key: 39, hz: 246.942, name: 'B3' }, { key: 40, hz: 261.626, name: 'C4 Middle C' }, { key: 41, hz: 277.183, name: 'C♯4/D♭4' }, { key: 42, hz: 293.665, name: 'D4' }, { key: 43, hz: 311.127, name: 'D♯4/E♭4' }, { key: 44, hz: 329.628, name: 'E4' }, { key: 45, hz: 349.228, name: 'F4' }, { key: 46, hz: 369.994, name: 'F♯4/G♭4' }, { key: 47, hz: 391.995, name: 'G4' }, { key: 48, hz: 415.305, name: 'G♯4/A♭4' }, { key: 49, hz: 440, name: 'A4 A440' }, { key: 50, hz: 466.164, name: 'A♯4/B♭4' }, { key: 51, hz: 493.883, name: 'B4' }, { key: 52, hz: 523.251, name: 'C5 Tenor C' }, { key: 53, hz: 554.365, name: 'C♯5/D♭5' }, { key: 54, hz: 587.33, name: 'D5' }, { key: 55, hz: 622.254, name: 'D♯5/E♭5' }, { key: 56, hz: 659.255, name: 'E5' }, { key: 57, hz: 698.456, name: 'F5' }, { key: 58, hz: 739.989, name: 'F♯5/G♭5' }, { key: 59, hz: 783.991, name: 'G5' }, { key: 60, hz: 830.609, name: 'G♯5/A♭5' }, { key: 61, hz: 880, name: 'A5' }, { key: 62, hz: 932.328, name: 'A♯5/B♭5' }, { key: 63, hz: 987.767, name: 'B5' }, { key: 64, hz: 1046.5, name: 'C6 Soprano C(High C)' }, { key: 65, hz: 1108.73, name: 'C♯6/D♭6' }, { key: 66, hz: 1174.66, name: 'D6' }, { key: 67, hz: 1244.51, name: 'D♯6/E♭6' }, { key: 68, hz: 1318.51, name: 'E6' }, { key: 69, hz: 1396.91, name: 'F6' }, { key: 70, hz: 1479.98, name: 'F♯6/G♭6' }, { key: 71, hz: 1567.98, name: 'G6' }, { key: 72, hz: 1661.22, name: 'G♯6/A♭6' }, { key: 73, hz: 1760, name: 'A6' }, { key: 74, hz: 1864.66, name: 'A♯6/B♭6' }, { key: 75, hz: 1975.53, name: 'B6' }, { key: 76, hz: 2093, name: 'C7 Double high C' }, { key: 77, hz: 2217.46, name: 'C♯7/D♭7' }, { key: 78, hz: 2349.32, name: 'D7' }, { key: 79, hz: 2489.02, name: 'D♯7/E♭7' }, { key: 80, hz: 2637.02, name: 'E7' }, { key: 81, hz: 2793.83, name: 'F7' }, { key: 82, hz: 2959.96, name: 'F♯7/G♭7' }, { key: 83, hz: 3135.96, name: 'G7' }, { key: 84, hz: 3322.44, name: 'G♯7/A♭7' }, { key: 85, hz: 3520, name: 'A7' }, { key: 86, hz: 3729.31, name: 'A♯7/B♭7' }, { key: 87, hz: 3951.07, name: 'B7' }, { key: 88, hz: 4186.01, name: 'C8 Eighth octave' }];

    var ref = document.location.pathname.replace(/^\//, '');
    var audioEl = refs[ref] || document.querySelector('audio');

    var _setupAudioContext = this.setupAudioContext(audioEl);

    var audioContext = _setupAudioContext.audioContext;
    var analyser = _setupAudioContext.analyser;
    var sampleRate = audioContext.sampleRate;


    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var canvasContext = refs.canvas.getContext('2d');
    var canvas2Context = refs.canvas2.getContext('2d');
    this.drawPitchMarkers(canvas2Context);
    canvas2Context.fillStyle = 'rgba(0, 0, 0, 0.03)';

    canvasContext.fillStyle = 'firebrick';

    var pitchSamples = {
      samples: [],
      push: function push(item) {
        this.samples.push(item);
      },

      get avg() {
        return this.samples.reduce(function (result, time) {
          return result += time;
        }, 0) / this.samples.length;
      },
      get median() {
        if (!this.samples.length) return 0;
        var midPoint = Math.floor(this.samples.length / 2);
        return this.samples[midPoint];
      },
      get mode() {
        if (!this.samples.length) return 0;
        var counts = {};
        var mode = null;
        var max = 0;

        this.samples.forEach(function (item) {
          var value = Math.round(item * 10) / 10;
          counts[value] = (counts[value] || 0) + 1;
          if (counts[value] > max) {
            max = counts[value];
            mode = value;
          }
        });

        return mode;
      },
      getKey: function getKey() {
        var pitch = this.mode;
        var closestLower = keys[0];
        var closestHigher = keys[keys.length - 1];

        for (var i = 0; i < keys.length; i++) {
          if (keys[i].hz < pitch) closestLower = keys[i];
          if (keys[i].hz > pitch) {
            closestHigher = keys[i];
            break; // going from low to high so we can stop here
          }
        }

        var distanceToLower = Math.abs(pitch - closestLower.hz);
        var distanceToHigher = Math.abs(pitch - closestHigher.hz);

        var distanceToMatch = Math.min(distanceToLower, distanceToHigher);
        var closestKey = distanceToMatch === distanceToLower ? closestLower : closestHigher;

        console.log('wihtin ' + distanceToMatch / closestKey.hz * 100 + '% of the key');
        return closestKey;
      }
    };

    var lastItem = 0;
    var STEPS_THRESHOLD = 10;

    function drawWave() {
      analyser.getByteTimeDomainData(dataArray);
      canvasContext.fillStyle = 'gray';
      canvasContext.fillRect(0, 128, 1024, 2);

      var lastPos = 0;
      dataArray.forEach(function (item, i) {
        var didCrossOver = false;

        if (i > 0 && i < dataArray.length && item > 128 && lastItem <= 128) {
          didCrossOver = true;

          // makes NO SENSE!! I should be getting the 'i' and getting the gap between them
          // then calculating that with the sample rate to get the Hz.
          var elapsedSteps = i - lastPos;
          lastPos = i;

          if (elapsedSteps > STEPS_THRESHOLD) {
            var seconds = elapsedSteps / sampleRate; // sampleRate = 44100
            var hertz = 1 / seconds;
            pitchSamples.push(hertz);
            refs.output.textContent = hertz + 'Hz';
            canvas2Context.fillRect(4, hertz / 2, 65, 1); // pitch marker
          }
        }

        var height = didCrossOver ? 50 : 2;
        canvasContext.fillRect(i, item, 2, height); // point in the wave

        lastItem = item;
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
      if (audioEl.paused) return;

      canvasContext.clearRect(0, 0, 1024, 500);

      drawFreq();
      drawWave();
    }

    renderAudio();

    audioEl.play();

    audioEl.addEventListener('ended', function () {
      var key = pitchSamples.getKey();
      console.log('  --  >  audio.js:228 >  > key:', key);
      refs.output.textContent = 'That was note number ' + key.key + ': ' + key.name;
    });

    window.addEventListener('keydown', function (e) {
      if (e.keyCode === 32) {
        // space
        audioEl.paused ? audioEl.play() : audioEl.pause();
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

//# sourceMappingURL=main.js.map