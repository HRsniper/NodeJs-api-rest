import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

export const transport = nodemailer.createTransport({
  host: process.env.HOSTMAIL,
  port: Number(process.env.PORTMIAL),
  secure: false,
  auth: {
    user: process.env.USERMAIL,
    pass: process.env.PASSMAIL,
  },
});

transport.use(
  "compile",
  hbs({ viewEngine: "handlebars", viewPath: path.resolve("./src/mail-template"), extName: ".html" })
  // hbs({
  //   viewEngine: {
  //     defaultLayout: undefined,
  //     layoutsDir: path.resolve("./src/mail-template/"),
  //     partialsDir: path.resolve("./src/mail-template/"),
  //     extName: ".hbs",
  //   },
  //   viewPath: path.resolve("./src/mail-template/"),
  //   extName: ".hbs",
  // })
);
