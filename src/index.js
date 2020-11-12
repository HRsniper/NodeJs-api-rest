import express from "express";
import dotenv from "dotenv";

import { routes } from "./routes.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(routes);

server.listen(3000, () => console.log("server ok"));
