import React, { useState } from 'react';
import { ChevronDown, User, ArrowDownUp, ArrowDown, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

// ==========================================
// 1. Mock Data for Chart & Exchange Rates
// ==========================================
const chartData = [
  { name: 'MON', uv: 400, pv: 240 },
  { name: 'TUE', uv: 300, pv: 450 },
  { name: 'WED', uv: 550, pv: 320 },
  { name: 'THU', uv: 400, pv: 480 },
  { name: 'FRI', uv: 700, pv: 200 },
  { name: 'SAT', uv: 450, pv: 350 },
];

const exchangeRates = {
  AUD: { USD: 0.657, rateText: "1 AUD = 0.657 USD" },
  USD: { AUD: 1.522, rateText: "1 USD = 1.522 AUD" }
};

// this is comment commit





// ==========================================
// 2. Reusable Currency Input Component
// ==========================================
function CurrencyInput({ flag, currency, amount, onAmountChange, readOnly }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center border border-gray-100 focus-within:border-[#a3e635] transition-colors">
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-xl">{flag}</span>
        <span className="font-semibold text-lg">{currency}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
        readOnly={readOnly}
        className="bg-transparent text-right text-gray-700 outline-none w-full ml-4 font-semibold text-lg"
        placeholder="0.00"
      />
    </div>
  );
}

// ==========================================
// 3. Dashboard Component (Left Side)
// ==========================================
function Dashboard() {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 w-full max-w-sm">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 shadow-sm cursor-pointer">
          <span className="text-xl">🇬🇧</span>
          <span className="text-gray-500 text-sm font-medium">GBP (Pound)</span>
          <ChevronDown size={16} className="text-gray-400 ml-2" />
        </div>
        <div className="flex gap-2">
          <button className="bg-[#a3e635] p-2.5 rounded-xl text-black hover:bg-[#92d42b] transition-colors">
            <User size={18} />
          </button>
          <button className="bg-[#a3e635] p-2.5 rounded-xl text-black hover:bg-[#92d42b] transition-colors">
            <ArrowDownUp size={18} />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-4xl font-semibold text-[#1e293b]">£1,252.00</h1>
        <div className="flex items-center gap-4 mt-2 text-[#84cc16] text-sm font-medium">
          <span className="flex items-center">
            <ArrowDown size={14} className="mr-1" /> 4.1%
          </span>
          <span className="flex items-center">
            <ArrowDown size={14} className="mr-1" /> 142£
          </span>
        </div>
      </div>

      <div className="h-48 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
            <Line type="monotone" dataKey="uv" stroke="#84cc16" strokeWidth={2.5} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} />
            <Line type="monotone" dataKey="pv" stroke="#f97316" strokeWidth={2.5} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ==========================================
// 4. Converter Component (Right Side - Functional)
// ==========================================
function Converter() {
  const [amount, setAmount] = useState(10129.82);
  const [isReversed, setIsReversed] = useState(false);

  // Dynamic values based on Swap State
  const fromCurrency = isReversed ? 'USD' : 'AUD';
  const toCurrency = isReversed ? 'AUD' : 'USD';
  const fromFlag = isReversed ? '🇺🇸' : '🇦🇺';
  const toFlag = isReversed ? '🇦🇺' : '🇺🇸';

  const rate = exchangeRates[fromCurrency][toCurrency];
  const rateText = exchangeRates[fromCurrency].rateText;
  
  // Convert amount and handle empty string gracefully
  const convertedAmount = amount ? (Number(amount) * rate).toFixed(2) : "";

  const handleSwap = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Sell {fromCurrency}</h2>
      <p className="text-gray-500 text-sm mb-8">{rateText}</p>

      <div className="relative mb-8 flex flex-col gap-4">
        {/* Input for user to type */}
        <CurrencyInput 
          flag={fromFlag} 
          currency={fromCurrency} 
          amount={amount} 
          onAmountChange={setAmount} 
          readOnly={false}
        />

        {/* Swap Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full">
          <button 
            onClick={handleSwap}
            className="bg-[#a3e635] p-2 rounded-full text-black shadow-sm hover:bg-[#92d42b] transition-transform active:scale-95"
          >
            <ArrowDown size={16} className={isReversed ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>
        </div>

        {/* Read-only output */}
        <CurrencyInput 
          flag={toFlag} 
          currency={toCurrency} 
          amount={convertedAmount} 
          readOnly={true}
        />
      </div>

      <button className="w-full bg-[#a3e635] hover:bg-[#92d42b] text-gray-900 font-medium py-4 px-6 rounded-2xl flex justify-between items-center transition-colors active:scale-[0.98]">
        <span>Sell {amount || 0} {fromCurrency}</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

// ==========================================
// 5. Main App Component (Default Export)
// ==========================================
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 gap-8 flex-wrap">
      <Dashboard />
      <Converter />
    </div>
  );
}


// "happeist birthday to me"






