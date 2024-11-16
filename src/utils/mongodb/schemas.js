import mongoose, { Schema } from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, transformed) => {
    delete transformed._id;
    delete transformed.__v;
  },
});

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => v.trim().length > 0,
        message: "id is required",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: (v) => v.trim().length > 0,
        message: "username is required",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v) => v.trim().length > 0,
        message: "password is required",
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

export { User };
