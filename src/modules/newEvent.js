'use strict'

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
