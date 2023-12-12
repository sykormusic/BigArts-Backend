const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
dotenv.config();
var inlineBase64 = require("nodemailer-plugin-inline-base64");

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
  transporter.use("compile", inlineBase64({ cidPrefix: "somePrefix_" }));
  //listItems
  let listItem = "";
  const attachImage = [];
  orderItems.forEach((order) => {
    listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`;
    attachImage.push({ path: order.images });
  });
  //send email with defined transport object
  const info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, //sender adress
    to: data.to, //list of receivers
    subject: data.subject, //subject line
    text: data.text, //plain text body
    html: data.htm, //html body
  });
  console.log("Message send: %s", info.messageId);
});

module.exports = {
  sendEmail,
};
