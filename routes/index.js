import express from "express";
import {
  indexPageGet,
  signUpGet,
  signUpPost,
  logInGet,
  logInPost,
  logOut,
} from "../controllers/indexController.js";

const indexRouter = express.Router();

indexRouter.get("/", indexPageGet);
indexRouter.get("/sign-up", signUpGet);
indexRouter.post("/sign-up", signUpPost);
indexRouter.get("/log-in", logInGet);
indexRouter.post("/log-in", logInPost);
indexRouter.get('/log-out',logOut);

export default indexRouter;
