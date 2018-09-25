const MAP_API_KEY = "AIzaSyAUY9rGHCzzWrnVzvdKxlOuFU92G63bonU"

const Http = new XMLHttpRequest();

function setLocation(){
  var location = document.getElementById("location");
  var searchBtn = document.getElementById("searchBtn");
  location.value = "Loading Location...";
  searchBtn.disabled = true;

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=" + MAP_API_KEY;
      Http.open("GET", URL);
      Http.send();
      Http.onreadystatechange=(e)=>{
        var Location = JSON.parse(Http.responseText)
        // console.log(Location.results);
        location.value = Location.results[0].address_components[2].long_name + ", "
        + Location.results[0].address_components[4].short_name;
        searchBtn.disabled = false;

      }
    });
} else {
    concole.log("Broswer don't support Geolocation");
  }
}
