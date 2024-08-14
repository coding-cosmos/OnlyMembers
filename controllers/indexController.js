import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import db from "../db/queries.js";

export const indexPageGet = (req, res, next) => {
  res.render("index", { title: "OnlyMembers" });
};

export const signUpGet = (req, res) => {
  res.render("sign-up-form");
};

export const signUpPost = [
  body("firstname", "First name must be provided")
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .escape()
    .isString(),

  body("lastname").optional().trim().escape().isString(),

  body("username", "Username must be provided")
    .trim()
    .notEmpty()
    .isEmail()
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Min password length should be 8!")
    .escape(),

  body("confirmpassword")
    .custom((value, { req }) => {
      return value == req.body.password;
    })
    .withMessage("Passwords did not match!"),

  expressAsyncHandler(async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          next(err);
        }
        await db.insertUser(
          req.body.firstname,
          req.body.lastname,
          req.body.username,
          hashedPassword
        );
      });
      res.redirect("/log-in");
    } else {
      console.log(result.array());
      res.render("sign-up-form", { errors: result.array() });
    }
  }),
];

export const logInGet = (req, res) => {
  res.render("log-in");
};
