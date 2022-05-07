import passport from "passport";
import dbConnect from "../../../../util/mongo";
import "../../../../util/passportAuth";

export default async function googleHandler(req: any, res: any, next: any) {
  await dbConnect();
  passport.authenticate("google", {
    scope: ["profile"],
    session: false,
  })(req, res, next);
}
