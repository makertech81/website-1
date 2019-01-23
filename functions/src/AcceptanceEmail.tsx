import * as ReactDOMServer from "react-dom/server";
import * as React from "react";

const render = (name: string) => {
  const body = ReactDOMServer.renderToString(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "mr-eaves-xl-modern, Helvetica, sans-serif",
        maxWidth: "800px"
      }}
    >
      <h1
        style={{ padding: "10px", backgroundColor: "#57068c", color: "white" }}
      >
        🎉 You're In!
      </h1>
      <div style={{ padding: "20px", fontSize: "1.1em" }}>
        <p>
          Congrats{name ? ` ${name}` : ""}! You've been accepted to HackNYU
          2019. Please{" "}
          <a href="https://hacknyu.org/rsvp"> confirm your acceptance</a> by
          January 30th.
        </p>
        <p>
          If you've forgotten, HackNYU 2019 is from February 15th to the 17th. It
          takes place simultaneously in New York, Shanghai and Abu Dhabi over 48
          hours. It is completely free, thanks to our wonderful sponsors and
          volunteers.
        </p>
      </div>
    </div>
  );
  return `
    <html>
    <head>
      <style>
        @import url("https://use.typekit.net/hjh3sxe.css");
      </style>
    </head>
    <body>
     ${body}
    </body>
    </html>
  `;
};

export default render;
