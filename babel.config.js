// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     ['module:react-native-dotenv']
//   ],
//   env: {
//     production: {
//       plugins: ['react-native-paper/babel'],
//     },
//   },
// };

module.exports = function(api) {
  api.cache(false);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['module:react-native-dotenv'],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};