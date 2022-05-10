import dbConnect from "../../../util/mongo";
import Community from "../../../models/Community";

export default async function handler(req: any, res: any) {
  const { method, body } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const communities = await Community.find();
      res.status(200).json(communities);
      break;
    case "POST":
      const createdCommunity = await Community.create(body);
      res.status(200).json(createdCommunity);
      break;
  }
}
