import React, { useState, useEffect } from 'react';
import { ChevronDown, User, ArrowDownUp, ArrowDown, ArrowRight, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

// Supported Currencies with Emojis
const CURRENCIES = [
  { code: 'AUD', flag: '🇦🇺', name: 'Australian Dollar' },
  { code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
  { code: 'INR', flag: '🇮🇳', name: 'Indian Rupee' },
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
  { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
  { code: 'CAD', flag: '🇨🇦', name: 'Canadian Dollar' },
];

const chartData = [
  { name: 'MON', uv: 400, pv: 240 },
  { name: 'TUE', uv: 300, pv: 450 },
  { name: 'WED', uv: 550, pv: 320 },
  { name: 'THU', uv: 400, pv: 480 },
  { name: 'FRI', uv: 700, pv: 200 },
  { name: 'SAT', uv: 450, pv: 350 },
];

// ==========================================
// 1. Reusable Currency Input Component
// ==========================================
function CurrencyInput({ 
  currency, 
  onCurrencyChange, 
  amount, 
  onAmountChange, 
  readOnly = false 
}) {
  const currentObj = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  return (
    <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center border border-gray-100 focus-within:border-[#a3e635] transition-colors">
      {/* Currency Selector */}
      <div className="relative flex items-center gap-2">
        <span className="text-xl">{currentObj.flag}</span>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          className="appearance-none bg-transparent font-semibold text-lg text-gray-800 outline-none pr-6 cursor-pointer"
        >
          {CURRENCIES.map((item) => (
            <option key={item.code} value={item.code}>
              {item.code}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="text-gray-400 absolute right-0 pointer-events-none" />
      </div>

      {/* Amount Input */}
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
// 2. Dashboard Component (Left Side)
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
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} dy={10} />
            <Line type="monotone" dataKey="uv" stroke="#84cc16" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
            <Line type="monotone" dataKey="pv" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ==========================================
// 3. Converter Component (Right Side - with Live API)
// ==========================================
function Converter() {
  const [fromCurrency, setFromCurrency] = useState('AUD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState(10129.82);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);

  // Live API Fetch Effect
  useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true);
        const base = fromCurrency.toLowerCase();
        const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`);
        const data = await res.json();
        setRates(data[base] || {});
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, [fromCurrency]);

  // Current Exchange Rate calculation
  const targetRate = rates[toCurrency.toLowerCase()] || 0;
  const convertedAmount = amount && targetRate ? (Number(amount) * targetRate).toFixed(2) : '0.00';

  // Swap handler
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Sell {fromCurrency}</h2>
      
      {/* Live Rate display */}
      <p className="text-gray-500 text-sm mb-8 flex items-center gap-1.5 h-5">
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin text-gray-400" />
            <span>Fetching live rate...</span>
          </>
        ) : (
          `1 ${fromCurrency} = ${targetRate ? targetRate.toFixed(4) : '...'} ${toCurrency}`
        )}
      </p>

      <div className="relative mb-8 flex flex-col gap-4">
        {/* From Currency Input */}
        <CurrencyInput
          currency={fromCurrency}
          onCurrencyChange={setFromCurrency}
          amount={amount}
          onAmountChange={setAmount}
        />

        {/* Swap Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full">
          <button
            onClick={handleSwap}
            title="Swap Currencies"
            className="bg-[#a3e635] p-2 rounded-full text-black shadow-sm hover:bg-[#92d42b] transition-transform active:scale-95"
          >
            <ArrowDown size={16} />
          </button>
        </div>

        {/* To Currency Input (Read Only) */}
        <CurrencyInput
          currency={toCurrency}
          onCurrencyChange={setToCurrency}
          amount={convertedAmount}
          readOnly={true}
        />
      </div>

      {/* Action Button */}
      <button className="w-full bg-[#a3e635] hover:bg-[#92d42b] text-gray-900 font-medium py-4 px-6 rounded-2xl flex justify-between items-center transition-colors active:scale-[0.98]">
        <span>Sell {amount || 0} {fromCurrency}</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

// ==========================================
// 4. Main Export
// ==========================================
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 gap-8 flex-wrap">
      <Dashboard />
      <Converter />
    </div>
  );
}