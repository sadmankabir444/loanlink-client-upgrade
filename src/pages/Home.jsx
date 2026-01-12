import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import LoanCard from "../components/LoanCard";

const Home = () => {
  const [loans, setLoans] = useState([]);
  const controls = useAnimation();

  const feedbacks = [
    {
      name: "Rahim Ahmed",
      role: "Small Business Owner",
      message:
        "LoanLink made the entire loan process smooth and stress-free. Truly a modern platform.",
    },
    {
      name: "Nusrat Jahan",
      role: "Entrepreneur",
      message:
        "The transparency and real-time updates gave me full confidence throughout the process.",
    },
    {
      name: "Tanvir Hasan",
      role: "Freelancer",
      message:
        "Beautiful UI, simple flow, and fast approval. LoanLink is a game changer.",
    },
    {
      name: "Ayesha Siddika",
      role: "Startup Founder",
      message:
        "From applying to tracking EMI — everything is well organized and easy to use.",
    },
    {
      name: "Imran Hossain",
      role: "Retail Owner",
      message:
        "Highly recommended for small businesses. Secure, fast, and reliable platform.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Borrowers" },
    { value: "$50M+", label: "Loans Processed" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  const services = [
    {
      title: "Personal Loans",
      description: "Flexible personal loans to meet your immediate financial needs.",
      icon: "💰",
    },
    {
      title: "Business Loans",
      description: "Funding solutions to grow and expand your business ventures.",
      icon: "🏢",
    },
    {
      title: "Education Loans",
      description: "Invest in your future with our education financing options.",
      icon: "🎓",
    },
    {
      title: "Home Loans",
      description: "Make your dream home a reality with our home financing.",
      icon: "🏠",
    },
  ];

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "https://loanlink-server-seven.vercel.app"}/loans?limit=6`);
        if (!res.ok) throw new Error("Failed to fetch loans");
        const data = await res.json();
        setLoans(data);
      } catch (error) {
        console.error("Error fetching loans:", error.message);
      }
    };

    fetchLoans();

    controls.start({
      x: ["0%", "-100%"],
      transition: {
        repeat: Infinity,
        duration: 30,
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <div className="overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-[85vh] flex items-center justify-center text-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-950 dark:via-purple-900 dark:to-pink-950 transition-colors duration-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop')] opacity-10 dark:opacity-5 bg-cover bg-center"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl px-4 relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empower Your Financial Journey with{" "}
              <span className="text-primary">LoanLink</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg opacity-90 mb-8 max-w-2xl mx-auto"
          >
            Apply, track and manage microloans seamlessly with a transparent and
            modern digital platform built for borrowers and organizations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/loans" className="btn btn-primary px-8 py-3 text-lg">
              Explore Loans
            </Link>
            <Link to="/register" className="btn btn-outline px-8 py-3 text-lg">
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= STATISTICS SECTION ================= */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="py-20 bg-base-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Loan Services</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We offer a wide range of loan products tailored to meet your specific financial needs.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AVAILABLE LOANS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Available Loan Programs
          </h2>
          <p className="opacity-80 max-w-2xl mx-auto">
            Choose from a variety of loan options tailored to your needs.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.map((loan, index) => (
            <motion.div
              key={loan._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <LoanCard loan={loan} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/loans" className="btn btn-primary">
            View All Loans
          </Link>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-base-200 dark:bg-base-300/10 py-20 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How LoanLink Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our simple and efficient process ensures you get the funding you need quickly and securely.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <motion.div
              whileHover={{ y: -8 }}
              className="p-6 rounded-xl bg-base-100 shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Choose a Loan</h3>
              <p className="opacity-80">
                Browse available loans and select the one that suits your needs.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8 }}
              className="p-6 rounded-xl bg-base-100 shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Apply Online</h3>
              <p className="opacity-80">
                Submit your application digitally with required information.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8 }}
              className="p-6 rounded-xl bg-base-100 shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Track & Repay</h3>
              <p className="opacity-80">
                Track approval status, EMI plans and repayments in one place.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= WHY LOANLINK IS DIFFERENT ================= */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Why LoanLink Is Different
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Designed for transparency, security and real-world microloan
              management.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
              title: "Secure & Trusted",
              desc: "JWT authentication and role-based access keep user data fully protected.",
            },
            {
              title: "Role Based System",
              desc: "Separate dashboards for Borrower, Manager and Admin ensure clarity.",
            },
            {
              title: "Live Status Tracking",
              desc: "Track application approval, EMI plans and repayments in real time.",
            },
            {
              title: "Transparent Workflow",
              desc: "Every action is logged and visible — no hidden processing steps.",
            },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6 bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CUSTOMER FEEDBACK ================= */}
      <section className="py-20 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950 dark:via-purple-900 dark:to-pink-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Real People
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from our satisfied customers who have transformed their financial journey.
            </p>
          </motion.div>

          <div className="overflow-hidden py-8">
            <motion.div
              className="flex gap-8"
              animate={controls}
              onHoverStart={() => controls.stop()}
              onHoverEnd={() =>
                controls.start({
                  x: ["0%", "-100%"],
                  transition: {
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                  },
                })
              }
            >
              {[...feedbacks, ...feedbacks].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="min-w-[320px] max-w-[320px] bg-white dark:bg-base-200 shadow-xl rounded-2xl p-6 border border-base-300"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="opacity-90 mb-5 text-sm leading-relaxed">
                    "{item.message}"
                  </p>
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-sm opacity-70">{item.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-20 bg-base-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our loan services.
            </p>
          </motion.div>
          
          <div className="space-y-4">
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                What documents do I need to apply for a loan?
              </div>
              <div className="collapse-content">
                <p>Typically, you'll need proof of identity (NID), income proof (salary slip/bank statement), address proof, and employment verification. Specific requirements may vary based on loan type.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                How long does the loan approval process take?
              </div>
              <div className="collapse-content">
                <p>Our standard loan approval process takes 24-48 hours after submission of all required documents. For urgent cases, we offer express approval within 12 hours.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                What is the minimum credit score required?
              </div>
              <div className="collapse-content">
                <p>We accept applications with credit scores as low as 550. However, higher scores may qualify for better interest rates and loan terms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 text-center bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="mb-8 opacity-90 max-w-xl mx-auto">
              Join thousands of satisfied customers who have achieved their financial goals with LoanLink.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="btn btn-outline text-white border-white px-8 py-3 text-lg"
              >
                Create Free Account
              </Link>
              <Link
                to="/loans"
                className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg"
              >
                Explore Loans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;