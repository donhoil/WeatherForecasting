const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const apikey = '84c5ddcb40326ac77da76582cec97756';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null})
})

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    console.log(req.body.city);
    request(url, (err, response, body) => {
        if(err) {
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body);
            if(weather.main === undefined) {
                res.render("index", {
                    weather: null,
                    error: "Error, please try again",
                });
            } else {
                let weatherText = `It's ${weather.main.temp} degree Celsius with ${weather.weather[0].main} in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null})
                console.log("body: ", body);

            }
        }
    })
    
})

app.listen(3000, () => {
    console.log('weatherly app  listening on port 3000!');
});