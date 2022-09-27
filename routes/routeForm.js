const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
//importamos body y validationResult de express-validator
const { body, validationResult } = require('express-validator');

//Las reglas de validacion van dentro de un array
const validationRules = [
    body("nombre")
    .notEmpty().withMessage("Campo obligatorio").isLength({min: 2, max: 30}),
    body("apellido")
    .notEmpty().withMessage("Campo obligatorio")
    .isLength({min: 2, max: 30}),
    body("email")
    .notEmpty().withMessage("Campo obligatorio")
    .isEmail().withMessage("Debe ingresar un email válido"),
    body("mensaje")
    .notEmpty().withMessage("").trim(" ")
    .isLength({ min:10 , max: 300}).withMessage("El mensaje debe tener entre 10 y 300 caracteres"),
]


// const validationRules = require("../config/validationRules.js")

//la ruta para el trasport va con ../ ya que hay q salir de la carpeta routes y luego entrar en config
const transport = require("../config/nodemailer.js")

router.get("/", (req, res) =>{
  res.render("home")
});

//con async definimos un proceso asincronico, lo que nos va a permitir colocar un await mas adelante
router.post("/", validationRules ,async (req, res) =>{
 
  /*
  vamos a  hallar errores de validacion en la request y los vamos a envolver en un objeto de express-validator que tiene funciones útiles para tratar con ellos
   */
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    const formData = req.body
    const arrWarming = errors.array();//si no hay errores, esta constante no se crea
    res.render("home", {arrWarming, formData})
    console.log(arrWarming);
  } else {

    const { nombre, apellido, email, password, mensaje} = req.body
    const emailMsg = {
        to: "24martin94@gmail.com",
        from: email,
        subject: "Mensaje desde de formulario de registro",
        html: `Contacto de ${nombre} ${apellido}: ${mensaje}`
    }

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
  }
});

module.exports = router