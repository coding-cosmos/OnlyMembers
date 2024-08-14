import express from "express";
import {
  indexPageGet,
  signUpGet,
  signUpPost,
  logInGet,
  logInPost,
} from "../controllers/indexController.js";

const indexRouter = express.Router();

indexRouter.get("/", indexPageGet);
indexRouter.get("/sign-up", signUpGet);
indexRouter.post("/sign-up", signUpPost);
indexRouter.get("/log-in", logInGet);
indexRouter.post("/log-in", logInPost);

export default indexRouter;
