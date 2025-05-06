import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  useTheme,
} from '@mui/material';
import { useApp } from '../hooks/useApp';
import { formatCurrency } from '../utils/calculations';

const AmortizationSchedule = () => {
  const { amortizationSchedule, selectedCurrency, exchangeRates } = useApp();
  const theme = useTheme();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Convert amount based on selected currency
  const convertAmount = (amount) => {
    if (!exchangeRates || !exchangeRates[selectedCurrency]) {
      return amount;
    }
    
    const rate = selectedCurrency === 'USD' ? 1 : exchangeRates[selectedCurrency];
    return amount * rate;
  };

  return (
    <Card elevation={3} sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Amortization Schedule
        </Typography>
        
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="amortization schedule table">
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">EMI</TableCell>
                <TableCell align="right">Principal</TableCell>
                <TableCell align="right">Interest</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {amortizationSchedule
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.month}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor:
                        row.month % 2 === 0
                          ? theme.palette.action.hover
                          : 'inherit',
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.month}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(convertAmount(row.emi), selectedCurrency)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(convertAmount(row.principalPayment), selectedCurrency)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(convertAmount(row.interestPayment), selectedCurrency)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(convertAmount(row.balance), selectedCurrency)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={amortizationSchedule.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default AmortizationSchedule;
