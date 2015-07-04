 // app/initdb.js

var Thing = require('./models/thing');
Thing.remove({}, function () { });

var collection = require('../data/collection');

for (var i=0; i<collection.length; i++) {
  var nextThing = Thing(collection[i]);
  nextThing.save(function(err) {
	  if (err) throw err;
	});
}

var Page = require('./models/page');
Page.remove({}, function () { });

var pages = require('../data/pages');

for (var i=0; i<pages.length; i++) {
  var nextPage = Page(pages[i]);
  nextPage.save(function(err) {
	  if (err) throw err;
	});
}


