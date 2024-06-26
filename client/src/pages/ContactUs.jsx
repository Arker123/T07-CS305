import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ContactUs.css";
import Footer from "../components/shared/Footer"
import Navbar from "../components/shared/Navbar/Navbar";

function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { fullName, email, message });
    setFullName("");
    setEmail("");
    setMessage("");
    // You can add further logic here, such as sending the form data to a server
  };

  return (
    <>
    <div className="App2">
      <Navbar />
      <div className="contactus-parent">
        <div className="contactus-child1">
          <div>
            <h1>CONTACT US</h1>
            <p>
              Email, call or complete the form <br /> to find out how Condense
              can help solve your problem.
            </p>
            <p>
              <FontAwesomeIcon icon={["far", "envelope"]} /> &nbsp; &nbsp;
              contactus@condense.com
            </p>
            <p>
              <FontAwesomeIcon icon={["fas", "phone"]} /> &nbsp; +91
              99999 99999
            </p>
            <p>
              <FontAwesomeIcon icon={["fas", "map-marker-alt"]} /> &nbsp; &nbsp;
              IIT ROPAR,  &nbsp; Punjab{" "}
            </p>
          </div>
        </div>
        <div className="contactus-child2">
          <div className="contact-container">
            <div className="contact-form">
              <h2>Get in Touch</h2>
              <p>You can reach us anytime</p>
              <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <label htmlFor="email">Your Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="jane@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Please write your message here."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="child1-table">
        <table>
          <thead>
            <tr>
              <th>Feedback and Suggestions</th>
              <th>Media Inquiries</th>
              <th>Customer Support</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                We value your feedback and are continuously working to
                improve Condense. Your input is crucial in shaping the
                future of Condense.
              </td>
              <td>
                For media related inquiries please email us at
                media@condense.com
              </td>
              <td>
                Our customer support team is available around the clock to
                address any concerns you may have.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ContactUs;
