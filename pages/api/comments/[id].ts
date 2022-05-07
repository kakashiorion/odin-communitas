import dbConnect from "../../../util/mongo";
import Comment from "../../../models/Comment";

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    method,
    body,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const comment = await Comment.findById(id);
      res.status(200).json(comment);
      break;
    case "PUT":
      const updatedComment = await Comment.findByIdAndUpdate(id, body);
      res.status(201).json(updatedComment);
      break;
    case "DELETE":
      const deletedComment = await Comment.findByIdAndRemove(id, body);
      res.status(201).json(deletedComment);
      break;
  }
}
