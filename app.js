var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var yelp = require("yelp-fusion");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/search", function(req, res){
  var results=[];

  client.search({
    term: req.query.search,
    location: req.query.location
  }).then(function(resp){
    //console.log(res.jsonBody.businesses);
    results = getSearchResults(resp.jsonBody.businesses);
    data = {data:results, search:req.query.search, location:req.query.location};
    console.log(results);
    res.render("search", data);
  }).catch(function(e){
    console.log(e);
    res.redirect("/")
  });;
});

app.listen(process.env.PORT || 3000, function(){
  console.log("App started...");
});

//Yelp Stuff
const API_KEY = "S_pzptiC9c8YwwreBOmcVCFZcurqc9fX_k19gcYTHraxxeL97ZJY-WJjhoHIOWZvEAQAPS8KFW4mFC9NxcFh72CoABOSmH1Cb2LUHthZex4G3uZ5WusK1Yw_IvmBWnYx"

const client = yelp.client(API_KEY);

function getSearchResults(businesses){
  var results = [];

  for(var i = 0; i < businesses.length; i++){
    results.push(businesses[i].name);
  }

  return results;
}
