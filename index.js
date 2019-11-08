const _ = require('lodash');

const entries = obj => _
  .toPairs(obj)
  .map(entry => entry
    .map((value) => {
      if (value.constructor.name === 'Object') {
        return entries(value);
      }

      return value;
    }));

const fromEntries = (array) => {
  const obj = _.fromPairs(array);

  return Object.keys(obj)
    .reduce(
      (entry, key) => {
        const value = obj[key];
        if (_.isArray(value) && _.every(value, _.isArray)) {
          return {
            ...entry,
            [key]: fromEntries(value),
          };
        }

        return {
          ...entry,
          [key]: value,
        };
      },
      {},
    );
};

module.exports = {
  entries,
  fromEntries,
};
