import mongoose from "mongoose";
import moment from "moment";

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  posterId: {
    type: mongoose.Schema.Types.ObjectId, //Post in which the comment was made
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId, //Post in which the comment was made
    required: true,
  },
  parentCommentId: {
    type: String, //Parent Comment for which this comment was a reply, if any
    default: "",
  },
  upvotersId: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [], //Users who upvoted the comment
  },
  downvotersId: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [], //Users who downvoted the comment
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
