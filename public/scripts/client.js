
$(document).ready(function() {
  

  const timeago = window.timeago; //library for date calculations

  //use to escape text 
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // create html article markup for a single tweet
  const createTweetElement = function(tweet) {
    let newElement = 
    `<article class="tweet">
      <div class="tweet-header">
        <div class="tweet-header__user">
          <img class="tweet-header__avatar" src=${tweet.user.avatars} alt="">
          <span>${tweet.user.name}</span>
        </div>
        <span class="tweet-username">${tweet.user.handle}</span>
      </div>
      <p>${escape(tweet.content.text) }</p>
      <footer>
        <span class="date-added">${timeago.format(tweet.created_at)}</span>
        <div class="tweet-icons">
          <div class="tweet-icons__container">
            <img src="./icons/flag-icon.png" alt="" >
            <img src="./icons/flag-icon-hover.png" alt="" >
          </div>
          <div class="tweet-icons__container">
            <img src="./icons/refresh-icon.png" alt="" >
            <img src="./icons/refresh-icon-hover.png" alt="" >
          </div>
          <div class="tweet-icons__container">
            <img src="./icons/heart-icon.png" alt="" >
            <img src="./icons/heart-icon-hover.png" alt="" >
          </div>
        </div>
      </footer>
    </article>`

    return newElement;
  }

  //loop through an array of tweet objects and prepend to tweets section
  const renderTweets = function(tweets) {
    //remove previous elements before rendering to avoid duplicates
    $(".tweets").empty();

    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $(".tweets").prepend($tweet);
    })
  }

  const newTweetForm = $(".new-tweet__form");

  const showAlert = (message) => {
    const alertElement = $(".alert");
    const alertMessage = $(".alert__message");
    alertMessage.html(message);

    alertElement.css({height: "50px", border: "2px solid red"});
    setTimeout(() => {
      alertElement.css({height: "0px", border: "none"});
    }, 2000);
  }

  const validateForm = function() {
    const inputValue = $("#tweet-text").val().trim()

    if(inputValue === "") {
      showAlert("Input field is empty!")
      return false;
    }

    if(inputValue.length > 140) {
      showAlert("Your tweet is too long")    
      return false;
    }
    
    return true;
  }



  //post request when user submits new tweet form
  newTweetForm.on("submit", function(event) {
    event.preventDefault();

    if(!validateForm()) return;

    const data = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/api/tweets",
      data: data,
    })
    .then(tweet => {
      console.log("Success:", tweet);
      //reset values in form 
      $("#tweet-text-counter").val(140)
      $("#tweet-text").val("")
      loadTweets();
    })
    .catch(err => console.log(err));

  })

  //fetch tweets as soon as document loads and render them on the page
  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/api/tweets",
      success: function(tweets) {
        console.log("Success - fetched tweets from API");
        renderTweets(tweets);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
      }
    });
  }
  
  loadTweets();

 
  




});