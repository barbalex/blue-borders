'use strict'

const _ = require('lodash')

module.exports = (files, fileName) => {
  // first remove filetypes from filenames
  files = files.map((file) => file.split('.')[0])
  let counter = 1
  if (!_.includes(files, fileName)) return fileName
  let fileNameNew = fileName + '_01'
  while (_.includes(files, fileNameNew)) {
    fileNameNew = fileName + '_' + (counter < 10 ? '0' + counter : counter)
    counter++
  }
  return fileNameNew
}
