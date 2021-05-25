const express = require("express");
const cors = require("cors")
const cookies = require("cookie-parser");

const port = 8000;
// const db_name = "may_loginreg"

const app = express();

app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}));

app.use(express.json())
app.use(cookies());


//require our mongoose config file and tell it about the db name
require("./server/config/mongoose")

//require our routes and tell it about our app
require("./server/routes/routes")(app)


app.listen(
    port,
    ()=> console.log("listening on port", port)
)
