const { default: mongoose } = require("mongoose");

const categoryRequest = new mongoose.Schema({
   createdBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true
   },
   createdOn : {
      type : Date,
      require : true,
      default : Date.now()
   },
   status : {
      type : String,
      required : true,
      enum : ["approved", "rejected", "cancel", "pending"]
   },
   categoryName : {
      type : String,
      required : true,
   }
})

module.exports = mongoose.model("CategoryRequest", categoryRequest)
