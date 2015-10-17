'use strict'

const fs = require('fs')
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth() + 1
const monthDoubleDigit = month > 9 ? month.toString() : `0${month.toString()}`
const fileName = `${year}-${monthDoubleDigit}.html`
const filePath = `./src/documents/commentaries/${fileName}`
const content = `---
title: ${year}
datum: ${year}.${monthDoubleDigit}
articleType: commentary
layout: post
---
`
fs.writeFile(filePath, content, (error) => {
  if (error) {
    return console.log('Sorry, file not written. Error message:', error)
  }
})
