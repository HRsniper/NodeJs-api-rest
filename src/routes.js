import { Router } from "express";

import { authController } from "./controllers/AuthController.js";
import { userController } from "./controllers/UserController.js";
import { projectController } from "./controllers/ProjectController.js";
import { AuthMiddleware } from "./middlewares/AuthMiddleware.js";

export const routes = Router();

routes.get("/", (request, response) => {
  console.log("server ok");
  response.status(200).json({ server: "ok" });
});

routes.post("/register", userController.create);

routes.post("/auth", authController.auth);

routes.get("/authenticated", AuthMiddleware, authController.authenticated);

routes.post("/forgotpassword", AuthMiddleware, authController.forgotPassword);

routes.post("/resetpassword", AuthMiddleware, authController.resetPassword);

routes.post("/projects", AuthMiddleware, projectController.create);
routes.get("/projects", AuthMiddleware, projectController.list);
routes.get("/projects/:id", AuthMiddleware, projectController.show);
routes.put("/projects/:id", AuthMiddleware, projectController.update);
routes.delete("/projects/:id", AuthMiddleware, projectController.delete);
