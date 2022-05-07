import passport from "passport";
import dbConnect from "../../../../util/mongo";
import "../../../../util/passportAuth";

export default async function githubHandler(req: any, res: any, next: any) {
  await dbConnect();
  passport.authenticate("github", {
    scope: ["user:email"],
    session: false,
  })(req, res, next);
}
