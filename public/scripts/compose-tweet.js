$(document).ready(function() {

  const composeBtn = $(".nav-compose");

  //flag to see if page has already scrolled to the form
  let scrolled = false;

  const toggleForm = () => {
    const newTweetSection = $(".new-tweet");
    const tweetInput = $("#tweet-text")

    //animating using height value
    //hard coded height... will need to make it dynamic for responsiveness 
    if(newTweetSection.css("height") === "0px") {
      newTweetSection.css({height: "250px", opacity: 1});
      tweetInput.focus();
    } else {
      newTweetSection.css({height: "0px", opacity: 0});
    }

    //scroll to new tweet section but only on first click
    if(!scrolled) {
        $("html, body").animate({
          scrollTop: $(newTweetSection).offset().top - 200
        }, 600);
        scrolled = true;
      }
  }

  composeBtn.on("click", toggleForm)

});   