import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import db from "../db/queries.js";
import passport from "passport";
import { isAuth,isMember } from "../middleware/authMiddleware.js";
import dotenv from 'dotenv';

dotenv.config();

export const indexPageGet = (req, res, next) => {
  res.redirect('/messages');
};

export const signUpGet = (req, res) => {
  res.render("sign-up-form", { errors: null });
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

export const logInPost = passport.authenticate("local", {
  successRedirect: "/create-message",
  failureRedirect: "/",
});

export const logOut = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

export const joinClubGet = [
  isAuth, 
  (req, res) => {
    res.render('join-club',{error:null});
  }
];

export const joinClubPost = [
  isAuth,
  async (req,res)=>{
    if(req.body.passkey == process.env.PASSKEY){
      db.changeStatus(req.user.id,true);
      res.redirect('/club');
    }else{
      res.render('join-club',{error:"Incorrect passkey"});
    }
  }
];

export const clubGet = [
  isMember,
  (req,res)=>{
    res.render('club');
  }
];

export const createMessageGet=[
  isAuth,
  (req,res)=>{
    res.render('new-message',{errors:null});
  }
];

export const createMessagePost=[
  isAuth,
  body('title')
  .trim()
  .notEmpty()
  .escape(),

  body('message')
  .trim()
  .notEmpty()
  .escape(),

  async (req,res)=>{
    const errors = validationResult(req);

    if(errors.isEmpty()){
      await db.addPost(req.body.title,req.body.message,req.user.id);
      res.redirect('/messages');
    }else{
      res.render('new-message',{errors:errors.array()});
    }
  }
];

export const messagesGet= expressAsyncHandler(async(req,res)=>{
  const posts = await db.getPosts();
  res.render('messages',{posts: posts,isMember:req.user?.status});
});