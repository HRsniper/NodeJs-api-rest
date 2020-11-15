// import path from "path";
import nodemailer from "nodemailer";
// import hbs from "nodemailer-express-handlebars";

// export const transport = nodemailer.createTransport({
//   host: process.env.HOSTMAIL,
//   port: process.env.PORTMAIL,
//   secure: false,
//   auth: {
//     user: process.env.USERMAIL,
//     pass: process.env.PASSMAIL,
//   },
// });

export const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "damaris3@ethereal.email",
    pass: "hR36kjjU8HTrnzmPnB",
  },
});

// transport.use(
// "compile",
// hbs({ viewEngine: "handlebars", viewPath: path.resolve("./src/mail-template"), extName: ".html" })
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
// );
