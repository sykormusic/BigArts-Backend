const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MP,
        },
    });
    //send email with defined transport object
    const info = await transporter.sendMail({
        from: '"hehe" <abc@gmail.com.com>', //sender adress
        to: data.to, //list of receivers
        subject: data.subject, //subject line
        text: data.text, //plain text body
        html: data.htm, //html body
    });
    console.log("Message send: %s", info.messageId);
});

module.exports = sendEmail;