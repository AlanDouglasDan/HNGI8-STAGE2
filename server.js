const express = require('express');

require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

const app = express();

const PORT = process.env.PORT || 5000;

// set template engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('./assets'));
app.use(express.json());

app.get('/', (req, res) =>{
    res.render('resume');
});

app.post('/email', (req, res) => {
    console.log('Data: ', req.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: `Message from ${req.body.name}: ${req.body.subject}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.send(err);
            return log('Error occurs', err);            
        } 
        res.send('success');
        return log('Email sent: ' + info.response);
    });
});

app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`);
});