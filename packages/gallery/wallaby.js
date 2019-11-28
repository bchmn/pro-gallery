// module.exports = function (wallaby) {
//   return Object.assign({}, require('yoshi/config/wallaby-jest')(wallaby), {
//     workers: undefined,
//     files: [
//       'src/**/*.js',
//       'tests/drivers/**/*.js',
//       // is the same as
//       { pattern: 'src/**/*.js', instrument: true, load: true, ignore: false }
//     ],

//     tests: [
//       'tests/**/*spec.js',
//       { pattern: 'tests/**/*.e2e.spec.js', instrument: false, load: false, ignore: true }
//     ],
//     env: {
//       type: 'node',
//       runner: 'node'
//     },

//     testFramework: 'jest'
//   })
// };

module.exports = function(wallaby) {
  const wallabyYoshi = require('yoshi/config/wallaby-jest')(wallaby);
  wallabyYoshi.tests = ['tests/**/*.spec.js', '!tests/**/*.e2e.spec.js'];
  wallabyYoshi.files = ['src/**/*.js','tests/drivers/**/*.js'];
  return wallabyYoshi;
};
