/**
 * Calculate EMI (Equated Monthly Installment)
 * @param {number} principal - Loan amount
 * @param {number} annualInterestRate - Annual interest rate in percentage
 * @param {number} tenureInMonths - Loan duration in months
 * @returns {number} - Monthly EMI amount
 */
export const calculateEMI = (principal, annualInterestRate, tenureInMonths) => {
  // Convert annual interest rate to monthly and decimal form
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  
  // Calculate EMI using the formula: P * r * (1+r)^n / ((1+r)^n - 1)
  if (monthlyInterestRate === 0) {
    return principal / tenureInMonths;
  }
  
  const emi = principal * monthlyInterestRate * 
    Math.pow(1 + monthlyInterestRate, tenureInMonths) / 
    (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);
  
  return emi;
};

/**
 * Generate amortization schedule
 * @param {number} principal - Loan amount
 * @param {number} annualInterestRate - Annual interest rate in percentage
 * @param {number} tenureInMonths - Loan duration in months
 * @returns {Array} - Amortization schedule
 */
export const generateAmortizationSchedule = (principal, annualInterestRate, tenureInMonths) => {
  let balance = principal;
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const emi = calculateEMI(principal, annualInterestRate, tenureInMonths);
  const schedule = [];

  for (let month = 1; month <= tenureInMonths; month++) {
    const interestPayment = balance * monthlyInterestRate;
    const principalPayment = emi - interestPayment;
    balance -= principalPayment;

    schedule.push({
      month,
      emi,
      principalPayment,
      interestPayment,
      balance: balance > 0 ? balance : 0,
    });
  }

  return schedule;
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Convert currency
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @param {Object} exchangeRates - Exchange rates object
 * @returns {number} - Converted amount
 */
export const convertCurrency = (amount, fromCurrency, toCurrency, exchangeRates) => {
  if (!exchangeRates || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    return amount;
  }
  
  // Convert to USD first (base currency)
  const amountInUSD = fromCurrency === 'USD' 
    ? amount 
    : amount / exchangeRates[fromCurrency];
  
  // Convert from USD to target currency
  return toCurrency === 'USD' 
    ? amountInUSD 
    : amountInUSD * exchangeRates[toCurrency];
};
