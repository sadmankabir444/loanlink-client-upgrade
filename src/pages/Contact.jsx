import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-primary text-2xl" />,
      title: "Our Location",
      description: "123 Finance Street, Business District, NY 10001"
    },
    {
      icon: <FaPhone className="text-primary text-2xl" />,
      title: "Phone Number",
      description: "+1 (555) 123-4567"
    },
    {
      icon: <FaEnvelope className="text-primary text-2xl" />,
      title: "Email Address",
      description: "support@loanlink.com"
    },
    {
      icon: <FaClock className="text-primary text-2xl" />,
      title: "Working Hours",
      description: "Mon-Fri: 9AM - 6PM, Sat: 10AM - 4PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Have questions? Our team is ready to assist you with any inquiries about our loan services
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Contact Information</h2>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                  <div className="flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{info.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebook />, name: "Facebook" },
                  { icon: <FaTwitter />, name: "Twitter" },
                  { icon: <FaInstagram />, name: "Instagram" },
                  { icon: <FaLinkedin />, name: "LinkedIn" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/80 transition-colors duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Send Us a Message</h2>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.subject ? 'input-error' : ''}`}
                  placeholder="What is this regarding?"
                />
                {errors.subject && <p className="text-error text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`textarea textarea-bordered w-full ${errors.message ? 'textarea-error' : ''}`}
                  placeholder="Type your message here..."
                ></textarea>
                {errors.message && <p className="text-error text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary w-full py-3 text-lg font-semibold ${isSubmitting ? 'loading' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  {
                    question: "How long does loan approval take?",
                    answer: "Most applications are reviewed within 24-48 hours after submission of all required documents."
                  },
                  {
                    question: "What documents do I need to apply?",
                    answer: "Typically, you'll need ID, proof of income, bank statements, and employment verification."
                  },
                  {
                    question: "Is there a fee to apply?",
                    answer: "No, our loan application process is completely free."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-800 dark:text-white">{faq.question}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;