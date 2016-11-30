// var $titleInput = $('#title-input');
// var $urlInput = $('#url-input');
// var $addButton = $('#add-link');

$('#add-link').on('click', function () {
  debugger;
  var newLink = $('#title-input', '#url-input' ).val();
  $('#submitted-links').prepend(newLink);
});

// When the user clicks on the button for creating the bookmark, it should be added to the bookmarks section

// When the user clicks on the “Mark as Read” button:

  // A class of .read should be added to the bookmark

  // If it already has the class of .read, it should be removed

  // When the user clicks on the “Remove” button, the link should be removed from the page
