const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");


router.get("/", (req, res) =>{
    res.render("home")
});

router.post("/", (req, res) =>{
    
    const { nombre, apellido, email, password, mensaje} = req.body
    const emailMsg = {
        to: "24martin94@gmail.com",
        from: email,
        subject: "Mensaje desde de formulario de registro",
        html: `Contacto de ${nombre} ${apellido}: ${mensaje}`
    }

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0230b5fe15befa",
          pass: "826db73d594008"
        }
      });

    transport.sendMail(emailMsg)

    res.render("home", {mensaje: "Mensaje enviado"})
    
    console.log("Entro un formulario");
});

module.exports = router