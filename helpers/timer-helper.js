let startTime, endTime, timeDiff;

const timer = {
  start() {
    startTime = Date.now();
  },

  end() {
    endTime = Date.now();
    timeDiff = endTime - startTime;
  },

  getTimeDiff() {
    return timeDiff;
  },
};

module.exports = timer;
