import React from "react";
import Navbar from "../components/layout/Navbar";
import ContactInfo from "../components/ContactPage/ContactInfo";
import ContactForm from "../components/ContactPage/ContactForm";
import "../styles/ContactPage/ContactPage.scss";
import Footer from "../components/layout/Footer";

const ContactPage = () => {
  return (
    <div className="home-container">
        <div className="contact-title">
            <a href="/">Home / </a>
            <a href="/contactPage">Contact</a>
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
