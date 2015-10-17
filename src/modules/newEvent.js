'use strict'

const fs = require('fs')
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth() + 1
const day = today.getDate()
const monthDoubleDigit = month > 9 ? month.toString() : `0${month.toString()}`
const fileName = `${year}-${monthDoubleDigit}-${day}-`
let fileNameCounter = 10
const fileNameEnding = `.html`
let fileNameToTry = `${fileName}${fileNameCounter}${fileNameEnding}`
const filePath = `./src/documents/events/${fileNameToTry}`
const content = `---
datum: ${year}.${monthDoubleDigit}.${day}
tags: ['tag1', 'tag2']
title: 
linktext: 
linkurl: 
arrivals: 
victims: 
articleType: event
layout: post
---
`

// flag wx makes write fail if document already exists
fs.writeFile(filePath, content, {flags: 'wx'}, (error) => {
  if (error) {
    return console.log('Sorry, file not written. Error message:', error)
  }
})
