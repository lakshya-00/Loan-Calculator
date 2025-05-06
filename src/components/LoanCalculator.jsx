import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Slider,
  Grid,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useApp } from '../hooks/useApp';
import { formatCurrency } from '../utils/calculations';

const LoanCalculator = () => {
  const {
    loanAmount,
    interestRate,
    loanTerm,
    emi,
    currencies,
    selectedCurrency,
    exchangeRates,
    setLoanAmount,
    setInterestRate,
    setLoanTerm,
    calculateEMI,
    setSelectedCurrency,
  } = useApp();

  const [localLoanAmount, setLocalLoanAmount] = useState(loanAmount);
  const [localInterestRate, setLocalInterestRate] = useState(interestRate);
  const [localLoanTerm, setLocalLoanTerm] = useState(loanTerm);
  const [convertedEmi, setConvertedEmi] = useState(emi);

  // Update converted EMI when currency or EMI changes
  useEffect(() => {
    if (exchangeRates && exchangeRates[selectedCurrency]) {
      const rate = selectedCurrency === 'USD' ? 1 : exchangeRates[selectedCurrency];
      setConvertedEmi(emi * rate);
    }
  }, [emi, selectedCurrency, exchangeRates]);

  // Handle loan amount change
  const handleLoanAmountChange = (event) => {
    const value = parseFloat(event.target.value);
    setLocalLoanAmount(value);
  };

  // Handle interest rate change
  const handleInterestRateChange = (event) => {
    const value = parseFloat(event.target.value);
    setLocalInterestRate(value);
  };

  // Handle loan term change
  const handleLoanTermChange = (event) => {
    const value = parseInt(event.target.value);
    setLocalLoanTerm(value);
  };

  // Handle slider changes
  const handleLoanAmountSliderChange = (event, newValue) => {
    setLocalLoanAmount(newValue);
  };

  const handleInterestRateSliderChange = (event, newValue) => {
    setLocalInterestRate(newValue);
  };

  const handleLoanTermSliderChange = (event, newValue) => {
    setLocalLoanTerm(newValue);
  };

  // Handle calculate button click
  const handleCalculate = () => {
    setLoanAmount(localLoanAmount);
    setInterestRate(localInterestRate);
    setLoanTerm(localLoanTerm);
    calculateEMI();
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Loan Calculator
        </Typography>
        
        <Grid container spacing={3}>
          {/* Loan Amount */}
          <Grid item xs={12}>
            <Typography gutterBottom>Loan Amount</Typography>
            <TextField
              fullWidth
              value={localLoanAmount}
              onChange={handleLoanAmountChange}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <Slider
              value={localLoanAmount}
              onChange={handleLoanAmountSliderChange}
              min={1000}
              max={1000000}
              step={1000}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value.toLocaleString()}`}
            />
          </Grid>
          
          {/* Interest Rate */}
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Interest Rate (%)</Typography>
            <TextField
              fullWidth
              value={localInterestRate}
              onChange={handleInterestRateChange}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />
            <Slider
              value={localInterestRate}
              onChange={handleInterestRateSliderChange}
              min={0.1}
              max={20}
              step={0.1}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
            />
          </Grid>
          
          {/* Loan Term */}
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Loan Term (months)</Typography>
            <TextField
              fullWidth
              value={localLoanTerm}
              onChange={handleLoanTermChange}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">months</InputAdornment>
                ),
              }}
            />
            <Slider
              value={localLoanTerm}
              onChange={handleLoanTermSliderChange}
              min={1}
              max={360}
              step={1}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} months`}
            />
          </Grid>
          
          {/* Currency Selection */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                label="Currency"
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Calculate Button */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCalculate}
              sx={{ height: '56px' }}
            >
              Calculate
            </Button>
          </Grid>
          
          {/* EMI Result */}
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
              <Typography variant="h6">Monthly EMI:</Typography>
              <Typography variant="h4">
                {formatCurrency(convertedEmi, selectedCurrency)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoanCalculator;
