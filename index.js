const https = require("https");
const bodyParser = require("body-parser");
const express = require("express");
const { acceptsLanguages } = require("express/lib/request");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("style"));
require('dotenv').config();

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    var lati = Number(req.body.lat);
    var lon = Number(req.body.lot);
    var url = process.env.URL1 + lati + "&lon=" + lon + process.env.URL2;

    https.get(url, function (response) {
        response.on("data", function (data) {
            var dataWeather = JSON.parse(data)
            console.log(`i was called for ${lati}, ${lon}, ${dataWeather.name}`);
            res.write(`<h1>Temperature of ${dataWeather.name} is ${dataWeather.main.temp} and humidity is ${dataWeather.main.humidity} </h1>`);
            res.write(`<h2>Description: ${dataWeather.weather[0].main} ${dataWeather.weather[0].description}</h2>`)
            res.write(data);
            res.send();
        })
    })
});


app.listen(3000, function () {
    console.log("i am a server");
});