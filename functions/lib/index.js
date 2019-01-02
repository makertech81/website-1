"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp(functions.config().firebase);
exports.sendConfirmationEmail = functions.firestore
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
                text: "Congratulations on submitting your application for HackNYU 2019! We hope to see you there!",
                html: "Congratulations on submitting your application for <strong> HackNYU 2019! " +
                    "</strong> We hope to see you there!"
            };
            return sgMail.send(msg);
        }
        return undefined;
    })
        .then(() => console.log("SENT!"))
        .catch(err => console.error(err));
});
//# sourceMappingURL=index.js.map