/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const testData =  [
      {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png"
          ,
          "handle": "@SirIsaac"
        },
        "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
      },
      {
        "user": {
          "name": "Descartes",
          "avatars": "https://i.imgur.com/nlhLi3I.png",
          "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      }
    ]

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
        <span class="date-added">${tweet.created_at}</span>
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

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $(".tweets").append($tweet);
    })
  }

  renderTweets(testData);

});