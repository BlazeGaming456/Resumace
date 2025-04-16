import React from 'react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Pricing? What Pricing?
        </h1>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-6xl font-bold text-blue-600 mb-4">
            FREE
          </h2>
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-lg font-medium">Everything</span>
              <span className="text-green-600 font-bold">$0</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-lg font-medium">No Hidden Fees</span>
              <span className="text-green-600 font-bold">$0</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-lg font-medium">Your Happiness</span>
              <span className="text-green-600 font-bold">Priceless</span>
            </div>
          </div>
          <p className="mt-8 text-gray-500">
            No catches, no tricks, just awesome resume tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;