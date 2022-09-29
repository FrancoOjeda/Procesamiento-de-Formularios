const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const validationRules = require("../validator/validationRules.js");

//la ruta para el trasport va con ../ ya que hay q salir de la carpeta routes y luego entrar en config
const transport = require("../config/nodemailer");

router.get("/", (req, res) =>{
  res.render("form")
});

//con async definimos un proceso asincronico, lo que nos va a permitir colocar un await mas adelante
router.post("/", validationRules ,async (req, res) =>{
    const { nombre, apellido, email, password, mensaje} = req.body
    const emailMsg = {
        to: "24martin94@gmail.com",
        from: email,
        subject: "Mensaje desde de formulario de registro",
        html: `Contacto de ${nombre} ${apellido}: ${mensaje}`
    }

      //definimos una variable que nos va a guardar el resultado del envio del mail, y le decimos que tiene que esperar ese resultado (await)
    const sendMailStatus = await transport.sendMail(emailMsg)

      if(sendMailStatus.rejected.length){
        req.app.locals.sendMailFeedBack = "No se pudo enviar.";
      } else {
        req.app.locals.sendMailFeedBack = "Mensaje enviado";
      }
    res.redirect("/")
});

module.exports = router