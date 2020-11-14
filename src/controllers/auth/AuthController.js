import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/User.js";

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
}

export const authController = new AuthController();
