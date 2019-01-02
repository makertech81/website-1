"use strict";
exports.__esModule = true;
var functions = require("firebase-functions");
var sgMail = require("@sendgrid/mail");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.sendConfirmationEmail = functions.https.onCall(function(data, context) {
  var apiKey = functions.config().sendgrid.key;
  sgMail.setApiKey(apiKey);
  var msg = {
    to: "nick@nicholasyang.com",
    from: "support.hack@nyu.edu",
    subject: "Application Submission Confirmation",
    text: "Congrats! You've submitted your application.",
    html: "<h1> Congrats! You've submitted your application.</h1>"
  };
  sgMail.send(msg);
});
