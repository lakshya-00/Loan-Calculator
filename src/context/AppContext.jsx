import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext({
  loanAmount: 0,
  interestRate: 0,
  loanTerm: 0,
  emi: 0,
  currencies: [],
  selectedCurrency: 'USD',
  exchangeRates: {},
  amortizationSchedule: [],
  setLoanAmount: () => {},
  setInterestRate: () => {},
  setLoanTerm: () => {},
  calculateEMI: () => {},
  setSelectedCurrency: () => {},
});

export const AppContextProvider = ({ children }) => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(12);
  const [emi, setEmi] = useState(0);
  const [currencies, setCurrencies] = useState(['USD', 'EUR', 'GBP', 'JPY', 'INR']);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  // Calculate EMI
  const calculateEMI = () => {
    // Convert annual interest rate to monthly and decimal form
    const monthlyInterestRate = interestRate / 12 / 100;
    
    // Calculate EMI using the formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emiValue = loanAmount * monthlyInterestRate * 
      Math.pow(1 + monthlyInterestRate, loanTerm) / 
      (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
    
    setEmi(emiValue);
    generateAmortizationSchedule(emiValue);
    
    return emiValue;
  };

  // Generate amortization schedule
  const generateAmortizationSchedule = (emiValue) => {
    let balance = loanAmount;
    const monthlyInterestRate = interestRate / 12 / 100;
    const schedule = [];

    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = emiValue - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        emi: emiValue,
        principalPayment,
        interestPayment,
        balance: balance > 0 ? balance : 0,
      });
    }

    setAmortizationSchedule(schedule);
  };

  // Fetch exchange rates
  const fetchExchangeRates = async () => {
    try {
      // Note: In a real application, you would replace YOUR_API_KEY with an actual API key
      const response = await axios.get(
        'https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD'
      );
      
      if (response.data && response.data.conversion_rates) {
        setExchangeRates(response.data.conversion_rates);
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Use fallback rates for demo purposes
      setExchangeRates({
        USD: 1,
        EUR: 0.85,
        GBP: 0.75,
        JPY: 110.5,
        INR: 75.5,
      });
    }
  };

  // Calculate EMI when loan parameters change
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  // Fetch exchange rates on component mount
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const contextValue = {
    loanAmount,
    interestRate,
    loanTerm,
    emi,
    currencies,
    selectedCurrency,
    exchangeRates,
    amortizationSchedule,
    setLoanAmount,
    setInterestRate,
    setLoanTerm,
    calculateEMI,
    setSelectedCurrency,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
