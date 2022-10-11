//EXPORTAR LAS BIBLIOTECAS
const express = require("express")
const cors = require('cors')
const morgan = require("morgan")

require("dotenv").config()



//INICIALIZAR LA LIBRERÍA
const app = express();

//MIDDLEWARES
app.use(morgan("combined"))
app.use(cors)
app.use(express.json())

//CONFIGURAR EL PUERTO
const port = process.env.PORT || 3000
//ESCUCHAR AL SERVIDOR
app.listen(port,console.log(`servidor en puerto ${port}`))