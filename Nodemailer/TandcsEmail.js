"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config()


// async..await is not allowed in global scope, must use a wrapper
async function terms() {


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    tls: {
      ciphers:'SSLv3',
      rejectUnauthorized: false 
    },
    auth: {
      user: process.env.OUTLOOK_USERNAME, 
      pass: process.env.OUTLOOK_PASSWORD, 
    },
    
  });

  transporter.sendMail({
  from: '"Music Gofer" <doug@musicgofer.co.uk>', // sender address
  to: 'dougiefrancis@gmail.com', 
  subject: "Music Gofer - T&C's", // Subject line
  text: "To view details, please enable HTML", 
  html: `<!doctype html>
  <html ⚡4email>
  <head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
  <style >*{font-family: 'Roboto', sans-serif; font-size: 18px}</style>
</head>
    <body>
    
      <div>
          <h3>T&C's</h3>
    <pre>
    <p>
    Hi Doug,

    Thank you for working with us at Music Gofer
    
    Please note, all of our bookings are subject to our T&C's which can be found here -

                        <a href='http://localhost:3000/tandcs'><button style="color: white; background-color: #24A0ED; padding: 5px; border: 1px solid #24A0ED; border-radius: 3px">View T&C's</button></a>

  
    Thanks again!

    The Music Gofer team
    </p>
    </pre>
    </body>
</html>`
  
})

}


module.exports = terms