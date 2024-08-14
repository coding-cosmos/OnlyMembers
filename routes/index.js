import express from "express";
import {
  indexPageGet,
  signUpGet,
  signUpPost,
  logInGet
} from "../controllers/indexController.js";

const indexRouter = express.Router();

indexRouter.get("/", indexPageGet);
indexRouter.get("/sign-up", signUpGet);
indexRouter.post("/sign-up", signUpPost);
indexRouter.get('/log-in',logInGet);

export default indexRouter;
