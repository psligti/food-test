var request = require("request"),
cheerio = require("cheerio"),
mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/FoodManager');
  var recipeSchema = new mongoose.Schema({
    name: String,
    url: String,
    body: String,
    cache: Boolean,
    cachedDate: Date,
    parsed:Boolean,
    recipe:{
      "timeRequired":{
        year:Number,
        month:Number,
        day:Number,
        hour:Number,
        minute:Number,
        second:Number
      },
      "cookTime":{
        year:Number,
        month:Number,
        day:Number,
        hour:Number,
        minute:Number,
        second:Number
      },
      "prepTime":{
        year:Number,
        month:Number,
        day:Number,
        hour:Number,
        minute:Number,
        second:Number
      },
      "totalTime":{
        year:Number,
        month:Number,
        day:Number,
        hour:Number,
        minute:Number,
        second:Number
      },
      "cookingMethod":String,
      "nutrition":String,
      "recipeCategory":[],
      "recipeCuisine":String,
      "ingredients":[],
      "recipeInstructions":[String],
      "recipeYield":String,
      "Properties from CreativeWork":String,
      "about":String,
      "accessibilityAPI":String,
      "accessibilityControl":String,
      "accessibilityFeature":String,
      "accessibilityHazard":String,
      "accountablePerson":String,
      "aggregateRating":String,
      "alternativeHeadline":String,
      "associatedMedia":String,
      "audience":String,
      "audio":String,
      "author":String,
      "award":String,
      "character":String,
      "citation":String,
      "comment":String,
      "commentCount":String,
      "contentLocation":String,
      "contentRating":String,
      "contributor":String,
      "copyrightHolder":String,
      "copyrightYear":String,
      "creator":String,
      "dateCreated":String,
      "dateModified":String,
      "datePublished":String,
      "discussionUrl":String,
      "editor":String,
      "educationalAlignment":String,
      "educationalUse":String,
      "encoding":String,
      "exampleOfWork":String,
      "fileFormat":String,
      "genre":String,
      "hasPart":String,
      "headline":String,
      "inLanguage":String,
      "interactionStatistic":String,
      "interactivityType":String,
      "isBasedOnUrl":String,
      "isFamilyFriendly":String,
      "isPartOf":String,
      "keywords":String,
      "learningResourceType":String,
      "license":String,
      "locationCreated":String,
      "mainEntity":String,
      "mentions":String,
      "offers":String,
      "position":String,
      "producer":String,
      "provider":String,
      "publication":String,
      "publisher":String,
      "publishingPrinciples":String,
      "recordedAt":String,
      "releasedEvent":String,
      "review":String,
      "schemaVersion":String,
      "sourceOrganization":String,
      "text":String,
      "thumbnailUrl":String,
      "translator":String,
      "typicalAgeRange":String,
      "version":String,
      "video":String,
      "workExample":String,
      "Properties from Thing":String,
      "additionalType":String,
      "alternateName":String,
      "description":String,
      "image":String,
      "mainEntityOfPage":String,
      "name":String,
      "potentialAction":String,
      "sameAs":String,
      "url":String
    }
  });
  recipeSchema.statics.random = function(query,callback) {
    this.count(query,function(err,count) {
      // console.log(count);
      if (err) return callback(err);
      var rand = Math.floor(Math.random()*count);
      // console.log(rand)
      this.findOne(query).skip(rand).exec(callback);
    }.bind(this));
  };
  var recipesDB = mongoose.model('RecipeList',recipeSchema);
var RecipeFinder =
{
  counting:function () {
    rand = (Math.random()*10000)+20000;
    recipesDB.random({cache:false},function (err,record) {
      console.log(record.name)
      if (err) return console.log(err);
      request(record.url, function (error, response, body) {
        var $ = cheerio.load(body)
        bodyInsert = $('article').html()
        record.body = bodyInsert
        record.cachedDate = new Date().toISOString();
        record.save(function (err) {})
      })
      record.cache = true
      record.save(function (err) {})
    })
    setTimeout(function (){
      RecipeFinder.counting()
    },rand)
  }
};
try {
  RecipeFinder.counting()
} catch (e) {

} finally {
  // mongoose.connection.close()
}
