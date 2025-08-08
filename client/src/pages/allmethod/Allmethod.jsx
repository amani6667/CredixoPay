import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaExchangeAlt, FaChevronLeft, FaChevronRight, FaRegQuestionCircle } from 'react-icons/fa';
import { FiHome, FiX, FiInfo, FiCheck } from 'react-icons/fi';
import { RiBankFill, RiSecurePaymentLine } from 'react-icons/ri';
import { BsPhoneFill, BsArrowRight } from 'react-icons/bs';
import { MdPayment, MdSecurity } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentGateway = () => {
  const [activeTab, setActiveTab] = useState('mobile');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState(500);
  const [showMethodDetails, setShowMethodDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Payment methods data
  const paymentMethods = {
    mobile: [
      {
        id: 'bkash_personal',
        name: 'bKash P2P',
        type: 'Personal',
        image: 'https://xxxbetgames.com/icons-xxx/payments/75.svg',
        time: 'Instant',
        description: 'Send money from your personal bKash account',
        fee: '৳10',
        limit: '৳25,000',
        instructions: [
          'Go to your bKash Mobile Menu',
          'Select "Send Money"',
          'Enter our bKash Account Number: 01234567890',
          'Enter amount',
          'Enter your bKash PIN',
          'Confirm payment'
        ]
      },
      {
        id: 'nagad_personal',
        name: 'Nagad P2P',
        type: 'Personal',
        image: 'https://xxxbetgames.com/icons-xxx/payments/76.svg',
        time: 'Instant',
        description: 'Send money from your personal Nagad account',
        fee: '৳10',
        limit: '৳25,000',
        instructions: [
          'Go to your Nagad Mobile Menu',
          'Select "Send Money"',
          'Enter our Nagad Account Number: 01234567890',
          'Enter amount',
          'Enter your Nagad PIN',
          'Confirm payment'
        ]
      },
      {
        id: 'bkash_merchant',
        name: 'bKash Fast',
        type: 'Merchant',
        image: 'https://xxxbetgames.com/icons-xxx/payments/75.svg',
        time: 'Instant',
        description: 'Send money to merchant bKash account',
        fee: '৳15',
        limit: '৳50,000',
        instructions: [
          'Go to your bKash Mobile Menu',
          'Select "Payment"',
          'Enter Merchant ID: XYZ123',
          'Enter amount',
          'Enter your bKash PIN',
          'Confirm payment'
        ]
      },
      {
        id: 'nagad_merchant',
        name: 'Nagad Fast',
        type: 'Merchant',
        image: 'https://xxxbetgames.com/icons-xxx/payments/76.svg',
        time: 'Instant',
        description: 'Send money to merchant Nagad account',
        fee: '৳15',
        limit: '৳50,000',
        instructions: [
          'Go to your Nagad Mobile Menu',
          'Select "Payment"',
          'Enter Merchant ID: XYZ123',
          'Enter amount',
          'Enter your Nagad PIN',
          'Confirm payment'
        ]
      },
    ],
    bank: [
      {
        id: 'ebl',
        name: 'Eastern Bank',
        type: 'Bank Transfer',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAXCAYAAABqBU3hAAAFJUlEQVR4Ab2WA5TjYBSF/7Vt27Zt27Zt27Yxtm3btt2O6jZNcjejtfWdE+Pd+9CU/CzZssL5QQWJSQDKkf8NgDrHgtULNVM8TgDoxArj57M87/mQ540g/4MEEe94Ld1lsAp9rgXXtZmUTntQ6g2gNB/FQpK+ifwraIbtZxPMO3fVOlzUwmATrO3XAvEqZmyOu5rSqB8orZZgBfGPSrNUmVsq/q2UVw5KLty5+omP6JZFbHh6oXjDeIcTcMgK3Es4mFRzS0q9EWi7uaAj7qfSXrvTaI+dfDrslgsrSR//p8H7PbZPMG+63QzG/hmmxQHBNpnmchn2mf4HEHbTmlKrV+xeadAD1NuaoN5UA6VSm9tWhdJsBMtKsxaS34EF+u7TCBGQWWoYfdZRygK9PWLyzqblKdav8LiR72g4HLCZRjExb16whdH7WEnmfjbd5hGlzwlRbwxKsxknpAaYmFfOvzUtd61idck0VZAlOqi6zhB9jtth7TN/IV/ILN7uc1vuG61hArAdyWcwIVd8KdXaJQK47LAJWq/J72AflnNq9i33nNrrDUEW6eCsUYQegHbc0mC9z2N458VvIV+BiVPzLi6BRhMotdsCgtjzv1v/Gg9s4+yrrjXEa+ek5x+db7bZ9wmC85O+LiDwnDelWgeUSi3Q7pt5ABqTX0VJs0N2vg2MJfM0wTXh08+ENdvh/xyxwowvBABsb6XNdDmlwjWjXuci9+d+x3mtXSpBTkX13/LKPxVA/S8E+D1H9FcEsHnBmynN5qBU6xbV/iX5HV46JWkUOa+7yRhJPPHRrwhsti/wNTKkeVs+LxntdzSKelUeTNDFbADNyK+SyBNP7bTPUkzmaGDiFVdwdPyagEPBb5EjL9zyqfvQrUXjR/se4QFsf/I7HNMJyyTLdLmu18aAk/aQK5kun/VGeatAnt4y+2fIUwo2fhDF1KXt5ycy3vvzAfT+SGyF0m3vXLlwW2B+wnLjNB+121GmaXsDXsWv8LyTfy/G3IaUMeSUA8hyPZAV3LJUF2ue+qV5x+cdC0kt3KjpmWp8TDtc8sQuKWivjxoKleJNZT2D2Jc+iLzvCqAPAzRLlfD322WF7LwTbRa0wedRal+r/YXVdZeBaM5FNd0l6G25Fxv8HvO0Mjx0kmW5F9+LnX7VFWShFshi7ZLtdFVU5ASNueiMh7bxQXkC5QgADc+H66JAIdlDONKzfQ9Y+F3PvRVn67ja+2FKT4s9BVV1FoO8nQLyeiyI2gx0s9gt2+b3lKed4nYvTcI/AaCeUizf5mJlnx4ZEm5a+rEbTsLSBBrz73rmdj5gnTHholvGCZ2oGJ8Y4WEw6AmgupSRjfDkRz+c6nSBWe11TzrU9mhuLZ3FCqI5nws2AeTl6OKAzY02yLnrgufxdi5RgvT9DMu2BFDr45/k4KCgFw/v34e2piY4xpTVrCK3lOeW1kqW7pbPFFy25wdcOhmqkTrN+byYezFVTnMeiPoskDdcwNfjQFSmcGlditF2J/gXw/Wy3HiR9yS0fAaAStxShXwDoVC42MXZWRodFXWFfEy4IOXgWp/7OYNtDlE19ZazxcFUppYsqtzydnKxy6ZG66llHrdTVBOdPBJE2dsAtC1y+LMfntJ7KxcZJh/jmhNxoiTYNBCN2ZzbmSXB1WailclmmmuqGNN0P2++XDiP/AuktGJaV7MdnNOJxSKaGa3HGu/7PMuMANcChXjBP/8jCqDuvsA36UNtDuerJjqbc06XAmhP/gPvACFYzV/q8+pWAAAAAElFTkSuQmCC',
        fee: '৳15',
        limit: 'No limit',
        time: '1-3 hours',
        description: 'Transfer from any Eastern Bank account',
        instructions: [
          'Go to your bank\'s internet banking',
          'Select "Send Money" or "Fund Transfer"',
          'Enter our account details:',
          'Account Name: XYZ Company',
          'Account Number: 123456789',
          'Branch: Main Branch',
          'Enter amount and complete transaction'
        ]
      },
      {
        id: 'ibbl',
        name: 'Islami Bank',
        type: 'Bank Transfer',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAbCAMAAABY1h8eAAAAn1BMVEVHcEwKikZZq36NwaMAfi11tY8AXA4LPh8Phz622cYAhDwKikUAhT5Io3E6mmSu072SwqYok1cAcQ1Hom8UiUF/vpyMwqRos4pZqnx4tJBOpnYChT8AdRoiklVfqHz////a6+IChkEAgjgAfzHQ59rA387p9O/K49WXya2Lxqfj8er5/fuq1L1msojz+vehz7V+vZpzt5EAeyg8nGZaq37re7vHAAAAH3RSTlMAg+LolOweC2z92Kjt/Lvp/Px+1E661bXE1qfBNZ5y7BlosAAAAZJJREFUKJFt0leWozAQBVBMMDk6p1GOZPD+1za0jbtpZt7vPSqVSmUYn7he4mSZk3iu8U82GZ3SAEC7zYq2Jod+WzFWSp/D3a/DWwfqllPZ95LBVgNzqTtAGYvxUD8H/Jxql7vFfRrQFmEyluVIMJJVCb3vPh3KGUG4B1NqjDBTwvoU9jQVI0ao+cIGIRyXku1nPDeKDQhL8EqH0aD95jrjpVQSIwLfKAgiVQUu85UWF/0vxJ0WR3fGVxsfpF8IyqPrusY1so9ttSgLp7Kt9A83tDFaHJw4F1NDPzhAzs8B2hsxjmwOYL5AnHOhbRTdjEOO7JSOdPhBAhW0HnngTd+IggeUoiV6xqESnQ7N7jWGW/248Fr4/I2asQ5eHip5PeXe10XG+6d4Y9P20Cri53aebV0XTqlEyygULK60U9Td97fYUtmhD1jVSQUaP7R7tViVTY8DO7RSP02d0DZV7RmL3ANMomRnmuckJ+P5vtowZ1osqSrFSpj9Wa8fBTA9nE6no2jAYYXGfozezRfourb/5i9vNj3hwY5GqwAAAABJRU5ErkJggg==',
        fee: '৳10',
        limit: 'No limit',
        time: '1-3 hours',
        description: 'Transfer from any Islami Bank account',
        instructions: [
          'Go to your bank\'s internet banking',
          'Select "Send Money" or "Fund Transfer"',
          'Enter our account details:',
          'Account Name: XYZ Company',
          'Account Number: 123456789',
          'Branch: Main Branch',
          'Enter amount and complete transaction'
        ]
      },
      {
        id: 'dbbl',
        name: 'Dutch-Bangla',
        type: 'Bank Transfer',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACq0lEQVR4AaxQU2AcURQ9o43t2rZt2/b+1LZt27ZtO7adWcTm6HU2db97Hq6J/4qgoOByAYEhY2Nioi+kGePD3/tG5kzc8D5n8YBdEQ979L/Ud+vYiXfCPSvgX/j7+jF+/oFd/AOC7kVFhRfEx0Yqe89+IV0m3Sb72s0hH3r0IEPWjVCWvb1YxPPGRwmJfE+D3sgBAOXp5UsxDD0EwE4rS64SUYCDV3QICzBgnvEx3N3TMb+bOzq3Goa5lTqjRCyBCJmnKWYpQK6qCXyaA7hgrmFrUhSFLcfjYIzNxJb0q7C3LcCY4dXQuWYXrKneH9lSAUSigKFpMAwTB2Aco9Vql6mBvS0tOOr8Qz2evs/EeqvPaJMZg/kjWyDb3hzbao+ETGQUSUJp8A/YA6CZyVO0R6wsWPuUDAH7LyaibkUW0+LuwVihLPY1skBtq8oYWLYJcsUimDoE8JOqhHKjFZl4sDRgTCtCTpqAajYizEvyUUIBhAC5Qj4kRQIFk0xKn6IoP3jFmQZBikkBk4EBjAKHHI0l3A3ZqA4HBBv8EJzFw561hKzIv4J/vExaJY8FUSHODhwcXTUIzGChr1IPtnFRmBBVjFxLDQ4FXkeWun1LxuxXApUS9b6kCXCusFhKcHPSoGUtK/BxBfhYvSMK3O3R8ZEXxprXx8tMf+wOuApQLMxpDeTSJNCrSY7ToOApispqhib6zq0cwTEibvB2SOzQFwwfgbnP4tGxfBucjn2ATb7nUaJI4CgmWZalNRxFf4EJz1+913h+/dLPx8fzxajpV0XrJseVZRvvEb5nd5Jq60I+LVhAmp+fqbDrWovab1vRsv/p7cdBF69d5cBI0vdvnVdqnrA1Q0B/8nrVsPX3NnfN/vRQVvbzazmt+0t7WzaJTQnOZsiXU2YYVAAAiL9jiRUaRs0AAAAASUVORK5CYII=',
        fee: '৳10',
        limit: 'No limit',
        time: '1-3 hours',
        description: 'Transfer from any Dutch-Bangla Bank account',
        instructions: [
          'Go to your bank\'s internet banking',
          'Select "Send Money" or "Fund Transfer"',
          'Enter our account details:',
          'Account Name: XYZ Company',
          'Account Number: 123456789',
          'Branch: Main Branch',
          'Enter amount and complete transaction'
        ]
      }
    ]
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handlePaymentSubmit = () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const resetPayment = () => {
    setSelectedMethod(null);
    setPaymentSuccess(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const tabsVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen font-anek bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {paymentSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6"
              >
                <FiCheck className="h-8 w-8 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">Your payment of ৳{amount.toLocaleString()} has been processed successfully.</p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 p-5 rounded-xl mb-6 border border-gray-100"
              >
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">TXN{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{selectedMethod.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">{new Date().toLocaleString()}</span>
                </div>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetPayment}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-medium transition shadow-md"
              >
                Make Another Payment
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Payment Amount */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                <h2 className="text-lg font-semibold mb-2">Payment Amount</h2>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-4 pr-12 py-2 border-0 rounded-[5px] text-gray-700 bg-white bg-opacity-20 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-2xl font-bold placeholder-white placeholder-opacity-70"
                    placeholder="Enter Amount"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="text-white text-2xl font-bold">৳</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <motion.div 
                variants={tabsVariants}
                initial="hidden"
                animate="visible"
                className="border-b border-gray-200"
              >
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('mobile')}
                    className={`flex-1 py-4 px-1 text-center border-b-2 cursor-pointer font-medium text-sm flex items-center justify-center ${
                      activeTab === 'mobile'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <BsPhoneFill className="mr-2" />
                    Mobile Banking
                  </button>
                  <button
                    onClick={() => setActiveTab('bank')}
                    className={`flex-1 py-4 px-1 text-center border-b-2 cursor-pointer font-medium text-sm flex items-center justify-center ${
                      activeTab === 'bank'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <RiBankFill className="mr-2" />
                    Bank Transfer
                  </button>
                </nav>
              </motion.div>

              {/* Payment Methods List */}
              <div className="p-6">
                <h3 className="text-md font-semibold text-gray-800 mb-4">
                  Select {activeTab === 'mobile' ? 'Mobile Banking' : 'Bank'} Option
                </h3>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {paymentMethods[activeTab].map((method) => (
                    <motion.div
                      key={method.id}
                      variants={itemVariants}
                      whileHover={{ y: -2 }}
                      onClick={() => handleMethodSelect(method)}
                      className={`p-4 border rounded-xl cursor-pointer transition ${
                        selectedMethod?.id === method.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={method.image}
                            alt={method.name}
                            className="h-10 w-10 object-contain"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/40';
                              e.target.className = 'h-10 w-10 object-cover';
                            }}
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-800">{method.name}</h4>
                            {method.type && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {method.type}
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <span>Fee: {method.fee}</span>
                            <span className="mx-2">•</span>
                            <span>Limit: {method.limit}</span>
                          </div>
                        </div>
                        <div className="ml-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMethod(method);
                              setShowMethodDetails(true);
                            }}
                            className="text-gray-400 hover:text-blue-500 transition"
                          >
                            <FiInfo />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Payment Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <AnimatePresence>
                  {selectedMethod ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="flex justify-between items-center bg-blue-50 rounded-xl p-3 border border-blue-100">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden mr-3">
                            <img
                              src={selectedMethod.image}
                              alt={selectedMethod.name}
                              className="h-8 w-8 object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">{selectedMethod.name}</h4>
                            <p className="text-xs text-gray-500">{selectedMethod.type}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedMethod(null)}
                          className="text-gray-400 hover:text-gray-600 transition"
                        >
                          <FiX />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
                        <p className="text-sm text-yellow-700">Please select a payment method</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.button
                  whileHover={selectedMethod ? { scale: 1.02 } : {}}
                  whileTap={selectedMethod ? { scale: 0.98 } : {}}
                  onClick={handlePaymentSubmit}
                  disabled={!selectedMethod || isProcessing}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-white transition flex items-center justify-center ${
                    selectedMethod
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      Pay ৳{amount.toLocaleString()}
                      <BsArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
                
                <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
                  <RiSecurePaymentLine className="mr-1 text-blue-500" />
                  <span>All transactions are secure and encrypted</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Method Details Modal */}
      <AnimatePresence>
        {showMethodDetails && selectedMethod && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{selectedMethod.name} Payment</h3>
                  <button 
                    onClick={() => setShowMethodDetails(false)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="h-24 w-24 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                    <img
                      src={selectedMethod.image}
                      alt={selectedMethod.name}
                      className="h-20 w-20 object-contain"
                    />
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                    <p className="text-gray-800">{selectedMethod.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Transaction Fee</h4>
                      <p className="text-gray-800 font-medium">{selectedMethod.fee}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Processing Time</h4>
                      <p className="text-gray-800 font-medium">{selectedMethod.time}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Limit</h4>
                      <p className="text-gray-800 font-medium">{selectedMethod.limit}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Account Type</h4>
                      <p className="text-gray-800 font-medium">{selectedMethod.type}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Instructions</h4>
                    <ul className="space-y-2">
                      {selectedMethod.instructions.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 h-5 w-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-2 text-xs font-medium">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowMethodDetails(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowMethodDetails(false);
                      handlePaymentSubmit();
                    }}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-medium transition shadow-md"
                  >
                    Proceed to Pay
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentGateway;