const nodemailer = require('nodemailer');
require("dotenv").config();

const user = process.env.user;
const password = process.env.pass;
const host = process.env.host;

async function main() {
let transporter = nodemailer.createTransport({
    host: host,
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: user, // generated ethereal user
      pass: password, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Elizabeth" <lizzykate145@gmail.com>', // sender address
    to: "Damilola@gmail.com",  // list of receivers
    subject: "Technology", // Subject line 
    text: "This is my first text", // plain text body
  
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


}

main().catch(console.error)