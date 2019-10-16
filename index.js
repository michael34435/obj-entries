const entries = require('object.entries');
const fromEntries = require('object.fromentries');

module.exports = {
  entries(obj) {
    return entries(obj)
      .map((entry) => entry
        .map((value) => {
          if (value.constructor.name === 'Object') {
            return this.entries(value);
          }

          return value;
        }));
  },

  fromEntries(array) {
    const obj = fromEntries(array);

    return Object.keys(obj)
      .reduce(
        (entry, key) => {
          const value = obj[key];

          if (Array.isArray(value) && value.every(Array.isArray)) {
            return {
              ...entry,
              [key]: this.fromEntries(value),
            };
          }

          return {
            ...entry,
            [key]: value,
          };
        },
        {},
      );
  },
};
