const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.static('widget/build/card'));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


// app.all('/', (req, res) => {
//     console.log(req.body.payment.products);


//     res.sendFile(path.join(__dirname, '../widget/build/card', 'index.html'));
// });

// app.get('/oauth2/auth_code', (req, res) => {
//     res.status(200).json(authData);
// });

app.listen(port, () => console.log(`App listening on port: ${port}!`));



