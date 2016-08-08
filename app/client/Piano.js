(function() {
  const COLORS = {
    EBONY: 'black',
    IVORY: 'snow',
  };
  const SHIFTS = {
    LEFT: 'LEFT',
    MIDDLE: 'MIDDLE',
    RIGHT: 'RIGHT',
  };

  function getKeyDeets(keyPos) {
    const key = keyPos % 12;
    let shift;
    let color;

    if (key === 2 || key === 7) {
      shift = SHIFTS.RIGHT;
      color = COLORS.EBONY;
    } else if (key === 5 || key === 10) {
      shift = SHIFTS.LEFT;
      color = COLORS.EBONY;
    } else if (key === 0) {
      shift = SHIFTS.MIDDLE;
      color = COLORS.EBONY;
    } else {
      shift = null;
      color = COLORS.IVORY;
    }
    return {shift, color};
  }

  class Piano {
    render() {
      // key dimensions from http://www.rwgiangiulio.com/construction/manual/
      const {KEYS, refs} = SP_APP;
      const pianoEl = refs.piano;
      const ns = 'http://www.w3.org/2000/svg';

      let left = 0;
      const blackKeyGroup = document.createElementNS(ns, 'g');
      const whiteKeyGroup = document.createElementNS(ns, 'g');

      KEYS.forEach(key => {
        const keyRect = document.createElementNS(ns, 'rect');
        const keyDeets = getKeyDeets(key.pos);
        let x = left;
        let height = 125;
        let width = 22;
        let fill = keyDeets.color;

        if (keyDeets.color === COLORS.EBONY) {
          fill = COLORS.EBONY;
          height -= 45;
          width = 11;

          if (keyDeets.shift === SHIFTS.LEFT) {
            x = left - 7;
          } else if (keyDeets.shift === SHIFTS.MIDDLE) {
            x = left - 5;
          } else if (keyDeets.shift === SHIFTS.RIGHT) {
            x = left - 3;
          } else {
            console.warn('SHIFT was not set');
          }
        } else {
          left += 22;
        }

        keyRect.setAttribute('rx', 2);
        keyRect.setAttribute('x', x);
        keyRect.setAttribute('y', 0);
        keyRect.setAttribute('width', width);
        keyRect.setAttribute('height', height);
        keyRect.setAttribute('data-ref', `key_${key.pos}`);
        keyRect.style.fill = fill;

        if (keyDeets.color === COLORS.EBONY) {
          blackKeyGroup.appendChild(keyRect);
        } else {
          whiteKeyGroup.appendChild(keyRect);
        }
      });

      pianoEl.appendChild(whiteKeyGroup);
      pianoEl.appendChild(blackKeyGroup);
    }
  }

  SP_APP.Piano = Piano;
})();
