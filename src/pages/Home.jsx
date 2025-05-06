import { Container, Grid } from '@mui/material';
import LoanCalculator from '../components/LoanCalculator';
import AmortizationSchedule from '../components/AmortizationSchedule';
import CurrencyConverter from '../components/CurrencyConverter';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <LoanCalculator />
          <CurrencyConverter />
        </Grid>
        <Grid item xs={12} md={6}>
          <AmortizationSchedule />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
