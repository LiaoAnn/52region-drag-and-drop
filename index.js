const express = require("express");
const api = require("./api");
const ADDRESS = "0.0.0.0";
const PORT = 8080;
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use("/", express.static("public"));

app.use("/api", api.router);
app.listen(PORT, ADDRESS, () => {
    console.log(`App is running at ${PORT} port.`);
})