import dbConnect from "../../../util/mongo";
import Post from "../../../models/Post";

export default async function handler(req: any, res: any) {
  const { method, body } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const posts = await Post.find();
      res.status(200).json(posts);
      break;
    case "POST":
      const createdPost = await Post.create(body);
      res.status(200).json(createdPost);
      break;
  }
}
