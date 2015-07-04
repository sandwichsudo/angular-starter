// app/models/thing.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our Thing model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Thing', {
    id : {type : String, default: ''},
    title : {type : String, default: ''},
    description : {type : String, default: ''}
});