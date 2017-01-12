'use strict'

var start = null

$(document).ready(function() {
  $('body').children('.number').displayNumber(0)
  window.requestAnimationFrame(animate)
})

function animate(timestamp) {
  if (!start) start = timestamp
  var progress = timestamp - start

  $('body').children('.number').each(function(index) {
    $(this).displayNumber(Math.floor(Math.random() * 10))
  })

  if (progress < 5000) {
    window.requestAnimationFrame(animate)
  }
  else {
    $('body').children('.number').each(function(index) {
      $(this).displayNumber(0)
    })
  }
}

function array_diff(a, b) {
  return a.filter(function(v) {
    return b.indexOf(v) === -1
  })
}

jQuery.fn.extend({
    displayNumber: function(number) {
      var me = this
      var elementsToHide = [
        ['middle'], // 0
        ['top-left', 'bottom-left', 'top', 'middle', 'bottom'], // 1
        ['top-left', 'bottom-right'], // 2
        ['top-left', 'bottom-left'], // 3
        ['bottom-left', 'top', 'bottom'], // 4
        ['top-right', 'bottom-left'], // 5
        ['top-right'], // 6
        ['top-left', 'bottom-left', 'middle', 'bottom'], // 7
        [], // 8
        ['bottom-left'] // 9
      ]

      var allElements = [
        'top-left', 'bottom-left', 'top', 'middle', 'bottom', 'top-right', 'bottom-right'
      ]

      $.each(array_diff(allElements, elementsToHide[number]), function(index, value) {
        $(me).children('.' + value).fadeTo(0, 1)
      })

      $.each(elementsToHide[number], function(index, value) {
        $(me).children('.' + value).fadeTo(0, 0.0)
      })
    }
})
