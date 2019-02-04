import * as ReactDOMServer from "react-dom/server";
import * as React from "react";

const render = (name: string) => {
  const body = ReactDOMServer.renderToString(
    <div
      style={{
        fontFamily: "mr-eaves-xl-modern, Helvetica, sans-serif",
        maxWidth: "800px"
      }}
    >
      <style>@import url("https://use.typekit.net/hjh3sxe.css");</style>
      <table>
      <tbody>

          <tr>
            <div
              style={{
                padding: "10px",
                display: "flex",
                position: "relative",
                fontSize: "1.3em",
                height: "100px",
                // In case background image doesn't render
                backgroundColor: "#57068c",
                color: "white",
                backgroundSize: "contain",
                textAlign: "center"
              }}
            >
       
                <h1 style={{paddingLeft: "10%"}}> Thank you for your Application </h1>
              
          </div>
          </tr>

          <tr>
            <div style={{ padding: "40px", fontSize: "1.1em" }}>
                <p>
                    Dear {name ? ` ${name}` : ""},
                </p>
                <p>
                     Thank you for submitting you application to HackNYU! 
                </p>
                <p>
                  Due to limited space, we regret to inform you that we are
                  not able to accept you as a participant this year.</p>
                  <p>HackNYU takes place simultaneously in New York, Shanghai and Abu Dhabi over 48
                  hours. This year, we received over 2000 applications, making us the top university hackathon in New York!  
              </p>
                  <p>You can check up on HackNYU 2019 from our twitter feed
                          {" "}<a href="https://twitter.com/hacknyu">
                                  here
                              </a>.
                  </p>
                  <p>We hope to see your application next year!</p>
                  <p>All the Best,</p>
             
            </div>
          </tr>

          <tr>
            <th>
             <div style={{ paddingLeft: "40px" }}>

                <img
                  style={{ maxWidth: "100px" }}
                  alt="HackNYU Logo!"
                  src="https://hacknyu.org/img/logo.png"
                />
                <p> Your friends at HackNYU </p>
              </div>
            </th>
          </tr>

        </tbody>
      </table>
      <p style={{ padding: "40px", paddingTop: "100px" }}>
        Copyright © HackNYU 2019
      </p>
    </div>
  );
  return body;
};

export default render;
