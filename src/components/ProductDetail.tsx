import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Shield, Package, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
const products = [
  {
    id: 1,
    name: "SmartCam Pro",
    description: "4K Ultra HD Smart Security Camera with Night Vision",
    price: "$199.99",
    image: img1,
    features: [
      "4K Ultra HD Resolution",
      "Advanced Night Vision",
      "AI Motion Detection",
      "Two-way Audio",
      "Weather Resistant",
      "Cloud Storage Ready"
    ],
    specs: {
      resolution: "3840 x 2160",
      fieldOfView: "160°",
      nightVision: "Up to 30ft",
      storage: "MicroSD up to 128GB",
      connectivity: "2.4GHz/5GHz WiFi",
      power: "DC 12V/2A"
    }
  },
  {
    id: 2,
    name: "DoorGuard Elite",
    description: "Smart Doorbell Camera with Two-Way Audio",
    price: "$149.99",
    image: img2,
    features: [
      "HD Video Quality",
      "Two-way Audio",
      "Motion Detection",
      "Night Vision",
      "Mobile App Control",
      "Easy Installation"
    ],
    specs: {
      resolution: "1080p HD",
      fieldOfView: "180°",
      nightVision: "Up to 20ft",
      storage: "Cloud Storage",
      connectivity: "2.4GHz WiFi",
      power: "Battery Powered"
    }
  },
  {
    id: 3,
    name: "SecureView 360",
    description: "360° Panoramic Security Camera with Motion Tracking",
    price: "$299.99",
    image: img3,
    features: [
      "360° Coverage",
      "Auto Motion Tracking",
      "4K Resolution",
      "Smart Notifications",
      "Two-way Audio",
      "Indoor/Outdoor Use"
    ],
    specs: {
      resolution: "4K HD",
      fieldOfView: "360°",
      nightVision: "Up to 50ft",
      storage: "MicroSD/Cloud",
      connectivity: "2.4GHz/5GHz WiFi",
      power: "AC Powered"
    }
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }));
  };

  return (
    <div className="pt-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={product.image}
              alt={product.name}
              className="w-full rounded-xl shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl font-bold mb-4"
            >
              {product.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 mb-6"
            >
              {product.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl font-bold text-blue-600 mb-6"
            >
              {product.price}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6 mb-8"
            >
              {[
                { icon: Shield, text: "2-Year Warranty" },
                { icon: Package, text: "Free Returns" },
                { icon: Truck, text: "Free Shipping" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center text-gray-600"
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors mb-8"
            >
              Add to Cart
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="border-t pt-8"
            >
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <motion.ul className="grid grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="border-t pt-8 mt-8"
            >
              <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
              <motion.div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-medium text-gray-700">{key}: </span>
                    <span className="text-gray-600">{value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;