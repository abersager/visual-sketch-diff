#!/usr/bin/env node
const fs = require('fs')
const commandLineArgs = require('command-line-args')
const shell = require('shelljs')
const path = require('path')
const React = require('react')
const ReactDOM = require('react-dom/server')

import arrayDiff from './array-diff'
import htmlTemplate from './html-template'
import compare from './compare'

import App from './components/App'

const optionDefinitions = [
  { name: 'files', type: String, multiple: true, defaultOption: true }
]

const options = commandLineArgs(optionDefinitions)
if (options.files.length !== 3) {
  console.log('Usage: visual-sketch-diff <before.sketch> <after.sketch> <path_to_report_directory>')
  exit(1)
}

async function visualSketchDiff(options) {
  const basePath = options.files[2]
  const pathBefore = `${basePath}/before`
  const pathAfter = `${basePath}/after`
  const pathDiff = `${basePath}/diff`

  shell.exec(`rm -rf ${basePath}`)
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
  const promises = result.subsisting.map((fileName) => {
    const fileBefore = `${pathBefore}/${fileName}`
    const fileAfter = `${pathAfter}/${fileName}`
    const fileDiff = `${pathDiff}/${fileName}`
    return compare(fileBefore, fileAfter, fileDiff)
  })

  const diffRatios = await Promise.all(promises)
  console.log(diffRatios);
  result.subsisting = result.subsisting.map((name, index) => ({
    name,
    diffRatio: diffRatios[index]
  }))

  const app = <App {...result} />

  const appString = ReactDOM.renderToString(app)

  const html = htmlTemplate({ appString })

  fs.writeFileSync(`${basePath}/index.html`, html)
}


visualSketchDiff(options)
