const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
  },
   id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
   }
});

module.exports = mongoose.model("Posts", PostSchema);
