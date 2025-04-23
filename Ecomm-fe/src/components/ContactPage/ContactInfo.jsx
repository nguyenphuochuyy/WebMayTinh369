import React from "react";
import "../../styles/ContactPage/ContactInfo.scss";

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <div className="contact-info-item">
        <h3>Call To Us</h3>
        <p>We are available 24/7, 7 days a week.</p>
        <p>Phone: +8801611112222</p>
      </div>
      <div className="contact-info-item">
        <h3>Write To Us</h3>
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <p>Email: customer@exclusive.com</p>
        <p>Email: support@exclusive.com</p>
      </div>
    </div>
  );
};

export default ContactInfo;
