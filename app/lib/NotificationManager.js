"use strict";
const config = require("config"),
  nodeMailerModule = require("nodemailer"),
  smtpTransport = require("nodemailer-smtp-transport"),
  transporter = nodeMailerModule.createTransport(
    smtpTransport(config.get("emailConfig"))
  ),
  constants = require("../../constants").APP_CONSTANTS;
const accountSid = "AC6d442554518ad38360c425c5829388e4";
const authToken = "f0ae3d2a65b5027bac1cc8b62ae8b4e4";
const client = require("twilio")(accountSid, authToken);

exports.sendEmailToUser = async (emailType, emailVariables, emailId) => {
  try {
    let mailOptions = {
      from: config.get("fromEmail"),
      to: emailId,
      subject: null,
      html: null,
    };

    mailOptions.subject = constants.emailConstants[emailType].emailSubject;
    mailOptions.html = renderMessageFromTemplateAndVariables(
      constants.emailConstants[emailType].emailTemplate,
      emailVariables
    );

    let emailSent = await sendMailViaTransporter(mailOptions);

    return emailSent;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

function renderMessageFromTemplateAndVariables(templateData, variablesData) {
  const Handlebars = require("handlebars");
  return Handlebars.compile(templateData)(variablesData);
}

const sendMailViaTransporter = async (mailOptions) => {
  let email = await transporter.sendMail(mailOptions);
  return email;
};

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure

exports.sendVerificationCode = async (data) => {
    try {
        console.log("SendVerificationCode",data)
        client.messages.create({
          body: data.message,
          from: "+12762623941", // your Twilio phone number
          to: data.phoneNo // recipient phone number
        })
        .then(message => console.log(message.sid))
        .catch(error => console.log(error));
    } catch (e) {
      console.log("error", e);
      throw e;
    }
  };


