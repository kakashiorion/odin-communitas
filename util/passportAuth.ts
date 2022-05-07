import passport from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { Profile, Strategy as GithubStrategy } from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";
import { UserType as UserType } from "./types";
import User from "../models/User";

passport.use(
  "local",
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err: any, user: any) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const obj = await User.findOne({ googleId: profile.id });
      if (!obj) {
        // create new user
        console.log({ profile });

        const newUser: UserType = await User.create({
          username: profile.username!,
          googleId: profile.id,
          accessToken: accessToken,
          tokens: [],
        });
        const token = jwt.sign(
          {
            id: newUser._id,
            created: Date.now().toString(),
          },
          process.env.JWT_SECRET!
        );
        newUser.tokens.push(token);
        await User.findByIdAndUpdate(newUser._id, newUser);
        done(null, newUser, { message: "Auth successful", token });
      } else {
        // login existing user
        const token = await jwt.sign(
          {
            id: obj._id,
            created: Date.now().toString(),
          },
          process.env.JWT_SECRET!
        );
        obj.tokens.push(token);
        await User.findByIdAndUpdate(obj._id, obj);
        done(null, obj, { message: "Auth successful", token });
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/api/auth/github/callback",
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) {
      const obj = await User.findOne({ githubId: profile.id });
      if (!obj) {
        // create new user
        const newUser: UserType = await User.create({
          username: profile.username!,
          githubId: profile.id,
          accessToken: accessToken,
          tokens: [],
        });
        const token = jwt.sign(
          {
            id: newUser._id,
            created: Date.now().toString(),
          },
          process.env.JWT_SECRET!
        );
        newUser.tokens.push(token);
        await User.findByIdAndUpdate(newUser._id, newUser);
        done(null, newUser, { message: "Auth successful", token });
      } else {
        // login existing user
        const token = await jwt.sign(
          {
            id: obj._id,
            created: Date.now().toString(),
          },
          process.env.JWT_SECRET!
        );
        obj.tokens.push(token);
        await User.findByIdAndUpdate(obj._id, obj);
        done(null, obj, { message: "Auth successful", token });
      }
    }
  )
);
