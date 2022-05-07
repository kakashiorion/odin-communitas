import dbConnect from "../../../../util/mongo";
import Comment from "../../../../models/Comment";

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const comments = await Comment.find({ parentCommentId: id });
      res.status(200).json(comments);
      break;
  }
}
