import axios from "axios";

const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

export default {
  // Gets all books
  getArticle: function() {
    return axios.get("/api/articles");
  },
  deleteBook: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Gets the book with the given id
  saveArticle: function(resourceData) {
    console.log("woowowowowo")
    console.log(resourceData)
    return axios.post("/api/articles", resourceData);
  },

  runQuery: function(queryURL, func) {

    // The AJAX function uses the queryURL and GETS the JSON data associated with it.
    // The data then gets stored in the variable called: "NYTData"
  let searchQuery= queryURLBase + queryURL
      axios.get(searchQuery)
  .then(function (response) {
    console.log(response);
    func(response)
  })
  .catch(function (error) {
    console.log(error);
  });
      // Log the NYTData to console, where it will show up as an object
    
}}
