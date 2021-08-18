var books = [];

$('.search').on('click', function () {
  var search = $('#search-query').val();

  fetch(search);
});

var fetch = function (query) {
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=" + query,
    dataType: "json",
    success: function(data) {
      addBooks(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

var addBooks = function (data) {
  for (var i = 0; i < data.items.length; i++) {
    var info = data.items[i].volumeInfo
    var authors = '';
    if (info.authors > 1) {
      authors = info.authors.join(', ');
    } else {
      authors = info.authors[0];
    }

    var book = {
      title: info.title,
      author: authors,
      imageURL: info.imageLinks.smallThumbnail,
      isbn: info.industryIdentifiers[0].identifier,
      pageCount: info.pageCount
    };

    books.push(book);
  }
  renderBooks();
}

var renderBooks = function () {
  $('.books').empty();

  for (var i = 0; i < books.length; i++) {
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(books[i]);
    
    $('.books').append(newHTML);
  }
};
