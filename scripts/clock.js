exports.worldClock = () => {
  let time = 0;
  const handlers = {
    daily: [],
  };

  setInterval(() => {
    time += 1;
    if (Math.round(time / 300) > Math.round(time - 1 / 300)) {
      for (const handler of handlers.daily) {
        handler();
      }
    }
  }, 3000);

  const addHandler = (fn, freq) => handlers[freq].push(fn);

  const getTime = () => {
    const day = time / 1440;
    const hours = time / 60;

    return {
      day,
      hours,
      minutes: time,
    };
  };

  return { getTime, addHandler };
};
