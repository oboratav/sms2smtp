const nodemailer = require("nodemailer");

exports.handler = async (context, event, callback) => {
  // Open and read routing file
  const routingFile = Runtime.getAssets()["/routing.json"].open();
  const routes = JSON.parse(routingFile);

  // Initialize mail transporter
  let transporter = nodemailer.createTransport({
    pool: true,
    host: context.MAIL_HOST,
    port: context.MAIL_PORT,
    secure: true, // use TLS
    auth: {
      user: context.MAIL_USERNAME,
      pass: context.MAIL_PASSWORD,
    },
  });

  // Verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    }
  });

  // Send an email to each address in the routing array for this number
  for (const recipientAddress of routes[event.To]) {
    let sendMessage = await transporter.sendMail({
      from: context.MAIL_USERNAME,
      to: recipientAddress,
      subject: "SMS Received",
      text: `${event.To} recently received an SMS from ${event.From}:  ${event.Body}`,
      html: `<p>${event.To} recently received an SMS from ${event.From}: </p></br><p>${event.Body}</p>`,
    });
  }

  return callback(null);
};
