import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function BillSummary({ subtotal, total, savings, appliedOffers }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow-xl p-4 rounded-2xl">
      {/* Collapsed Summary */}
      <AnimatePresence initial={false}>
        {!isExpanded && (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2 font-medium text-base">
                🧾 <span>To Pay</span>
              </div>
              <div className="text-xs text-gray-400">Incl. all taxes and charges</div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-sm">₹{subtotal}</span>
                <span className="text-lg font-bold text-gray-900">₹{total}</span>
              </div>
              <div className="text-green-600 text-xs font-semibold">SAVING ₹{savings}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <div 
        className="flex items-center justify-center mt-2 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm text-pink-600 font-medium hover:underline transition">
          {isExpanded ? 'Hide details' : 'View more details'}
        </span>
        <ChevronDown 
          className={`w-4 h-4 ml-1 text-pink-600 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Animated Expand Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden mt-4 space-y-2"
          >
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>

            {appliedOffers.map((offer, index) => (
              <div key={index} className="flex justify-between text-sm text-green-600">
                <span>✔ {offer.description}</span>
                <span>Saved ₹{offer.amount}</span>
              </div>
            ))}

            <div className="flex justify-between font-semibold">
              <span>Total Savings:</span>
              <span>₹{savings}</span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total to Pay:</span>
              <span>₹{total}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BillSummary;