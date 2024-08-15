import express from "express";
import {
  indexPageGet,
  signUpGet,
  signUpPost,
  logInGet,
  logInPost,
  logOut,
  joinClubGet,
  joinClubPost,
  clubGet
} from "../controllers/indexController.js";

const indexRouter = express.Router();

indexRouter.get("/", indexPageGet);
indexRouter.get("/sign-up", signUpGet);
indexRouter.post("/sign-up", signUpPost);
indexRouter.get("/log-in", logInGet);
indexRouter.post("/log-in", logInPost);
indexRouter.get('/log-out',logOut);
indexRouter.get('/join',joinClubGet);
indexRouter.post('/join',joinClubPost);
indexRouter.get('/club',clubGet);

export default indexRouter;
