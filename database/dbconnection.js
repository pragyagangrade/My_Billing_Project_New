const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/BillingProjectnew",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log(err));


  // new comment
