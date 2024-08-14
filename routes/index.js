import express from "express";
import {
  indexPageGet,
  signUpGet,
  signUpPost,
} from "../controllers/indexController.js";

const indexRouter = express.Router();

indexRouter.get("/", indexPageGet);
indexRouter.get("/sign-up", signUpGet);
indexRouter.post("/sign-up", signUpPost);

export default indexRouter;
