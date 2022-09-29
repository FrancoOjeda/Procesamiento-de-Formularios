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
    

    /* declaramos una funcion anonima que va a ejecutar el validationRules */
    (req, res, next) =>{
    /*
      vamos a  hallar errores de validacion en la request y los vamos a envolver en un objeto de express-validator que tiene funciones útiles para tratar con ellos
       */
      const errors = validationResult(req);
    
      if(!errors.isEmpty()){
        const formData = req.body
        const arrWarming = errors.array();//si no hay errores, esta constante no se crea
        res.render("form", { arrWarming, formData })
        console.log(arrWarming)
    } else return next(); //la funcion next ordena que se continue con el siguiente paso.
}
]

module.exports = validationRules;
