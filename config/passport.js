import pkg from "passport-local";
import db from "../db/queries.js";
import bcrypt from "bcryptjs";

export default (passport) => {
  const LocalStrategy = pkg.Strategy;

  const verifyCallback = async (username, password, done) => {
    const user = await db.findUser(username);
    if (!user) {
      return done(null, false);
    }
    const isValid = await bcrypt.compare(password, user.password.toString());
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  };

  const strategy = new LocalStrategy(verifyCallback);
  passport.use(strategy);
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await db.findUserById(userId);
      if (user) {
        done(null, user);
      }
    } catch (err) {
      done(err);
    }
  });
};
