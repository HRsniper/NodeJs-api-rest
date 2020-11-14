import bcrypt from "bcrypt";

import mongoose from "../database/index.js";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
  created_at: { type: Date, default: Date.now() },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, Number(process.env.SALTROUNDS));

  this.password = hash;

  next();
});

export const User = mongoose.model("User", UserSchema);
