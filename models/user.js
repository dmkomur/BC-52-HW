import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";
import { string } from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: { type: string, required: true },
    email: { type: string, required: true, match: emailRegexp, unique: true },
    password: { type: string, required: true, minlegth: 6 },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", runValidateAtUpdate);

userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
