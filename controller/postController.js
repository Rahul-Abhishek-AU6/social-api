import { Post, Comment, Like } from "../model/postsModel";
import {
  createDocument,
  deleteDocumentById,
  getAllDocuments,
} from "../handlers/factoryHandler";

import { preCheckIfPostbelongsTo } from "../middlewares/preCheck";

export {
  PreFillAuthorId,
  PreFillComment,
  preFillLiker,
} from "../middlewares/preFillers";
export { protectRoute } from "./userController";

export const addNewPost = createDocument(Post, {
  message: "Post Added successfully",
});

export const getAllPost = getAllDocuments(Post, {
  message: "List of Posts",
});

export const doestPostBelongsTo = preCheckIfPostbelongsTo(Post);
export const deletePostById = deleteDocumentById(Post, {
  message: "Post Deleted successfully",
});

export const commentonPost = createDocument(Comment, {
  message: "Commented successfully",
});

export const likeOnPost = createDocument(Like, {
  message: "Liked successfully",
});
