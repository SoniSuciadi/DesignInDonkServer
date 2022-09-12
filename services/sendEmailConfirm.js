const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "designin.donk20@gmail.com",
    pass: "lfsaywsyjebvvpjo",
  },
});

function sendEmailConfirm(email, jwt, action = "activation") {
  let link;
  // if (action == "activation") {
  //   link = `http://localhost:3000/user/confirm?token=${jwt}`;
  // } else if (action == "forgot") {
  //   link = `http://localhost:3000/user/forgot?token=${jwt}`;
  // }
  let text;
  if (action == "activation") {
    text = "Activation Account";
    link = `http://localhost:3000/user/confirm?token=${jwt}`;
  } else if (action == "forgot") {
    text = "Forgot Password";
    link = `http://localhost:8080/changepassword?token=${jwt}`;
  }

  const mailOptions = {
    from: "designin.donk20@gmail.com",
    to: `${email}`,
    subject: text,
    text: "Click this Link",
    html: `
    
    <h1><a href="${link}">Konfirmasi</a></p>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmailConfirm;
