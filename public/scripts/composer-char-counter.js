$(document).ready(function() {
  
  const counterElement = $("#tweet-text-counter")

  $("#tweet-text").keyup( function(e) {
    const characters = this.value.length;
    let counter = 140 - characters
    counterElement.html(counter)
    if(counter < 0) {
      counterElement.addClass("text-danger");
    } else {
      counterElement.removeClass("text-danger");
    }
  })



});   