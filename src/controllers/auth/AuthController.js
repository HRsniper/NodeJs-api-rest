import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { User } from "../../models/User.js";
import { transport } from "../../config/nodemailer.js";
import { YourToken } from "../../mail-template/forgot-password.js";

class AuthController {
  async auth(request, response) {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) return response.status(404).json({ error: "user not exists" });

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) return response.status(404).json({ error: "invalid password" });

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

      let message = {
        from: "HR <sender@example.com>",
        to: `${email}`,
        subject: "Your Token ✔",
        text: `${YourToken(token)}`,
        html: `${YourToken(token)}`,
      };

      // const info = await transport.sendMail(message, (error, info) => {
      await transport.sendMail(message, (error, info) => {
        // console.log("ERRO", error);
        // console.log("INFO", info);

        if (error) return response.status(400).json({ error: "cannot send forgot password" });

        return response.status(200).json({
          email: "email sent",
          messageId: info.messageId,
          previewUrl: nodemailer.getTestMessageUrl(info),
        });
      });

      // return response.status(200).json({ token, expiresToken });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async resetPassword(request, response) {
    try {
      const { email, token, password } = request.body;

      const user = await User.findOne({ email }).select("+passwordResetToken passwordResetExpires");

      if (!user) return response.status(404).json({ error: "user not exists" });

      if (token !== user.passwordResetToken) return response.status(404).json({ error: "token invalid" });

      const now = new Date();

      if (now > user.passwordResetExpires)
        return response.status(400).json({ error: "token expired,generate a new token" });

      user.password = password;

      await user.save();

      return response.status(200).json({ password: "password reseted" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
