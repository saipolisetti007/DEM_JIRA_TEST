const withMT = require('@material-tailwind/react/utils/withMT');

// eslint-disable-next-line no-undef
module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
});
