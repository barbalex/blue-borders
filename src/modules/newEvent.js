'use strict'

/**
 * creates a new event with prepared header
 * names event like this on 2015.11.11: '2015-11-11.html'
 * if '2015-11-11.html' already exists names it '2015-11-11_01.html' and so on
 */

const fs = require('fs')
const getUnusedFilename = require('./getUnusedFilename.js')
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth() + 1
const day = today.getDate()
const monthDoubleDigit = month > 9 ? month.toString() : `0${month.toString()}`
const filePath = `./src/documents/events/`
let fileName = `${year}-${monthDoubleDigit}-${day}`
const files = fs.readdirSync(filePath)
fileName = getUnusedFilename(files, fileName)
fileName = `${fileName}.html`
const filePathName = `${filePath}${fileName}`
const content = `---
datum: ${year}.${monthDoubleDigit}.${day}
tags: ['exampleTag1', 'exampleTag2']
title: 
linktext: 
linkurl: 
arrivals: 
victims: 
articleType: event
layout: post
---
`

fs.writeFile(filePathName, content, (error) => {
  if (error) {
    return console.log('Sorry, file not written. Error message:', error)
  }
})
