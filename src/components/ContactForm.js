// src/components/ContactForm.js
import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    try {
      // Using Formspree to handle form submission
      const response = await fetch('https://formspree.io/f/xjkojzrp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email, // This tells Formspree who to reply to
          _subject: `Portfolio Contact: ${formData.subject}` // Custom subject line
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: false, 
        error: 'Sorry, there was an error sending your message. Please try again or email me directly.' 
      });
    }
  };

  return (
    <div className="contact-form-container">
      {formStatus.isSubmitted ? (
        <div className="form-success">
          <i className="fas fa-check-circle"></i>
          <h3>Message Sent!</h3>
          <p>Thank you for reaching out. I'll get back to you as soon as possible at {formData.email || 'your email'}.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              disabled={formStatus.isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              disabled={formStatus.isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              required
              disabled={formStatus.isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, opportunity, or just say hello!"
              rows="5"
              required
              disabled={formStatus.isSubmitting}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={formStatus.isSubmitting}
          >
            {formStatus.isSubmitting ? (
              <>
                <span className="btn-spinner"></span>
                Sending...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Send Message
              </>
            )}
          </button>
          
          {formStatus.error && (
            <div className="form-error">
              <i className="fas fa-exclamation-triangle"></i>
              <p>{formStatus.error}</p>
              <p>You can also email me directly at: <a href="mailto:zaeemamin03@gmail.com">zaeemamin03@gmail.com</a></p>
            </div>
          )}
          
          <p className="form-note">
            <i className="fas fa-lock"></i>
            Your information is secure and will only be used to contact you.
          </p>
        </form>
      )}
    </div>
  );
};

export default ContactForm;