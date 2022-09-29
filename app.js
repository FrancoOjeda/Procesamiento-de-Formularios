const express = require("express");
const hbs = require("express-handlebars");

const app = express();
const PORT = 3000;

const router = require("./routes/routeForm.js")
// variables globales, accesibles en todas las vistas, útiles para un redirect, por ej.
app.locals.sendMailFeedBack

app.engine(".hbs", hbs.engine({ extname: "hbs"}));
app.set('view engine', 'hbs');
app.set('views', (__dirname+ '/views'));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

// Definimos quien va a procesar el formulario
app.use("/form", router)

app.get("/", (req, res) => {
    res.render("home")
})

app.use("*", (req, res) => {
    res.write("<h1>Error</h1>")
})
app.listen(PORT, (err) => {
    !err ? console.log(`Running on http://localhost:${PORT}`) : console.log(err.code);
});
