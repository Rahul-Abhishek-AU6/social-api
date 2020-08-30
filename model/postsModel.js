import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Title for the post"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Description for the Post"],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, "Please Enter Author ID"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

postSchema.plugin(mongooseUniqueValidator);

postSchema.pre(/^find/, function (next) {
  this.populate({
    model: "User",
    path: "author",
    select: ["username"],
  });

  next();
});

export const Post = model("Post", postSchema);

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Please Enter Comment"],
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: [true, "Please Provide PostId"],
    },
    commenter: {
      type: Schema.Types.ObjectId,
      required: [true, "Please Tell Us Who are U"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "postId",
    model: "Post",
  }).populate({
    path: "commenter",
    model: "User",
    select: ["username"],
  });
});

export const Comment = model("Comment", commentSchema);

const likesSchema = new Schema({
  like: {
    type: Boolean,
    default: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: [true, "Please Enter PostId On Which You Licked"],
    unique: true,
  },
  likedBy: {
    type: Schema.Types.ObjectId,
    required: [true, "Please Tell Us Who are U"],
  },
});

export const Like = model("Like", likesSchema);
