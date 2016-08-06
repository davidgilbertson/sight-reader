SP_APP.audio = {
  start() {
    const {refs} = SP_APP;
    console.log('  --  >  audio.js:3 > start');

    const audioContext = new window.AudioContext();
    const audioSource = audioContext.createMediaElementSource(refs.audio);

    const analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvasContext = refs.canvas.getContext('2d');

    canvasContext.fillStyle = 'firebrick';
    canvasContext.fillRect(10, 10, 50, 50);

    function drawWave() {
      analyser.getByteTimeDomainData(dataArray);

      dataArray.forEach((item, i) => {
        canvasContext.fillRect(i, item, 1, 4);
      });
    }

    function drawFreq() {
      analyser.getByteFrequencyData(dataArray);

      dataArray.forEach((item, i) => {
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

    window.addEventListener('keydown', e => {
      if (e.keyCode === 32) { // space
        refs.audio.paused ? refs.audio.play() : refs.audio.pause();
      }
    });
  },
};
