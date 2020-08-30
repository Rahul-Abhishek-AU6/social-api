import { Router } from "express";
import {
  addNewPost,
  protectRoute,
  PreFillAuthorId,
  doestPostBelongsTo,
  deletePostById,
  getAllPost,
  commentonPost,
  PreFillComment,
  preFillLiker,
  likeOnPost,
} from "../controller/postController";

export const postRouter = Router();

postRouter.route("/addNewPost").post(protectRoute, PreFillAuthorId, addNewPost);

postRouter.route("/getposts").get(getAllPost);

postRouter
  .route("/deletePost/:id")
  .delete(protectRoute, doestPostBelongsTo, deletePostById);

postRouter
  .route("/comment/:id/post")
  .post(protectRoute, PreFillComment, commentonPost);

postRouter.route("/like/:id/post").post(protectRoute, preFillLiker, likeOnPost);
