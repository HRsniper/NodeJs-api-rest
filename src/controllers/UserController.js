// import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { User } from "../models/User.js";
import { transport } from "../config/nodemailer.js";

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

  async forgotPassword(request, response) {
    try {
      const { email } = request.body;

      const user = await User.findOne({ email });

      if (!user) return response.status(404).json({ error: "user not exists" });

      const token = crypto.randomBytes(24).toString("hex");

      const expiresToken = new Date();
      expiresToken.setHours(expiresToken.getHours() + 1);

      await User.findByIdAndUpdate(user.id, {
        $set: { passwordResetToken: token, passwordResetExpires: expiresToken },
      });

      await transport.sendMail(
        {
          to: email,
          from: "herculesgamerrw@gmail.com",
          template: "/forgot-password",
          // subject: "Forgot password",
          // text: "Your password",
          // html: `<p>${token}</p>`,
          context: { token },
        },
        (error) => {
          console.log(error);
          if (error) return response.status(400).json({ error: "cannot send forgot password" });
          return response.status(200).json({ email: "email sent" });
        }
      );

      return response.status(200).json({ token, expiresToken });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export const userController = new UserController();
