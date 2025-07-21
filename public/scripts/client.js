
$(document).ready(function() {
  
  const timeago = window.timeago; //library for date calculations

  //use to escape text
  const escape = function(str) {
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
          <img class="tweet-header__user-avatar" src=${tweet.user.avatars} alt="">
          <span class="tweet-header__user-username">${tweet.user.name}</span>
        </div>
        <span class="tweet-header__handle">${tweet.user.handle}</span>
      </div>
      <p class="tweet-content">${escape(tweet.content.text) }</p>
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
    </article>`;

    return newElement;
  };

  //loop through an array of tweet objects and prepend to tweets section
  const renderTweets = function(tweets) {
    //remove previous elements before rendering to avoid duplicates
    $(".tweets").empty();

    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $(".tweets").prepend($tweet);
    });
  };

  
  const showAlert = (message) => {
    const alertElement = $(".new-tweet-alert");
    const alertMessage = $(".new-tweet-alert__message");

    //update element's innet HTML with correct message
    alertMessage.html(message);
    
    //display message and hide after 2 seconds
    alertElement.css({height: "50px", border: "2px solid #e42020"});
    setTimeout(() => {
      alertElement.css({height: "0px", border: "none"});
    }, 2000);
  };
  
  const validateForm = function() {
    const inputValue = $("#tweet-text").val().trim();
    
    //check if string is empty
    if (inputValue === "") {
      showAlert("Input field is empty!");
      return false;
    }
    
    //check if tweet length exceeds limit
    if (inputValue.length > 140) {
      showAlert("Your tweet is too long");
      return false;
    }
    
    return true;
  };
  
  const newTweetForm = $(".new-tweet__form");

  //post request when user submits new tweet form
  newTweetForm.on("submit", function(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const data = $(this).serialize();

    //send data to server to create a new tweet
    $.ajax({
      type: "POST",
      url: "/api/tweets",
      data: data,
    })
      .then(tweet => {
        console.log("Success:", tweet);
        //reset values in form
        $("#tweet-text-counter").val(140);
        $("#tweet-text").val("");
        loadTweets();
      })
      .catch(err => console.log(err));

  });

  //fetch and display tweets
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
  };
  
  loadTweets();

});