import { Router } from "express";

import { signUp, signIn } from "../controller/userController";

export const userRouter = Router();

userRouter.route("/signUp").post(signUp);

userRouter.route("/signIn").post(signIn);
