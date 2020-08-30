import { Schema, model } from "mongoose";
import { isAlpha, isEmail } from "validator";
import { hash, genSalt, compare } from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter Name"],
      validate: [isAlpha, "Name Cannot Be Empty"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please Enter Email"],
      validate: {
        validator: function (val) {
          return isEmail(val);
        },
        message: "Enter Correct Email",
      },
    },

    password: {
      type: String,
      required: [true, "Please Provide Password"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please Enter Confirm Password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password Didn't Match",
      },
    },

    passwordModified: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre(`save`, async function () {
  const salt = await genSalt(12);
  const hashed = await hash(this.password, salt);
  this.password = hashed;
  this.confirmPassword = undefined;
});

userSchema.methods.passwordVerify = async function (inputPassword, DBPassword) {
  return await compare(inputPassword, DBPassword);
};

userSchema.methods.isPasswordModified = function (JWTTimeStamp) {
  if (this.passwordModified) {
    return parseInt(this.passwordModified.getTime() / 1000, 10) > JWTTimeStamp;
  }
  return false;
};

export const User = model("User", userSchema);
