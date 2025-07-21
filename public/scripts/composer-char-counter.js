$(document).ready(function() {
  
  const counterElement = $("#tweet-text-counter");

  $("#tweet-text").keyup(function() {

    //get the current number of characters on each keyup event
    const characters = this.value.length;

    //update counter and html element
    let counter = 140 - characters;
    counterElement.html(counter);

    //if counter goes below 0, text color switches to red
    if (counter < 0) {
      counterElement.addClass("text-danger");
    } else {
      counterElement.removeClass("text-danger");
    }
  });

});