const mongoose = require("mongoose");



module.exports = function () {
  mongoose.set("strictQuery", false);

  mongoose
    .connect("mongodb://0.0.0.0:27017/taskmaster",{ useUnifiedTopology: true } )
    .then(() => {
        
      console.log("connected to mongodb");
    }).catch((ex)=>{
      console.log("my error",ex)
    })

};
