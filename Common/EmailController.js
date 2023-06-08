const nodeMailer      =   require('nodemailer')
const asyncHandller   =   require('express-async-handler')

//email address config ....
require('dotenv').config()


const SendMail  = asyncHandller(async(data,req,res,next)=>{
  console.log('sent data : ' + data.to);
  let transporter = nodeMailer.createTransport({
    // service:'Gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sonangl2020@gmail.com',//process.env.MAIL_USER, // generated gmail user
      pass: 'mwvyslcipsswpjxc', //process.env.MAIL_AUTH, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"GC 2015  💕👮‍♀️ 👻" <${process.env.MAIL_USER}>`, // sender address
    to: `${data.to}`, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });
})
console.log('mailer : ' + SendMail);
module.exports = SendMail