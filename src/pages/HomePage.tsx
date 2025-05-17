import { Box, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import techmeLogo from '../assets/images/techme_logo.png';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
      <img
        src={techmeLogo}
        alt="TechMe Logo"
        style={{ width: 180, marginBottom: 32 }}
      />
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Welcome to TechMe
      </Typography>
      <Typography variant="h6" align="center" sx={{ maxWidth: 600, mb: 5 }}>
        TechMe is your gateway to mastering technology topics through interactive quizzes and learning modules. Explore, challenge yourself, and track your progress as you grow your tech skills!
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 600, mt: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
          Explore TechMe Modules
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card sx={{ cursor: 'pointer', transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.04)' } }} onClick={() => navigate('/quiz')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Tech Quiz
                </Typography>
                <Typography variant="body2" align="center">
                  Test your knowledge in various technologies with our interactive quiz module.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Go to Quiz
                </Button>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more puzzle-like cards for other modules here in the future */}
        </Grid>
      </Box>
    </Box>
  );
} 
