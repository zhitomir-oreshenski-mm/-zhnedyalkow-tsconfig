#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');

const reactTsconfig = require('../config/tsconfig.react.json');
const reactNativeTsConfig = require('../config/tsconfig.react-native.json');
const nodeTsConfig = require('../config/tsconfig.node.json');

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Pick the framework you are using',
      name: 'framework',
      choices: [
        'react',
        'react-native',
        'node'
      ]
    }
  ])
  .then(({framework}) => {
  
    let tsConfigToWrite = '';

    if(framework === 'react') {
      tsConfigToWrite = reactTsconfig;
    } else if (framework === 'react-native') {
      tsConfigToWrite = reactNativeTsConfig;
    } else if (framework === 'node') {
      tsConfigToWrite = nodeTsConfig;
    }

    const cwd = process.cwd(); // current working 
    const fileToWrite = JSON.stringify(tsConfigToWrite);

    try {
      fs.writeFileSync(cwd + '/tsconfig.json', fileToWrite);
    } catch (err) {
      console.log('Error writing tsconfig.json:' + err.message)
    }
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });