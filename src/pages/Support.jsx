import { useState } from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle, FaComments, FaHeadset, FaBook, FaTicketAlt, FaSearch } from "react-icons/fa";

const Support = () => {
  const [activeTab, setActiveTab] = useState('faqs');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I apply for a loan?",
      answer: "You can apply for a loan by creating an account, navigating to the 'Loans' section, selecting a loan that fits your needs, and clicking 'Apply Now'. Fill out the required information and submit your application."
    },
    {
      question: "What documents do I need to apply?",
      answer: "You'll typically need a valid ID, proof of income (pay stubs or bank statements), proof of address, and employment verification. Specific requirements may vary depending on the loan type."
    },
    {
      question: "How long does the approval process take?",
      answer: "Our standard loan approval process takes 24-48 hours after submission of all required documents. For urgent cases, we offer express approval within 12 hours."
    },
    {
      question: "What is the minimum credit score required?",
      answer: "We accept applications with credit scores as low as 550. However, higher scores may qualify for better interest rates and loan terms."
    },
    {
      question: "Can I track my application status?",
      answer: "Yes, you can track your application status in real-time through your dashboard under the 'My Loans' section."
    },
    {
      question: "How do I make loan payments?",
      answer: "You can make payments through your dashboard using various methods including bank transfer, debit card, or linked accounts. Set up automatic payments for convenience."
    }
  ];

  const supportOptions = [
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      color: "bg-blue-500"
    },
    {
      icon: <FaComments className="text-3xl" />,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      action: "Send Email",
      color: "bg-green-500"
    },
    {
      icon: <FaTicketAlt className="text-3xl" />,
      title: "Submit Ticket",
      description: "Create a support ticket for complex issues",
      action: "Create Ticket",
      color: "bg-purple-500"
    },
    {
      icon: <FaBook className="text-3xl" />,
      title: "Knowledge Base",
      description: "Browse our extensive collection of articles",
      action: "Explore Articles",
      color: "bg-orange-500"
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Support Center
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Need help? Our comprehensive support resources are here to assist you
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">How Can We Help?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`${option.color} w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{option.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{option.description}</p>
                <button className="btn btn-primary"> {option.action}</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for help topics, FAQs, guides..."
              className="input input-bordered w-full pl-12 pr-4 py-4 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white dark:bg-gray-800 rounded-lg p-1">
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'faqs' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                }`}
                onClick={() => setActiveTab('faqs')}
              >
                <FaQuestionCircle className="inline mr-2" /> FAQs
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'guides' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                }`}
                onClick={() => setActiveTab('guides')}
              >
                <FaBook className="inline mr-2" /> Guides
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            {activeTab === 'faqs' && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Frequently Asked Questions</h3>
                
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12">
                    <FaSearch className="text-gray-400 text-4xl mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No results found</h4>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search query</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{faq.question}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'guides' && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Helpful Guides</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Getting Started Guide",
                      description: "Learn how to create an account and apply for your first loan",
                      link: "#"
                    },
                    {
                      title: "Loan Management",
                      description: "Understand how to track your loan and make payments",
                      link: "#"
                    },
                    {
                      title: "Documentation Requirements",
                      description: "Detailed guide on required documents for different loan types",
                      link: "#"
                    },
                    {
                      title: "Troubleshooting",
                      description: "Common issues and how to resolve them",
                      link: "#"
                    }
                  ].map((guide, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{guide.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{guide.description}</p>
                      <a href={guide.link} className="text-primary hover:underline font-medium">
                        Read Guide →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
          <p className="text-lg mb-6 opacity-90">
            Our support team is available 24/7 to assist you with any questions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn btn-outline btn-accent text-primary">Contact Support</button>
            <button className="btn bg-white text-primary hover:bg-gray-100">Schedule Call</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;