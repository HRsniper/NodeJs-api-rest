import { Router } from "express";

import { userController } from "./controllers/UserController.js";

export const routes = Router();

routes.get("/", (request, response) => {
  response.status(200).json({ server: "ok" });
});

routes.post("/register", userController.create);
