import { AppError } from "../utils/AppError";
import { catchAsyncError } from "../utils/catchAsyncError";

import { generateJWToken, verifyJWToken } from "../utils/jwtPromiseFunctions";

export const signUpUser = (ModelName, responseObj) =>
  catchAsyncError(async (req, res, next) => {
    const user = await ModelName.create(req.body);
    if (!user) return next(new AppError("Registration Not Successful", 500));

    const token = await generateJWToken({ id: user._id });

    res.status(201).json({
      message: responseObj.message,
      details: user,
      token,
    });
  });

export const signInUser = (ModelName, responseObj) =>
  catchAsyncError(async (req, res, next) => {
    const user = await ModelName.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      return next(new AppError(`No User Found With Email ${req.body.email}`));
    }
    if (
      !user ||
      !(await user.passwordVerify(req.body.password, user.password))
    ) {
      return next(new AppError("Incorrect Password Entered", 404));
    }

    const token = await generateJWToken({ id: user._id });

    res.status(200).json({
      message: responseObj.message,
      details: user,
      token,
    });
  });

// Will Check Whether User is Logged In Or Not Using Bearer-Token and JWt verify
export const protect = (ModelName) =>
  catchAsyncError(async (req, res, next) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      return next(new AppError("Not Authorized!!!", 401));

    const token = req.headers.authorization.split("Bearer ")[1];
    const decode = await verifyJWToken(token);

    if (!decode) return next(new AppError(`This ${token} is Invalid`));

    const loggedUser = await ModelName.findById({ _id: decode.id });

    if (!loggedUser) return next(new AppError("User Doesn't Exist", 404));

    if (loggedUser.isPasswordModified(decode.iat))
      return next(new AppError("Please Login Again"));

    req.loggedUser = loggedUser;

    next();
  });
