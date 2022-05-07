import dbConnect from "../../../util/mongo";
import User from "../../../models/User";

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    method,
    body,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const user = await User.findById(id);
      res.status(200).json(user);
      break;
    case "PUT":
      const updatedUser = await User.findByIdAndUpdate(id, body);
      res.status(201).json(updatedUser);
      break;
    case "DELETE":
      const deletedUser = await User.findByIdAndRemove(id, body);
      res.status(201).json(deletedUser);
      break;
  }
}
