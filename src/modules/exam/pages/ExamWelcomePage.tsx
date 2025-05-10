import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import type { Tech } from "../exam.models";

interface ExamWelcomePageProps {
  tech: Tech;
  questionCount: number;
  timeLimit: number; // in minutes
}

export default function ExamWelcomePage({ tech, questionCount, timeLimit }: ExamWelcomePageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/exam");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          {t('exam.welcome.title', { tech: tech.name })}
        </Typography>

        <Grid container spacing={4}>
          <Grid size={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('exam.welcome.details')}
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Typography variant="body1" paragraph>
                      {t('exam.welcome.questions', { count: questionCount, tech: tech.name })}
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="body1" paragraph>
                      {t('exam.welcome.timeLimit', { time: timeLimit })}
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="body1" paragraph>
                      {t('exam.welcome.notes')}:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body1">
                          {t('exam.welcome.navigation')}
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body1">
                          {t('exam.welcome.timer')}
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body1">
                          {t('exam.welcome.noPause')}
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body1">
                          {t('exam.welcome.autoSubmit')}
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleStart}
            sx={{ minWidth: 200 }}
          >
            {t('exam.welcome.start')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 
