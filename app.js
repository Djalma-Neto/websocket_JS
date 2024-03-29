const express = require('express');
 
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
 
const app = express();
var allowlist = ['http://example1.com', 'http://example2.com'];
 
app.use(cors({ origin: '*' }));
 
app.use(helmet());
 
app.use(express.json());
 
app.use(morgan('dev'));

// app.post('/login', (req, res, next) => {
//     res.json({ token: '123456' });
// });

app.get('/', (req, res, next) => {
    res.json({ status: 'Funcionando' });
});
 
module.exports = app;