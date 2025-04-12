import { CheckCircle } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Sparkle = ({ delay }) => {
  return (
    <motion.div
      className="absolute text-yellow-400 text-sm"
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 0], y: [-5, -20, -30], scale: [0.5, 1, 0] }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      ✨
    </motion.div>
  );
};

const SpecialOffers = () => {
  const offers = [
    "Buy 1 Get 1 Free on Cheese (1 free)",
    "Half price Bread with Soup (1 Bread)",
    "1/3 off Butter (1 Butter)",
  ];

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-900 via-purple-400 to-pink-600 rounded-2xl shadow-2xl p-8 max-w-full mx-auto mt-4 mb-10 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      {/* Title */}
      <h2 className="text-5xl font-bold text-center text-gray-900 mb-6 relative z-10">
        🎉 Special Offers 🎉
      </h2>

      {/* Offers */}
      <ul className="space-y-4 z-10 relative">
        {offers.map((offer, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-3 text-green-900 justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <CheckCircle className="text-purple-900" size={32} />
            <span className="text-center text-2xl font-medium">{offer}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SpecialOffers;
