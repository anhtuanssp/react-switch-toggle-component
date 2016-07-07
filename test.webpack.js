// Browser ES6 Polyfill
// require('babel/polyfill');
const context = require.context('./test', false, /^\.\/.*\.js$/);
context.keys().forEach(context);
