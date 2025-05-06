import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { useApp } from '../hooks/useApp';
import { formatCurrency } from '../utils/calculations';

const CurrencyConverter = () => {
  const { currencies, exchangeRates, emi } = useApp();
  
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(emi);
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Convert currency
  const convertCurrency = (value, from, to) => {
    if (!exchangeRates || !exchangeRates[from] || !exchangeRates[to]) {
      return value;
    }
    
    // Convert to USD first (base currency)
    const valueInUSD = from === 'USD' 
      ? value 
      : value / exchangeRates[from];
    
    // Convert from USD to target currency
    return to === 'USD' 
      ? valueInUSD 
      : valueInUSD * exchangeRates[to];
  };

  // Update converted amount when inputs change
  useEffect(() => {
    const converted = convertCurrency(amount, fromCurrency, toCurrency);
    setConvertedAmount(converted);
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Update amount when EMI changes
  useEffect(() => {
    setAmount(emi);
  }, [emi]);

  // Handle amount change
  const handleAmountChange = (event) => {
    const value = parseFloat(event.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  return (
    <Card elevation={3} sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Currency Converter
        </Typography>
        
        <Grid container spacing={3}>
          {/* Amount */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Amount"
              value={amount}
              onChange={handleAmountChange}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {fromCurrency}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          {/* From Currency */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>From</InputLabel>
              <Select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                label="From"
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* To Currency */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>To</InputLabel>
              <Select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                label="To"
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Converted Amount */}
          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                p: 2,
                borderRadius: 1,
                mt: 2,
              }}
            >
              <Typography variant="h6">Converted Amount:</Typography>
              <Typography variant="h4">
                {formatCurrency(convertedAmount, toCurrency)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Exchange Rate: 1 {fromCurrency} = {
                  convertCurrency(1, fromCurrency, toCurrency).toFixed(4)
                } {toCurrency}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
