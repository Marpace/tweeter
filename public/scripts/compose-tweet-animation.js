$(document).ready(function() {

  const composeBtn = $(".nav-compose");
  const scrollBtn = $(".scroll-to-top-btn")
  const newTweetSection = $(".new-tweet");
  const tweetInput = $("#tweet-text")
  let formOpen = false;

  const showNewTweetForm = () => {
    //check if form is already open 
    if(formOpen) return; 

    //scrolls the page to the new tweet section
    $("html, body").animate({
        scrollTop: $(newTweetSection).offset().top - 200
      }, 400);

      //using height to show the form because slideDown() was jumpy
      newTweetSection.css({height: "250px", opacity: 1});

      tweetInput.focus();
      formOpen = true;
  }


  const hideNewTweetForm = () => {
    if(!formOpen) return;
    newTweetSection.css({height: "0px", opacity: 0});
    formOpen = false;
  }


  //show/hide the navbar button and scroll-to-top button based on how much the page has scrolled
  $(document).scroll(function() {

    //check if page has scrolled more than 600px down. If so, show scroll-to-top button
    if ( $(document).scrollTop() >= 600 ) {
      scrollBtn.fadeIn();
      composeBtn.fadeOut();
    } else {
      scrollBtn.fadeOut();
      composeBtn.fadeIn();
    }
  });

  //the compose button on the navbar will toggle the form
  composeBtn.on("click", () => {
    if(!formOpen) showNewTweetForm();
    else hideNewTweetForm();
  });

  // the scroll-to-top button will scroll to the form but only open the form if its hidden. It will not hide it
  scrollBtn.on("click", () => {
    if(formOpen) {
      $("html, body").animate({
        scrollTop: $(newTweetSection).offset().top - 200
      }, 400);
      tweetInput.focus();
    } else {
      showNewTweetForm();
    }

  });
});   