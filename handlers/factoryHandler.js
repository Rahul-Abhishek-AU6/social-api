import { AppError } from "../utils/AppError";
import { catchAsyncError } from "../utils/catchAsyncError";

export const createDocument = (ModelName, responseObj) =>
  catchAsyncError(async (req, res, next) => {
    const docs = await ModelName.create(req.body);

    if (!docs) return next(new AppError("Request Failed", 500));

    res.status(201).json({
      message: responseObj.message,
      details: docs,
    });
  });

export const getAllDocuments = (ModelName, responseObj) =>
  catchAsyncError(async (req, res, next) => {
    const docs = await ModelName.find();

    if (!docs) return next(new AppError("No Documents Found", 200));

    res.status(302).json({
      resultsFound: docs.length,
      message: responseObj.message,
      details: docs,
    });
  });

export const deleteDocumentById = (ModelName, responseObj) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.params.id)
      return next(new AppError("Please Enter Id To Delete", 422));

    const docs = await ModelName.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: responseObj.message,
      deletedDetails: docs,
    });
  });
