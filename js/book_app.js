'use strict';
// Book search app using Google Books API
//
$(document).ready(function(){
    //
	// Setup ajax error handling
	$(function () {
	    $.ajaxSetup({
	        error: function (x, status, error) {
	            if (x.status == 400) {
	            	console.log('This search failed.')
	                $('#secondary p').css("color", "#db2104");
	                $('#secondary h3').html('Uh oh...');
	                $('#secondary p').html('Please type in a book title or author name to search the Google Books database.');
	            }
	        }
	    });
	});
	//
    $('#book_form').submit(function(){
		event.preventDefault();
		bookSearch();
	});	
	// Using the Google Books API
	function bookSearch() {
	  // Storing the user input
	  var search = $('#search').val();
	  // Clear any previous data
	  $('#results').html('');
	  console.log(search);
      //
	  $.ajax({
	      // URL for Google Books database
	      url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
	      dataType: "json",
	      type: 'GET',
	      // On success, run this function
	      success: function(data) {
	      	  console.log(data);
	          $('#book_form').trigger("reset");
	          $('#secondary p').css("color", "#49c593");
	          $('#secondary h3').html('Success!');
	          $('#secondary p').html('Thank you for using Google Books Lookup. Happy reading!');
	          // Loop through the data in data.items
	          for(var i = 0; i < data.items.length; i++){
	              // Store current books' volume info              
	              var jdata = data.items[i].volumeInfo;
	              
	              // Create elements and assign them to a variable
	              var newColSm4 = document.createElement('div');
	              var newImg = document.createElement('img');
	              var newH2 = document.createElement('h2');
	              var newH3 = document.createElement('h3');
	              var newH4 = document.createElement('h4');
	              var newAnchor = document.createElement('a');

	              // Add classes to elements
	              newColSm4.className = 'col-sm-12 col-md-8 col-md-offset-2 item';
	              newAnchor.className = 'button button-primary';

	              // Add text to tags
	              newH2.innerText = jdata.title;
	              newAnchor.innerText = 'Read now';

	              // Add attributes
	              newAnchor.href = jdata.infoLink;
	              newAnchor.setAttribute('target', '_blank');

	              // Create image if one exists
	              if(jdata.imageLinks) {
	                newImg.src = jdata.imageLinks.thumbnail;
	              } else {
	                newImg.src = 'images/no-book-cover.png';
	              };

	              // Create publish date if one exists
	              if(jdata.publishedDate) {
	                newH4.innerText = jdata.publishedDate;
	              } else {
	                newH4.innerText = 'No publish date found';
	              };

	              // Create author if one exists
	              if(jdata.authors) {
	                newH3.innerText = jdata.authors[0];
	              } else {
	                newH3.innerText = 'No author found';
	              };

	              // Add contents of the variables to html
	              newColSm4.appendChild(newImg);
	              newColSm4.appendChild(newH2);
	              newColSm4.appendChild(newH3);
	              newColSm4.appendChild(newH4);
	              newColSm4.appendChild(newAnchor);

	              // Add results to the screen
	              $('#results').append(newColSm4);
	          };
	      }
	  });
    };
//
}); // End document ready function