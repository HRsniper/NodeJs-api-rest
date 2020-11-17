import { Router } from "express";

import { authController } from "./controllers/auth/AuthController.js";
import { userController } from "./controllers/UserController.js";
import { authRoutesController } from "./controllers/AuthRoutesController.js";
import { AuthMiddleware } from "./middlewares/AuthMiddleware.js";

export const routes = Router();

routes.get("/", (request, response) => {
  console.log("server ok");
  response.status(200).json({ server: "ok" });
});

routes.post("/register", userController.create);

routes.post("/auth", authController.auth);

routes.get("/authroutes", AuthMiddleware, authRoutesController.authroutes);

routes.post("/forgotpassword", AuthMiddleware, authController.forgotPassword);

routes.post("/resetpassword", AuthMiddleware, authController.resetPassword);
