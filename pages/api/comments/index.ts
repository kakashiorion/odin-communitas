import dbConnect from "../../../util/mongo";
import Comment from "../../../models/Comment";

export default async function handler(req: any, res: any) {
  const { method, body } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const Comments = await Comment.find();
      res.status(200).json(Comments);
      break;
    case "Comment":
      const createdComment = await Comment.create(body);
      res.status(201).json(createdComment);
      break;
  }
}
