// var request = require("request"),
// 	cheerio = require("cheerio"),
// request(url, function (error, response, body) {
// 	if (!error) {
// 		var $ = cheerio.load(body),
// 			letters = $("section .a-to-z-btns").html();
//
// 		// console.log("It’s " + temperature + " degrees Fahrenheit.");
// 	} else {
// 		console.log("We’ve encountered an error: " + error);
// 	}
// });

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
  "urls":{
    "base":"http://www.foodnetwork.com",
    "initial":"http://www.foodnetwork.com/recipes/a-z.123.1.html"
  },
  "pages":[],
	"selectors":{
		"index":{
			"pages":{
				"tag":"section",
				"classes":[
					"a-to-z-btns"
				]
			},
			"nextPage":{
				"tag":"div",
				"classes":["pagination"],
				"subTag":"a",
				"subClasses":[
					"btn",
					"fig",
					"right"
				]
			},
			"link":{
				"tag":"div",
				"classes":[
					"row",
					"atoz"
				],
				"subtag":"a",
				"subAttribute":"href"
			}
		}
	},
  "units":{
    "teaspoon":["teaspoon","teaspoons"],
    "tablespoon":["tablespoon","tablespoons","T", "tbl.", "tbs.","tbsp."],
    "fluid ounce":["fluid ounce","fluid ounces","fl oz"],
    "gill":["gill","gills"],
    "cup":["cup","cups","c"],
    "pint":["pint","pints","p", "pt","fl pt"],
    "quart":["quart","quarts","q", "qt","fl qt"],
    "gallon":["gallon","gallons","g","gal"],
    "ml":["ml", "milliliter", "milliliters", "millilitre","millilitres", "cc"],
    "l":["l", "liter","liters", "litre","litres","L"],
    "dl":["dl","deciliter","deciliters","decilitre","decilitres","dL"],
    "pound":["pound","pounds","lb","#"],
    "ounce":["ounce","ounces","oz"],
    "mg":["mg","milligram","milligrams","milligramme","milligrammes"],
    "g":["g","gram","grams","gramme","grammes"],
    "kg":["kg","kilogram","kilograms","kilogramme","kilogrammes"]
  },
  "itemprop":{
    "timeRequired":{
      "attribute":"content",
      "type":"attribute",
      "parser":function(text) {
        re = /P((\d{1,4})Y)?((\d{1,4})M)?((\d{1,4})D)?T((\d{1,4})H)?((\d{1,3})M)?((\d{1,2})S)?/
        test = text.split(re)
        duration ={
          year:test[2]?test[2]:0,
          month:test[4]?test[4]:0,
          day:test[6]?test[6]:0,
          hour:test[8]?test[8]:0,
          minute:test[10]?test[10]:0,
          second:test[12]?test[12]:0
        }
        return duration
      },
      "push":"single"
    },
    "cookTime":{
      "attribute":"content",
      "type":"attribute",
      "parser":function(text) {
        re = /P((\d{1,4})Y)?((\d{1,4})M)?((\d{1,4})D)?T((\d{1,4})H)?((\d{1,3})M)?((\d{1,2})S)?/
        test = text.split(re)
        duration ={
          year:test[2]?test[2]:0,
          month:test[4]?test[4]:0,
          day:test[6]?test[6]:0,
          hour:test[8]?test[8]:0,
          minute:test[10]?test[10]:0,
          second:test[12]?test[12]:0
        }
        return duration
      },
      "push":"single"
    },
    "prepTime":{
      "attribute":"content",
      "type":"attribute",
      "parser":function(text) {
        re = /P((\d{1,4})Y)?((\d{1,4})M)?((\d{1,4})D)?T((\d{1,4})H)?((\d{1,3})M)?((\d{1,2})S)?/
        test = text.split(re)
        duration ={
          year:test[2]?test[2]:0,
          month:test[4]?test[4]:0,
          day:test[6]?test[6]:0,
          hour:test[8]?test[8]:0,
          minute:test[10]?test[10]:0,
          second:test[12]?test[12]:0
        }
        return duration
      },
      "push":"single"
    },
    "totalTime":{
      "attribute":"content",
      "type":"attribute",
      "parser":function(text) {
        re = /P((\d{1,4})Y)?((\d{1,4})M)?((\d{1,4})D)?T((\d{1,4})H)?((\d{1,3})M)?((\d{1,2})S)?/
        test = text.split(re)
        duration ={
          year:test[2]?test[2]:0,
          month:test[4]?test[4]:0,
          day:test[6]?test[6]:0,
          hour:test[8]?test[8]:0,
          minute:test[10]?test[10]:0,
          second:test[12]?test[12]:0
        }
        return duration
      },
      "push":"single"
    },
    "cookingMethod":{},
    "nutrition":{},
    "recipeCategory":{
      "push":"multiple"
    },
    "recipeCuisine":{},
    "ingredients":{
      "selector":"div",
      "type":"ingredient",
      "parser":function(text) {
        ingredient = {
          fullText:"",
          quantity:0,
          name:"",
          order:0,
          adjective:[],
          measurement:"",
          other:[]
        }
        ingredient.fullText = text
        quantityRE = /([0-9]*)?[ ]?([0-9]*\/[0-9]*)?/
        obj = text.match(quantityRE)[0].trim()
        objSplit = obj.split(" ")
        quantity = 0
        for (var i = 0; i < objSplit.length; i++) {
          if (objSplit[i].indexOf("/")>0) {
            fraction = objSplit[i].split("/")
            quantity = quantity + (fraction[0]/fraction[1])
          } else {
            quantity = quantity + Number(objSplit[i].trim())
          }
        }
        ingredient.quantity = quantity;
        OtherRE = /([0-9]*)?[ ]?([0-9]*\/[0-9]*)? /
        Words = text.replace(OtherRE,"").split(" ")
        // console.log(obj.replace(OtherRE,"test"))
        for ( k in RecipeFinder.units) {
          if (RecipeFinder.units[k].indexOf(Words[0])>-1) {
            ingredient.measurement = k;
            break;
          } else {
            ingredient.measurement = "other";
          }
        }
        if(ingredient.measurement == "other"){
          ingredient.other = Words
        } else {
          ingredient.other = Words
          ingredient.other.shift()
        }
        return ingredient
      },
      "push":"multiple"
    },
    "recipeInstructions":{
      "selector":"p",
      "type":"paragraphs",
      "parser":function(text) {
        return text
      },
      "push":"single"
    },
    "recipeYield":{
      "attribute":"content",
      "type":"attribute",
      "parser":function(text) {
        return text
      },
      "push":"single"
    },
    "Properties from CreativeWork":{},
    "about":{},
    "accessibilityAPI":{},
    "accessibilityControl":{},
    "accessibilityFeature":{},
    "accessibilityHazard":{},
    "accountablePerson":{},
    "aggregateRating":{},
    "alternativeHeadline":{},
    "associatedMedia":{},
    "audience":{},
    "audio":{},
    "author":{
      "type":"author",
      "parser":function(text) {
        return text
      },
      "push":"single"
    },
    "award":{},
    "character":{},
    "citation":{},
    "comment":{},
    "commentCount":{},
    "contentLocation":{},
    "contentRating":{},
    "contributor":{},
    "copyrightHolder":{},
    "copyrightYear":{},
    "creator":{},
    "dateCreated":{},
    "dateModified":{},
    "datePublished":{},
    "discussionUrl":{},
    "editor":{},
    "educationalAlignment":{},
    "educationalUse":{},
    "encoding":{},
    "exampleOfWork":{},
    "fileFormat":{},
    "genre":{},
    "hasPart":{},
    "headline":{},
    "inLanguage":{},
    "interactionStatistic":{},
    "interactivityType":{},
    "isBasedOnUrl":{},
    "isFamilyFriendly":{},
    "isPartOf":{},
    "keywords":{},
    "learningResourceType":{},
    "license":{},
    "locationCreated":{},
    "mainEntity":{},
    "mentions":{},
    "offers":{},
    "position":{},
    "producer":{},
    "provider":{},
    "publication":{},
    "publisher":{},
    "publishingPrinciples":{},
    "recordedAt":{},
    "releasedEvent":{},
    "review":{},
    "schemaVersion":{},
    "sourceOrganization":{},
    "text":{},
    "thumbnailUrl":{},
    "translator":{},
    "typicalAgeRange":{},
    "version":{},
    "video":{},
    "workExample":{},
    "Properties from Thing":{},
    "additionalType":{},
    "alternateName":{},
    "description":{
      "type":"attribute",
      "parser":function(text) {
        return text
      },
      "push":"single"
    },
    "image":{},
    "mainEntityOfPage":{},
    "name":{},
    "potentialAction":{},
    "sameAs":{},
    "url":{
      "type":"url",
      "parser":function(text) {
        return text
      },
      "push":"single"
    }
  },
	"recipe":[],
  databaseInsert:function(name,url) {
    var recipeItem = new recipesDB({name:name,
      url:url});
    recipeItem.save(function(err,recipeItem) {
      if (err) return console.error(err);
      // console.dir(recipeItem);
    })
  },
	RecipeLocationPull:function() {
		console.log('It\'s working')
		request(RecipeFinder.urls.initial, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(body),
				page = RecipeFinder.selectors.index.pages.tag+'.'+RecipeFinder.selectors.index.pages.classes.join('.'),
				nextPage = RecipeFinder.selectors.index.nextPage.tag+'.'+RecipeFinder.selectors.index.nextPage.classes.join('.'),
				nextPagesub = RecipeFinder.selectors.index.nextPage.subTag+'.'+RecipeFinder.selectors.index.nextPage.subClasses.join('.'),
				recipes = RecipeFinder.selectors.index.link.tag+'.'+RecipeFinder.selectors.index.link.classes.join('.'),
				letters = $(page).find('li');
				// console.log(page,nextPage,nextPagesub)
				// recipe on page
				letters.each(function(i, elem) {
					RecipeFinder.pages.push($(this).find('a').attr('href'));
				})
				// console.log(RecipeFinder.pages.length) // Prints the number of letter sections that are grabbed
				// recipes in letters
				for (var i = 0; i < RecipeFinder.pages.length; i++) {
					// console.log(RecipeFinder.urls.base + RecipeFinder.pages[i]) // Prints each of the sections for the letters
					// Go to each letter section
					request(RecipeFinder.urls.base + RecipeFinder.pages[i], function (error, response, body) {
						if (!error && response.statusCode == 200) {
							var $ = cheerio.load(body);
								res = response.req.path
								res = res.split('.')
							// console.log(res)
							lastPage = Number($(nextPage).find(nextPagesub).parent().prev().text())
							i = 1;
							do {
								try {
									res[2]=i;
									newurl = res.join('.')
								} catch (e) {
									res[2]=1;
									newurl = res.join('.')
								}
								// console.log(newurl);
								request(RecipeFinder.urls.base + newurl, function (error, response, body) {
									if (!error && response.statusCode == 200) {
										var $ = cheerio.load(body)
										recipeList = $(recipes).find('li')
										recipeList.each(function(i, elem) {
											var recipeURl = RecipeFinder.urls.base + $(this).find('a').attr('href'),
													recipeName = $(this).find('a').text();
                      RecipeFinder.databaseInsert(recipeName,recipeURl);
										})
									}
								})
								i++;
							} while (i <= lastPage);
						}
					});

				}
			}
		});
	},
  init:function() {
    recipesDB.find(function(err,movies) {
      if (err) return console.error(err);
      for (var i = 0; i < movies.length; i=i+10) {
        setInterval(RecipeFinder.delayFunction(i,movies),1000)
      }
    })
  },
  delayFunction:function (i,array) {
    for (var j = i; j < i+10 && j < array.length; j++) {
      console.log(array[j].url)
    }
  },
  recipeParser:function () {
    recipesDB.random({cache:true,parsed:false},function (err,recipe) {
      if (err) return console.log(err);
      try {
        var $ = cheerio.load(recipe.body)
        items = $("[itemprop]")
        items.each(function(i,elem) {
          try {
            type = $(this).attr('itemprop')
            selector = RecipeFinder.itemprop[type].selector
            switch (RecipeFinder.itemprop[type].type) {
              case "ingredient":
                text = $(this).text()
                text = RecipeFinder.itemprop[type].parser(text);
                break;
              case "text":
                text = $(this).text()
                text = RecipeFinder.itemprop[type].parser(text);
                break;
              case "attribute":
                text = $(this).attr('content')
                text = RecipeFinder.itemprop[type].parser(text);
                break;
              case "paragraphs":
                text = $(this).find(selector).text()
                break;
              case "url":
                text = $(this).attr('href')
                break;
              case "author":
                text = $(this).find('[itemprop="name"]').text()
                break;
              case "author":
                text = $(this).attr('content')
                break;
              default:
                text = $(this).text()
            }
            console.log(type, text);
            if (RecipeFinder.itemprop[type].push == "single") {
              recipe.recipe[type] = text
            } else if (RecipeFinder.itemprop[type].push == "multiple") {
              recipe.recipe[type].push(text)
            }
          } catch (e) {
          } finally {
            recipe.parsed = true
            recipe.save(function (err) {})
            RecipeFinder.recipeParser()
          }
        })
        // I don't think that this one is needed
        // recipe.save(function (err) {})
    } catch (e) {
      console.log(recipe.name);
      console.error(e);
    } finally {

    }
  })
};
try {
  RecipeFinder.recipeParser()
} catch (e) {

} finally {
  // mongoose.connection.close()
}
