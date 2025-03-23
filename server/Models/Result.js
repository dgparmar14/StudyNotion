const { default: mongoose } = require("mongoose");

const resultSchema = mongoose.Schema({
   userId : {
      type : mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
   },
   quiz : {
      type : mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"Quiz"
   },
   percentage : {
      type: Number,
      required: true,
   },
   isPassed : {
      type:Boolean,
      required : true
   },
   createdAt : {
      type : Date,
      default:Date.now(),
      immutable:true
   },
   modifiedAt : {
      type: Date,
      default:Date.now(),
   }
})

resultSchema.pre("save", (next) => {
   this.modifiedAt = Date.now()
   next()
})
module.exports = mongoose.model("Result", resultSchema);