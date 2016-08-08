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

    setupAudioContext(audioEl) {
      const audioContext = new window.AudioContext();
      const audioSource = audioContext.createMediaElementSource(audioEl);
      const analyser = audioContext.createAnalyser();
      audioSource.connect(analyser);
      audioSource.connect(audioContext.destination); // out to the speakers

      return {audioContext, audioSource, analyser};
    }

    start() {
      const {refs, KEYS} = SP_APP;

      const ref = document.location.pathname.replace(/^\//, '');
      let audioEl = refs[ref] || document.querySelector('audio');
      let {audioContext, analyser} = this.setupAudioContext(audioEl);
      const {sampleRate} = audioContext;

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const canvasContext = refs.canvas.getContext('2d');
      const canvas2Context = refs.canvas2.getContext('2d');
      this.drawPitchMarkers(canvas2Context);

      canvas2Context.fillStyle = 'rgba(0, 0, 0, 0.03)';
      canvasContext.fillStyle = 'firebrick';

      let lastItem = 0;
      const STEPS_THRESHOLD = 10;

      const drawWave = () => {
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

        dataArray.forEach((item, i) => {
          canvasContext.fillRect(i, 500 - item, 1, item);
        });
      };

      const renderAudio = () => {
        requestAnimationFrame(renderAudio);

        if (audioEl.paused) return;

        canvasContext.clearRect(0, 0, 1024, 500);

        drawFreq();
        drawWave();
      };

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

      renderAudio();

      audioEl.addEventListener('ended', () => {
        const key = getKey();
        refs.note.textContent = `That was note number ${key.pos}: ${key.name}`;
        const keyEl = SP_APP.refs[`key_${key.pos}`];
        if (keyEl) keyEl.style.fill = '#2196f3';
      });

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
