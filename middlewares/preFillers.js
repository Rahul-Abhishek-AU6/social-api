import { catchAsyncError } from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";

export const PreFillAuthorId = (req, res, next) => {
  req.body.author = req.loggedUser._id;
  next();
};

export const PreFillComment = (req, res, next) => {
  if (!req.params.id) {
    return res.send("Please Provide PostId");
  }

  req.body.postId = req.params.id;
  req.body.commenter = req.loggedUser._id;

  next();
};

export const preFillLiker = (req, res, next) => {
  if (!req.params.id) return next(new AppError("Please Provide PostId", 422));
  req.body.postId = req.params.id;
  req.body.likedBy = req.loggedUser._id;
  next();
};
