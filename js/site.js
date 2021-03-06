function drawToolBox(data) {
  var books = ich.books({
    'rows': data
  })
  $('#books').html(books)
}

$(document).on( 'click', '#showAvailable', toggleAvailable)

$(document).on( 'click', '.clear', function(e) {
  clearSearch(e)
  $('#showAvailable').removeClass('button-pressed')
    .html('Show Available')
})

$(document).on('keyup', '#toolSearch', function(e) {
  var text = $(e.target).val().trim().toLowerCase()

  if (text === '') return clearSearch(e)
  if ($('.button-pressed').length === 1) {
    console.log('Hide unavailable')
    $('.book-box').filter('.not-available').hide()
  }
  filterTools(text)
})

$(document).on( 'click', '.book-box', function(e) {
  var rowNumber = $(this).closest("div").attr("id")
  if ($(this).closest('div').hasClass('selected-tool')) {
    $('.book-box-bottom' + '.' + rowNumber).css('display', 'none')
    $(this).closest('div').removeClass('selected-tool')
  }
  else {
    $('.book-box-bottom' + '.' + rowNumber).css('display', 'inherit')
    $(this).closest('div').addClass('selected-tool')
  }
})

function toggleAvailable() {
  if ($('.button-pressed').length === 0) {
    console.log('off')
    $('#showAvailable').addClass('button-pressed')
      .html('Show All')
    $('.not-available').hide()
  } else {
    console.log('on')
    $('#showAvailable')
      .html('Show Available').removeClass('button-pressed')
    if ($('#toolSearch').val() != '') {
      console.log("search not empty")
      return filterTools($('#toolSearch').val())
    }
    $('.not-available').show()
  }
}

function clearSearch(e) {
  console.log('clear')
  $('#toolSearch').val('')
  drawToolBox(gData)
}

function filterTools(text) {
  $('.book-title').each(function() {
  var tool = $(this).html().toLowerCase()
  if (tool.match(text)) {
    $(this).parent().show()
  } else $(this).parent().hide()
  })
}
