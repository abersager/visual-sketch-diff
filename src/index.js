#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')
const React = require('react')
const ReactDOM = require('react-dom/server')

import arrayDiff from './array-diff'
import htmlTemplate from './html-template'

import App from './components/App'

const optionDefinitions = [
  { name: 'files', type: String, multiple: true, defaultOption: true },
  { name: 'output', type: String }
]

const options = commandLineArgs(optionDefinitions)

const pathBefore = `/tmp/visual-sketch-diff/before`
const pathAfter = `/tmp/visual-sketch-diff/after`
const pathDiff = `/tmp/visual-sketch-diff/diff`

shell.exec(`mkdir -p ${pathBefore}`)
shell.exec(`mkdir -p ${pathAfter}`)
shell.exec(`mkdir -p ${pathDiff}`)

console.log(`Dumping ${options.files[0]}...`);
shell.exec(`sketchtool export artboards --include-symbols=YES --save-for-web --output=${pathBefore} ${options.files[0]}`)
console.log(`Dumping ${options.files[1]}...`);
shell.exec(`sketchtool export artboards --include-symbols=YES --save-for-web --output=${pathAfter} ${options.files[1]}`)

const artboardsBefore = shell.ls(`${pathBefore}/*.png`).map(filePath => path.basename(filePath))
const artboardsAfter = shell.ls(`${pathAfter}/*.png`).map(filePath => path.basename(filePath))

const result = arrayDiff(artboardsBefore, artboardsAfter)

console.log(`Diffing...`);
result.subsisting.forEach(function (fileName) {
  shell.exec(`blink-diff --no-composition "${pathBefore}/${fileName}" "${pathAfter}/${fileName}" --output "${pathDiff}/${fileName}" &>/dev/null`)
})

const app = <App {...result} pathBefore={pathBefore} pathAfter={pathAfter} pathDiff={pathDiff} />

const appString = ReactDOM.renderToString(app)

const html = htmlTemplate({ appString })

fs.writeFileSync(options.output, html)
