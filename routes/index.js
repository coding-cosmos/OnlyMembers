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
  clubGet,
  createMessageGet,
  createMessagePost,
  messagesGet
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
indexRouter.get('/create-message',createMessageGet);
indexRouter.post('/create-message',createMessagePost);
indexRouter.get('/messages',messagesGet);

export default indexRouter;
