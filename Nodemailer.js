"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config()


// async..await is not allowed in global scope, must use a wrapper
async function main(booking) {
  console.log(booking)
  const {eventId, email, name, venueName, setTimes, notes, date, artistFee} = booking

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
  to: email, 
  subject: "Music Gofer - Booking Request", // Subject line
  text: "To view booking details, please enable HTML", 
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
          <h3>We've got a gig for you!</h3>
    <pre>
    <p>
    Hi ${name},

    We've got a gig available and we would love you to play it!  
    
    Here are the details:

    Venue: ${venueName}

    Date: ${date}

    Set Times:

    ${setTimes.map(set=>set)}
   
    Fee: £${artistFee}

    Notes: ${notes}

    Here's the address of the venue:

   



    If you need help getting there, here's the location of the venue:

    Go to Google Maps



    You will need the following equipment:

    All equipment including pa req

    If you're up for it, please click the below link to confirm:

                        <a href='http://localhost:3000/confirm/${eventId}'><button style="color: white; background-color: #24A0ED; padding: 5px; border: 1px solid #24A0ED; border-radius: 3px">Confirm Gig</button></a>

    Otherwise, use the link below if you can't make it:
          
                        <a href='http://localhost:3000/decline/${eventId}'><button style="color: white; background-color: #d11a2a; padding: 5px; border: 1px solid #d11a2a; border-radius: 3px">Decline Gig</button></a>
         

    Have a great gig!

    The Music Gofer team
    </p>
    </pre>
    </body>
</html>`
  
})

}


module.exports = main