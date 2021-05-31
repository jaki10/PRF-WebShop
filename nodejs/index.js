const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://<usernév:jelszó>@prf-webshop-cluster.mu6kk.mongodb.net/test';


mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
    console.log('db csatlakoztatva');
})

mongoose.connection.on('error', (err) => {
    console.log('Hiba tortént', err);
})

require('./product.model');

const productModel = mongoose.model('product');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'));

app.use('/', require('./routes'));

// REST - Representative State Transfer, GET - Read, POST - Create, PUT - Update, DELETE - Delete


app.use((req, res, next) => {
    console.log('ez a hibakezelo');
    res.status(404).send('A kert eroforras nem talalhato');
})

app.listen(port, () => {
    console.log('The server is running!');
})

// a parancssorbol futo szervert Ctrl-C billentyukomboval allitom meg