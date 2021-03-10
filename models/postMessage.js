import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  author: Object,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
