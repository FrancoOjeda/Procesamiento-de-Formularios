const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const PORT = 3000;

const router = require("./routes/routeForm.js")


app.engine(".hbs", hbs.engine({ extname: "hbs"}));
app.set('view engine', 'hbs');
app.set('views', (__dirname+ '/views'));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

// Definimos quien va a procesar el formulario
app.use("/", router)

app.listen(PORT, (err) => {
    !err ? console.log(`Running on http://localhost:${PORT}`) : console.log(err.code);
});
