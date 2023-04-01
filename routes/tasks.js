const { Task, validate } = require("../models/task");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

const { mongoose } = require("mongoose");
const _ = require("lodash");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let task = await Task.findOne({ title: req.body.title });
  if (task) return res.status(400).send("task already exist with same name");

  task = new Task(_.pick(req.body, ["title", "createdBy", "inSpace","takenBy"]));


  taskResult = await task.save();

  res.send(taskResult);
});

router.post("/gettasks", auth, async (req, res) => {
  let tasks = await Task.find({ inSpace: req.body.inSpace });
  if (!tasks) return res.status(400).send("no task in this task");

  res.send(tasks);
});

router.get("/complete/:id", auth, async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send("task with given id not exist");

  task.isComplete = true;
  task.save();

  res.send(task);
});
router.post("/taken/:id", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send("task with given id not exist");

  task.set({
  takenBy: req.body.email
  })
    
 
 const result = await task.save()
 console.log(result)

  res.send(result);
});

router.delete("/:id", auth, async (req, res) => {
  // ojbect id validation
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invlaid task id ");

  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

module.exports = router;
