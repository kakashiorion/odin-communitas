import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200,
  },
  description: {
    type: String,
  },
  communityId: {
    type: mongoose.Schema.Types.ObjectId, //Community in which the post was made
    required: true,
  },
  posterId: {
    type: mongoose.Schema.Types.ObjectId, //Original Poster
    required: true,
  },
  attachmentLink: {
    type: String,
    default:""
  },
  upvotersId: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [], //Users who upvoted the post
  },
  downvotersId: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [], //Users who downvoted the post
  },
  commentsId: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [], //All the comments on this post
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
