import dbConnect from "../../../util/mongo";
import Community from "../../../models/Community";

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const community = await Community.findById(id);
      res.status(200).json(community);
      break;
    case "PUT":
      const updatedCommunity = await Community.findByIdAndUpdate(id, req.body);
      res.status(201).json(updatedCommunity);
      break;
    case "DELETE":
      const deletedCommunity = await Community.findByIdAndRemove(id, req.body);
      res.status(201).json(deletedCommunity);
      break;
  }
}
