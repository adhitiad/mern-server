import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  author: Object,
  tags: [String],
  image: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
