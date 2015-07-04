// app/models/page.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our page model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('page', {
    id : {type : String, default: ''},
    name : {type : String, default: ''}
});