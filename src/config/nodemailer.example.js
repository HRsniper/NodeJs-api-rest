import nodemailer from "nodemailer";

// export const transport = nodemailer.createTransport({
//   host: `${process.env.HOSTMAIL}`,
//   port: `${Number(process.env.PORTMAIL)}`,
//   secure: false,
//   auth: {
//     user: `${process.env.USERMAIL}`,
//     pass: `${process.env.PASSMAIL}`,
//   },
// });

export const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "YOURUSER@ethereal.email",
    pass: "YOURPASS",
  },
});
