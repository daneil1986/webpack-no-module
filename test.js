
const path = require('path');
const fs = require('fs');
console.log(__dirname);

const workFile = path.resolve();

let files = fs.readdirSync('/');

fs.copyFileSync(workFile + '/index.js', workFile + '/bak/index2.js');
