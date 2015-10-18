'use strict'

/**
 * creates a new commentary with prepared header
 * names commentary like this on 2015.11.11: '2015-11-11.html'
 * if '2015-11-11.html' already exists names it '2015-11-11_01.html' and so on
 */

const fs = require('fs')
const getUnusedFilename = require('./getUnusedFilename.js')
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth() + 1
const monthDoubleDigit = month > 9 ? month.toString() : `0${month.toString()}`
const day = today.getDate()
const filePath = `./src/documents/commentaries/`
let fileName = `${year}-${monthDoubleDigit}-${day}`
const files = fs.readdirSync(filePath)
console.log('files', files)
fileName = getUnusedFilename(files, fileName)
fileName = `${fileName}.html`
console.log('fileName', fileName)
const filePathName = `${filePath}${fileName}`
const content = `---
title: ${year}
datum: ${year}.${monthDoubleDigit}
articleType: commentary
layout: post
---
`

fs.writeFile(filePathName, content, (error) => {
  if (error) {
    return console.log('Sorry, file not written. Error message:', error)
  }
})
