const mongoose = require("mongoose");



module.exports = function () {
  mongoose.set("strictQuery", false);

  mongoose
    .connect("mongodb://localhost/taskmaster",{ useUnifiedTopology: true } )
    .then(() => {
        
      console.log("connected to mongodb");
    })

};
