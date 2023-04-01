const mongoose = require("mongoose");
const Joi = require("joi");

const spaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  createdBy: {
    type: String,
    required: true,
  },
  member: {
    type: Array,
    required: true,
  },

  task: {
    type: Array,

  },
  code: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
  },
  
});

const Space = mongoose.model("Space", spaceSchema);

function validateUser(space) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    createdBy: Joi.string().min(5).max(255).required(),
    member: Joi.array().items(Joi.string().email()),
    task: Joi.array().items(Joi.string()),
    code: Joi.string().min(6).max(6),
  
  });
  const validation = schema.validate(space);

  return validation;
 
  //   return Joi.validate(user, schema);
}


exports.Space = Space;
exports.validate = validateUser;
