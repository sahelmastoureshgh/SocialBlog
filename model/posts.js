var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
  /**
   * Posts Schema
   */

var postSchema = new Schema({
    body: {type : String, default : '', trim : true},
    user: {type : Schema.ObjectId, ref : 'User'},
    //tags: {type: [], get: getTags, set: setTags},
    createdAt  : {type : Date, default : Date.now}
  })
  


  

  mongoose.model('Posts', postSchema)  