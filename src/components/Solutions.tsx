import React from 'react';
import { Building2, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Solutions = () => {
  const navigate= useNavigate();
  const solutions = [
    {
      title: "Enterprise Security",
      description: "Complete security infrastructure for large-scale operations",
      icon: Building2,
      features: ["AI-powered monitoring", "Multi-site management", "24/7 support"],
    },
    {
      title: "Access Control",
      description: "Advanced access management system for businesses",
      icon: Shield,
      features: ["Biometric authentication", "Role-based access", "Audit trails"],
    },
    {
      title: "Video Analytics",
      description: "Intelligent video analysis for business insights",
      icon: Users,
      features: ["People counting", "Heat mapping", "Behavior analysis"],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Enterprise Solutions
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive security solutions for businesses of all sizes
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-2xl"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <solution.icon className="h-12 w-12 text-blue-600 mb-6" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4">{solution.title}</h3>
              <p className="text-gray-600 mb-6">{solution.description}</p>
              <ul className="space-y-3">
                {solution.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <span className="h-2 w-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => navigate("/request-demo")}
              >
                Request Demo
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to secure your business?</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Sales
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;