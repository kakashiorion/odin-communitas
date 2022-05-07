import { setCookies } from "cookies-next";
import passport from "passport";
import dbConnect from "../../../../util/mongo";
import "../../../../util/passportAuth";

export default async function googleHandler(req: any, res: any, next: any) {
  await dbConnect();
  passport.authenticate("google", (err, user, info) => {
    if (err || !user) {
      return res.redirect("http://localhost:3000/?a=auth_fail");
    }

    // set cookie and send redirect
    setCookies("token", info.token, {
      req,
      res,
    });
    res.redirect("http://localhost:3000/");
  })(req, res, next);
}
