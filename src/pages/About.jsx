import { Container, Typography, Paper, Box, Grid, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Calculate, CurrencyExchange, TableChart, DarkMode, ErrorOutline, PhoneAndroid } from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      
        
        <Typography variant="h5" gutterBottom>
          Technologies Used
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h6">React</Typography>
              <Typography variant="body2" color="text.secondary">
                Hooks, Routing, Context API
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h6">Material UI</Typography>
              <Typography variant="body2" color="text.secondary">
                For styling and responsive components
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h6">Axios</Typography>
              <Typography variant="body2" color="text.secondary">
                For API calls
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h6">Exchange Rate API</Typography>
              <Typography variant="body2" color="text.secondary">
                For real-time currency conversion
              </Typography>
            </Box>
          </Grid>
        </Grid>
    </Container>
  );
};

export default About;
