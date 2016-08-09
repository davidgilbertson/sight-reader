(function() {
  class Audio {
    constructor() {
      this.pitchSamples = new SP_APP.SmartArray();
    }

    drawPitchMarkers(canvas2Context) {
      canvas2Context.fillStyle = 'firebrick';
      canvas2Context.font = '14px serif';
      for (let i = 25; i < 1200; i += 25) {
        const pos = i / 2;
        canvas2Context.fillRect(65, pos, 4, 1);
        canvas2Context.fillText(i.toString(), 70, pos + 5);
      }
    }

    start() {
      const {refs, KEYS} = SP_APP;
      let audioReady = false;
      let loudEnough = false;
      const MIN_VOLUME = 5;

      const ref = document.location.pathname.replace(/^\//, '');

      const audioContext = new window.AudioContext();
      let audioEl = refs[ref] || document.querySelector('audio');
      const analyser = audioContext.createAnalyser();

      const {sampleRate} = audioContext;

      analyser.fftSize = 2048;
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const canvasContext = refs.canvas.getContext('2d');
      const canvas2Context = refs.canvas2.getContext('2d');
      this.drawPitchMarkers(canvas2Context);

      const userMediaConstraints = {audio: true};

      const getUserMediaSuccess = stream => {
        const audioSource = audioContext.createMediaStreamSource(stream);
        refs.mic_audio.src = audioSource;

        audioSource.connect(analyser);
        // comment/uncomment to play to speakers
        // audioSource.connect(audioContext.destination); // out to the speakers
        audioReady = true;
      };

      const getUserMediaError = err => {
        err && console.error(err);
      };

      navigator.getUserMedia(userMediaConstraints, getUserMediaSuccess, getUserMediaError);

      canvas2Context.fillStyle = 'rgba(0, 0, 0, 0.03)';
      canvasContext.fillStyle = 'firebrick';

      let lastItem = 0;
      const STEPS_THRESHOLD = 10;

      const getKey = () => {
        const pitch = this.pitchSamples.mode;
        let closestLower = KEYS[0];
        let closestHigher = KEYS[KEYS.length - 1];

        for (let i = 0; i < KEYS.length; i++) {
          if (KEYS[i].hz < pitch) closestLower = KEYS[i];
          if (KEYS[i].hz > pitch) {
            closestHigher = KEYS[i];
            break; // going from low to high so we can stop here
          }
        }

        const distanceToLower = Math.abs(pitch - closestLower.hz);
        const distanceToHigher = Math.abs(pitch - closestHigher.hz);

        return Math.min(distanceToLower, distanceToHigher) === distanceToLower
          ? closestLower
          : closestHigher;
      };

      const renderKey = () => {
        console.log('  --  >  audio.js:107 > renderKey');
        const key = getKey();
        refs.note.textContent = `That was note number ${key.pos}: ${key.name}`;
        const keyEl = SP_APP.refs[`key_${key.pos}`];

        // TODO (davidg): push this out into the Piano class
        const keyEls = document.querySelectorAll('[piano-key]');

        for (let keyEl of keyEls) {
          keyEl.style.fill = '';
        }

        if (keyEl) keyEl.style.fill = '#2196f3';
        this.pitchSamples.empty();
      };

      const drawWave = () => {
        if (!loudEnough) return;
        analyser.getByteTimeDomainData(dataArray);
        canvasContext.fillRect(0, 128, 1024, 2);

        let lastPos = 0;
        dataArray.forEach((item, i) => {
          if (i > 0 && i < dataArray.length && item > 128 && lastItem <= 128) {
            const elapsedSteps = i - lastPos;
            lastPos = i;

            if (elapsedSteps > STEPS_THRESHOLD) {
              const hertz = 1 / (elapsedSteps / sampleRate); // sampleRate = 44100
              this.pitchSamples.push(hertz);
              canvas2Context.fillRect(4, hertz / 2, 65, 1); // pitch marker
            }
          }

          canvasContext.fillRect(i, item, 2, 2); // point in the wave

          lastItem = item;
        });
      };

      const drawFreq = () => {
        analyser.getByteFrequencyData(dataArray);
        let volumeTotal = 0;

        dataArray.forEach((item, i) => {
          canvasContext.fillRect(i, 500 - item, 1, item);
          volumeTotal += item;
        });

        const volume = volumeTotal / dataArray.length;
        const nowLoudEnough = volume > MIN_VOLUME;
        if (loudEnough !== nowLoudEnough) {
          console.log('  --  >  audio.js:160 > drawFreq SWITCHED IN/OUT OF LOUD ENOUGH');
          this.pitchSamples.empty();
        }

        loudEnough = nowLoudEnough;
        refs.db.textContent = volume;
      };

      const renderAudio = () => {
        requestAnimationFrame(renderAudio);

        if (!audioReady) return;

        canvasContext.clearRect(0, 0, 1024, 500);

        drawFreq();
        drawWave();
      };

      renderAudio();

      setInterval(() => {
        loudEnough && renderKey();
      }, 100);

      window.addEventListener('keydown', e => {
        if (e.keyCode === 32) { // space
          audioEl.paused ? audioEl.play() : audioEl.pause();
        }
      });

      audioEl.play();
    }
  }

  SP_APP.Audio = Audio;
})();
