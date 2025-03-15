import React, { useState } from "react";
import "../../styles/ContactPage/ContactForm.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <div className="contact-form">
      <h3>Contact Us</h3>
      <form onSubmit={handleSubmit}>
        <label>Your Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          required
          onChange={handleChange}
        />

        <label>Your Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          required
          onChange={handleChange}
        />

        <label>Your Phone *</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Enter your phone"
          required
          onChange={handleChange}
        />

        <label>Your Message</label>
        <textarea
          name="message"
          value={formData.message}
          placeholder="Your message"
          onChange={handleChange}
        ></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
