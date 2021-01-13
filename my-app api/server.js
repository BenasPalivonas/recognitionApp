const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const { response } = require('express');

const register = require('./controls/register.js');
const get = require('./controls/get.js');
const id = require('./controls/id.js');
const image = require('./controls/image.js');
const signIn = require('./controls/signin.js');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '123',
        database: 'facereco'
    }
});

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    get(req, res, knex);
})
app.listen(3000, () => {
    console.log("app is running");
})
app.post('/signin', (req, res) => {
    signIn.signInHandler(req, res, knex, bcrypt);
});

app.post('/register', (req, res) => register.handleRegister(req, res, knex, bcrypt))

app.get('/profile/:id', (req, res) => {
    id.idHandler(req, res, knex);
})
app.put('/image', (req, res) => {
    image.imageHandler(req, res, knex);
})

app.post('/getapi', (req, res) => { image.apiHandler(req, res) })