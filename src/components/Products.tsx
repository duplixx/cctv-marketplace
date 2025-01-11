import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "SmartCam Pro",
      description: "4K Ultra HD Smart Security Camera with Night Vision",
      price: "$199.99",
      image:img1,
    },
    {
      id: 2,
      name: "DoorGuard Elite",
      description: "Smart Doorbell Camera with Two-Way Audio",
      price: "$149.99",
      image:img2,
    },
    {
      id: 3,
      name: "SecureView 360",
      description: "360° Panoramic Security Camera with Motion Tracking",
      price: "$299.99",
      image:img3,
    },
  ];

  const dispatch = useDispatch();

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
    <section id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Consumer Security Solutions
          </h2>
          <p className="text-xl text-gray-600">
            Protect what matters most with our cutting-edge security cameras
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
            >
              <Link to={`/product/${product.id}`}>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
              </Link>
              <div className="p-6">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(addToCart(product))}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;