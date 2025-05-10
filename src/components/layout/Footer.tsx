import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="body2" color="text.secondary">
              © {currentYear} TechMe. {t('footer.allRightsReserved')}
            </Typography>
          </Grid>
          <Grid>
            <Grid container spacing={2}>
              <Grid>
                <Link href="#" color="inherit" underline="hover">
                  {t('footer.privacyPolicy')}
                </Link>
              </Grid>
              <Grid>
                <Link href="#" color="inherit" underline="hover">
                  {t('footer.termsOfService')}
                </Link>
              </Grid>
              <Grid>
                <Link href="#" color="inherit" underline="hover">
                  {t('footer.contact')}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 
