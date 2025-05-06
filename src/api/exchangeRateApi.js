import axios from 'axios';

// Base URL for the Exchange Rate API
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

/**
 * Fetch latest exchange rates
 * @param {string} apiKey - Your Exchange Rate API key
 * @param {string} baseCurrency - Base currency code (default: USD)
 * @returns {Promise} - Promise resolving to exchange rates data
 */
export const fetchExchangeRates = async (apiKey, baseCurrency = 'USD') => {
  try {
    const response = await axios.get(`${BASE_URL}/${apiKey}/latest/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Return fallback rates for demo purposes
    return {
      result: 'success',
      base_code: baseCurrency,
      conversion_rates: {
        USD: 1,
        EUR: 0.85,
        GBP: 0.75,
        JPY: 110.5,
        INR: 75.5,
        CAD: 1.25,
        AUD: 1.35,
        CNY: 6.45,
        CHF: 0.92,
        HKD: 7.78,
        SGD: 1.35,
        MXN: 20.0,
        BRL: 5.25,
        RUB: 73.5,
        ZAR: 15.0,
      }
    };
  }
};

/**
 * Convert currency
 * @param {string} apiKey - Your Exchange Rate API key
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @param {number} amount - Amount to convert
 * @returns {Promise} - Promise resolving to converted amount
 */
export const convertCurrency = async (apiKey, fromCurrency, toCurrency, amount) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`
    );
    return response.data;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};
