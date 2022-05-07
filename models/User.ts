import mongoose from "mongoose";
import moment from "moment";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 30,
  },
  googleId: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  tokens: {
    type: [String],
  },
  githubId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    maxlength: 30,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
  communities: {
    type: [mongoose.Schema.Types.ObjectId], //Communities joined by the user
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [], // Posts by the user
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [], // Comments by the user
  },
  savedPostsId: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [], // Posts by the user
  },
  savedCommentsId: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [], // Comments by the user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.virtual("joinDate").get(function () {
  return moment(this.createdAt).format("DD MMM YYYY");
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
