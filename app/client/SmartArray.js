(function() {

  class SmartArray {
    constructor() {
      this.dataArray = [];
    }

    push(item) {
      this.dataArray.push(item);
    }

    get avg() {
      return this.dataArray.reduce((result, time) => {
          return result + time;
        }, 0) / this.dataArray.length;
    }

    get median() {
      if (!this.dataArray.length) return 0;
      const midPoint = Math.floor(this.dataArray.length / 2);
      return this.dataArray[midPoint];
    }

    get mode() {
      if (!this.dataArray.length) return 0;

      const counts = {};
      let mode = null;
      let max = 0;

      this.dataArray.forEach(item => {
        const value = Math.round(item * 10) / 10;

        counts[value] = (counts[value] || 0) + 1;

        if (counts[value] > max) {
          max = counts[value];
          mode = value;
        }
      });

      return mode;
    }

    empty() {
      this.dataArray.length = 0;
    }
  }

  SP_APP.SmartArray = SmartArray;
})();
