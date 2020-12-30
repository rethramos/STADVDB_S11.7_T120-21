let startTime, endTime, timeDiff;

const timer = {
  start() {
    startTime = Date.now();
  },

  end() {
    endTime = Date.now();
    timeDiff = endTime - startTime;
  },
};

module.exports = timer;
