exports.toPairs = (object) => {
  const keys = Object.keys(object);
  return keys.map((key) => [key, object[key]]);
};

exports.fromPairs = (pairs) =>
  pairs.reduce(
    (acc, [key, val]) => ({
      ...acc,
      [key]: val,
    }),
    {}
  );

exports.groupBy = (array, key) =>
  array.reduce(
    (acc, cur) => ({
      ...acc,
      [cur[key]]: acc[cur[key]] ? [...acc[cur[key]], cur] : [cur],
    }),
    {}
  );

exports.fluctuation = () => {
  const num = Math.random() * 0.1;
  const nums = String(num).split("").map(Number);
  const multiplier = 0.1;
  for (const i = num.length - 1; i >= 0; i--) {
    const cur = nums[i];
    const next = nums[i - 1];

    if (cur - next === 0) {
      multiplier += 0.1;
    } else {
      break;
    }
  }

  const lastDigit = String(num).split("").pop();

  return lastDigit > 4 ? -(num * multiplier) : num * multiplier;
};
