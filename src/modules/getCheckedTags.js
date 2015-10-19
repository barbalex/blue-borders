'use strict'

const $ = window.$

const getCheckedTags = () => {
  let checked = []
  $('#tags').find('input:checked').each(function () {
    checked.push($(this).attr('name'))
  })
  return checked
}

module.exports = getCheckedTags
