const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
// require("dotenv").config()

router.get("/", (req, res) =>{
    res.render("home")
});

//con async definimos un proceso asincronico, lo que nos va a permitir colocar un await mas adelante
router.post("/", async (req, res) =>{
    
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
          user: process.env.user,
          pass: process.env.pass
        }
      });

      //definimos una variable que nos va a guardar el resultado del envio del mail, y le decimos que tiene que esperar ese resultado (await)
    const sendMailStatus = await transport.sendMail(emailMsg)
      let sendMailFeedBack = "";

      if(sendMailStatus.rejected.length){
        sendMailFeedBack = "No se pudo enviar.";
      } else {
        sendMailFeedBack = "Mensaje enviado";
      }

    res.render("home", { mensaje: sendMailFeedBack})
    
    console.log("Entro un formulario");
});

module.exports = router