const { Space, validate } = require("../models/space");
const { Task } = require("../models/task");
const randomstring = require("randomstring");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const _ = require("lodash");
const {  mongoose } = require("mongoose");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let space = await Space.findOne({ title: req.body.title });
  if (space) return res.status(400).send("space already exist with same name");

  space = new Space(_.pick(req.body, ["title", "createdBy", "member"]));
  let nCode = randomstring.generate({
    length: 6,
    charset: "alphanumeric",
  });
  let code = await Space.findOne({ code: nCode });
  if (code) {
    ncode = randomstring.generate({
      length: 6,
      charset: "alphanumeric",
    });
  }
  space.code = nCode;

  spacaeResult = await space.save();

  res.send(spacaeResult);
});

router.get("/:id", auth, async (req, res) => {
  // object id validatoin
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invlaid sapce id ");

  const space = await Space.findOne({ _id: req.params.id });

  if (!space) return res.status(400).send("space with given id not found ");
  res.send(space);
});

router.post("/member", auth, async (req, res) => {
  let spaces = await Space.find({ member: req.body.email });
  if (!spaces) return res.status(400).send("no space join yet");

  res.send(spaces);
});

router.delete("/:id", auth, async (req, res) => {
  // object id validation
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) 
    return res.status(400).send("invlaid sapce id ");

  let space = await Space.findOne({ _id: req.params.id });
  
  if (!space)
    return res.status(404).send("The space with the given ID was not found.");
    
  await Task.deleteMany({ inSpace: space.title });
  space = await Space.findOneAndDelete({ _id: req.params.id });

  res.send(space);
});

router.post("/joinspace", auth, async (req, res) => {
  try {
    let space = await Space.findOne({ code: req.body.code });

    if (space) {
      space.member.push(req.body.email);
      space.save();
      res.send(space);
    } 

    res.status(400).send("invalid code to join the space");
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

module.exports = router;
