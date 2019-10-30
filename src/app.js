const path = require('path');

const express = require('express');

const weather = require('./utils/weather');

const publicPath = path.join(__dirname, '..', 'public');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(publicPath));

app.get('/', (req, res, next) => {
    res.render('index', {
      pageTitle: 'Home', 
      path: '/'});
  });

app.get('/about', (req, res, next) => {
    res.render('about', {
        pageTitle: 'About', 
        path: '/about'});
    });

app.get('/help/*', (req, res, next) => {
    res.render('help', {
        pageTitle: 'Help', 
        path: '/'});
    });
    
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No address provided'
        });
    }
    weather(req.query.address, (weather) => {
        return res.send(weather);
    });    
});

app.get('*', (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page not Found', 
        path: '/'});
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});