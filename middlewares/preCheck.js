import { AppError } from "../utils/AppError";
import { catchAsyncError } from "../utils/catchAsyncError";

export const preCheckIfPostbelongsTo = (ModelName) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.params.id)
      return next(new AppError("Please Enter Id To Delete", 422));

    const docx = await ModelName.findById(req.params.id);

    if (!docx) return next(new AppError("No Posts Found With Given Id", 200));

    if (String(docx.author._id) != String(req.loggedUser._id))
      return next(new AppError("This Post Doesn't Belongs To you", 403));

    next();
  });
