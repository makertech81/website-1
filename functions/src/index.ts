import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";
import * as express from "express";
import render from "./AdmittedEmail";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp(functions.config().firebase);

export const sendConfirmationEmail = functions.firestore
  .document("users/{userId}")
  .onWrite((change, context) => {
    return admin
      .auth()
      .getUser(context.params.userId)
      .then(user => {
        const beforeData = change.before.data();
        const afterData = change.after.data();
        const timestampInAfter = afterData && "submitTimestamp" in afterData;
        const timestampInBefore = beforeData && "submitTimestamp" in beforeData;
        if (timestampInAfter && !timestampInBefore) {
          const apiKey = functions.config().sendgrid.key;
          sgMail.setApiKey(apiKey);
          const msg = {
            to: user.email,
            from: "confirm@hacknyu.org",
            subject: "Confirming Your Submission!",
            text:
              "Congratulations on submitting your application for HackNYU 2019! We hope to see you there!",
            html:
              "Congratulations on submitting your application for <strong> HackNYU 2019! " +
              "</strong> We hope to see you there!"
          };
          return sgMail.send(msg);
        }
        return undefined;
      })
      .then(() => console.log("SENT!"))
      .catch(err => console.error(err));
  });

export const sendAcceptanceEmail = functions.firestore
  .document("admitted/{userId}")
  .onCreate((snapshot, context) => {
    return admin
      .auth()
      .getUser(context.params.userId)
      .then(user => {
        const apiKey = functions.config().sendgrid.key;
        sgMail.setApiKey(apiKey);
        const html = render(user.displayName);
        console.log(html);
        const msg = {
          to: "nick@nicholasyang.com",
          from: "confirm@hacknyu.org",
          subject: "[ACTION REQUIRED] You're in! Welcome to HackNYU 2019",
          text: "You've been accepted to HackNYU 2019!",
          html
        };
        return sgMail.send(msg);
      })
      .then(() => console.log("SENT!"))
      .catch(err => console.error(err));
  });
