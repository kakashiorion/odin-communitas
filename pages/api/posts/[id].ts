import dbConnect from "../../../util/mongo";
import Post from "../../../models/Post";

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    method,
    body,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const post = await Post.findById(id);
      res.status(200).json(post);
      break;
    case "PUT":
      const updatedPost = await Post.findByIdAndUpdate(id, body);
      res.status(200).json(updatedPost);
      break;
    case "DELETE":
      const deletedPost = await Post.findByIdAndRemove(id);
      res.status(200).json(deletedPost);
      break;
  }
}
