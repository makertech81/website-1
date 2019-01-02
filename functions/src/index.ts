import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp(functions.config().firebase);

export const sendConfirmationEmail = functions.firestore
  .document("users/{userId}")
  .onWrite((change, context) => {
    console.log("CHANGES");
    console.log(change.after.data());
    console.log(change.before.data());
    const timestampInAfter = "submitTimestamp" in change.after.data();
    const timestampNotInBefore = !("submitTimestamp" in change.before.data());
    if (timestampInAfter && timestampNotInBefore) {
      const apiKey = functions.config().sendgrid.key;
      sgMail.setApiKey(apiKey);
      const msg = {
        to: context.auth.token.email,
        from: "support.hack@nyu.edu",
        subject: "Confirming Your Submission!",
        text:
          "Congratulations on submitting your application for HackNYU 2019! We hope to see you there!",
        html:
          "Congratulations on submitting your application for <strong> HackNYU 2019! " +
          "</strong> We hope to see you there!"
      };
      return sgMail.send(msg).then(() => ).catch(err => console.error(err));
    }
  });

