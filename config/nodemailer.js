const nodemailer = require("nodemailer");
require("dotenv").config(); //colocamos las variables de entorno en la carpeta donde se van a utilizar, para evitar que se corran en diferido y generen un error



const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  });

module.exports = transport;