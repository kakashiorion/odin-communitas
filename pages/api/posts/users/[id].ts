import dbConnect from "../../../../util/mongo";
import Post from "../../../../models/Post";

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const posts = await Post.find({ posterId: id });
      res.status(200).json(posts);
      break;
  }
}
