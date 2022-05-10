import dbConnect from "../../../util/mongo";
import User from "../../../models/User";

export default async function handler(req: any, res: any) {
  const { method, body } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const users = await User.find();
      res.status(200).json(users);
      break;
  }
}
