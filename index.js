const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());

