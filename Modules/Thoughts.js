const { Schema, model } = require('mongoose');


// Schema to create Post model
const thoughtSchema = new Schema(
  {
   
    description: String,
      
    
  },
  
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application

// Initialize our Application model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
