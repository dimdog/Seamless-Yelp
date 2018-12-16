var apikey="FILLINHERE";
function searchYelp(address, restaurant_element){
  var restaurant = restaurant_element.title;
  console.log("called"+restaurant);
  var xhr = new XMLHttpRequest();
  var url = "https://api.yelp.com/v3/businesses/search?term=\""+restaurant+"\"&location=\""+address+"\"";
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Authorization', 'Bearer ' + apikey);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      if (resp.businesses.length > 0){
        var biz = resp.businesses[0];
        var attrs = {name: restaurant, rating: biz.rating, reviews: biz.review_count};
        console.log(attrs)
        replaceReviews(restaurant_element, attrs);
      }
    }
  }
  xhr.send();
}

var empty_star = "star";
var half_star = "star-half";
var full_star = "star star--active";

function replaceStars(stars, rating){
  var stars_list = stars.childNodes[0];
  for (var i = 0; i < stars_list.childNodes.length; i++){
    var elem = stars_list.childNodes[i];

    if (i+0.5 == rating) {
      elem.className = half_star;
    } else if (i + 1 <= rating){
      elem.className = full_star;
    } else {
      elem.className = empty_star;
    }
  }
}
function replaceCount(count, reviews){
  count.childNodes[0].innerText = "" + reviews + " Yelp";
}
function replaceReviews(restaurant, attrs){
  var realParent = restaurant.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  var tertiary = realParent.getElementsByClassName("starRating")[0].childNodes[0];
  replaceStars(tertiary.childNodes[0], attrs.rating);
  replaceCount(tertiary.childNodes[1], attrs.reviews);
}

setTimeout(replaceThatShit, 2000);
function replaceThatShit(){
  var restaurants = document.getElementsByClassName('restaurant-name');
  if (restaurants.length == 0){
    setTimeout(replaceThatShit, 500);
    return;
  }
  var address = document.getElementsByClassName('addressInput-textInput')[0].value;
  var i = 0;
  function slowSearch(){
      setTimeout(function() { searchYelp(address, restaurants[i]); i++; if (i < restaurants.length) { slowSearch(); } }, 1000);
  }
  //slowSearch();
}
