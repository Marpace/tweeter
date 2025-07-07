$(document).ready(function() {
  
  const timeago = window.timeago; //library for date calculations

  // create html article markup for a single tweet
  const createTweetElement = function(tweet) {
    let newElement = 
    `<article class="tweet">
      <header>
        <div class="tweet-user">
          <img class="tweet-avatar" src=${tweet.user.avatars} alt="">
          <span>${tweet.user.name}</span>
        </div>
        <span class="tweet-username">${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
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

  //post request when user submits new tweet form
  newTweetForm.on("submit", function(event) {
    event.preventDefault();
    const inputValue = $("#tweet-text").val()


    if(inputValue === "") {
      return alert("Invalid: input field is empty")
    }

    if(inputValue.length > 140) {
      return alert("Invalid: tweet too long")
    }

    const data = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/api/tweets",
      data: data,
      success: function(tweet) {
        console.log("Success:", tweet);
        //reset values in form 
        $("#tweet-text-counter").val(140)
        $("#tweet-text").val("")
        loadTweets();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
      }
    });

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