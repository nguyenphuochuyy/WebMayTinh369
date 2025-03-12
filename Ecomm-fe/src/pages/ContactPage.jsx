import React from "react";
import Navbar from "../components/ContactPage/Navbar";
import ContactInfo from "../components/ContactPage/ContactInfo";
import ContactForm from "../components/ContactPage/ContactForm";
import "../styles/ContactPage/ContactPage.scss";
import Footer from "../components/ContactPage/Footer";

const ContactPage = () => {
  return (
    <div className="home-container">
        <Navbar />
        <div className="contact-title">
            <a href="#">Home / </a>
            <a href="#">Contact</a>
        </div>

        <div className="contact-content">
            <div className="contact-left">
                <ContactInfo />
            </div>

            <div className="contact-right">
                <ContactForm />
            </div>
        </div>
        <div className="contact-footer">
            <Footer />
        </div>
    </div>
  );
};

export default ContactPage;
