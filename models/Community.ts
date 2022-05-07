import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 60,
  },
  description: {
    type: String,
    required: true,
    maxlength: 300,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Community ||
  mongoose.model("Community", CommunitySchema);
