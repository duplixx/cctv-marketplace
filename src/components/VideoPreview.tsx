import React from 'react';
import { motion } from 'framer-motion';
import { Users, Map, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import imgprev from "../assets/Video-Analytics.webp";
const VideoAnalyticsPreview = () => {
  return (
    <section id="video-preview" className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              AI-Powered Video Analytics
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-600 mb-8"
            >
              Transform your surveillance footage into actionable insights with our advanced AI analytics suite.
            </motion.p>

            <div className="space-y-6 mb-8">
              {[
                {
                  icon: Users,
                  title: "People Counting",
                  description: "Accurately track foot traffic and occupancy in real-time"
                },
                {
                  icon: Map,
                  title: "Heat Mapping",
                  description: "Visualize movement patterns and identify high-traffic areas"
                },
                {
                  icon: Activity,
                  title: "Behavior Analysis",
                  description: "Detect and analyze patterns in crowd behavior"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link to="/video-analytics">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Video Analytics
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Preview Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10"
            >
              <img
                src={imgprev}
                alt="Video Analytics Dashboard"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl transform translate-x-4 translate-y-4 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoAnalyticsPreview;