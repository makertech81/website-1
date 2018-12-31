import * as functions from "firebase-functions";
import * as sgMail from "@sendgrid/mail";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const sendConfirmationEmail = functions.https.onCall((data, context) => {
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
  return sgMail.send(msg).catch(err => console.error(err));
});
