// import express from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
class UserController {
  async create(request, response) {
    try {
      const { email } = request.body;

      const emailExists = await User.findOne({ email });

      if (emailExists) return response.status(404).json({ error: "user already exists" });

      const user = await User.create(request.body);

      user.password = undefined;

      const payload = { id: user.id };

      const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });

      return response.status(200).json({ user, token });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export const userController = new UserController();
