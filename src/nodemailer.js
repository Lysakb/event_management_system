const nodemailer = require('nodemailer');
require("dotenv").config();

const user = process.env.user;
const password = process.env.pass;
const host = process.env.host;

const sendEmail = async options =>{
const transporter = nodemailer.createTransport({
    host: host,
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: user, // generated ethereal user
      pass: password, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const mailOptions = {
    from: '"Elizabeth" <lizzykate145@gmail.com>', // sender address
    to: options.email,  // list of receivers
    subject: options.subject, // Subject line 
    text: options.message, // plain text body
  
  };

  await transporter.sendMail(mailOptions);
};
  

module.exports = sendEmail;