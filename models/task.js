const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  createdBy: {
    type: String,
    required: true,
  },
  takenBy: {
    type: String,
   

  },

  
  isComplete: {
    type: Boolean,
    required: true,
    default: false
  },
  inSpace:{
    type:String,
    required:true,
  },
 
});

const Task = mongoose.model("Task", taskSchema);

function validateUser(task) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(225).required(),
    createdBy: Joi.string().required(),
    takenBy: Joi.string().email(),
  
    isComplete:Joi.boolean(),
    inSpace:Joi.string().required(),
    

 });
  const validation = schema.validate(task);

  return validation;

  //   return Joi.validate(user, schema);
}

exports.Task = Task;
exports.validate = validateUser;
