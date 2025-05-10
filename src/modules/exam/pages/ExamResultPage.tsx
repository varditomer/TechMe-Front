import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import type { ExamSummary } from "../exam.models";

export default function ExamResultPage() {
  const { t } = useTranslation();
  const [results, setResults] = useState<ExamSummary | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedResults = sessionStorage.getItem("examResults");
    if (!savedResults) {
      navigate("/exam-config");
      return;
    }
    setResults(JSON.parse(savedResults));
  }, [navigate]);

  const handleRestart = () => {
    sessionStorage.removeItem("examResults");
    navigate("/");
  };

  if (!results) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          {t('exam.results.title')}
        </Typography>

        <Grid container spacing={4}>
          {/* Summary Section */}
          <Grid size={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('exam.results.summary')}
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <Typography variant="body1">
                      {t('exam.results.totalQuestions')}: {results.totalQuestions}
                    </Typography>
                  </Grid>
                  <Grid size={4}>
                    <Typography variant="body1">
                      {t('exam.results.correctAnswers')}: {results.correctAnswers}
                    </Typography>
                  </Grid>
                  <Grid size={4}>
                    <Typography variant="body1">
                      {t('exam.results.score')}: {results.score}%
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Detailed Results */}
          <Grid size={12}>
            <Typography variant="h6" gutterBottom>
              {t('exam.results.detailedResults')}
            </Typography>
            {results.results.map((result, index) => (
              <Card key={result.questionId} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {t('exam.results.question')} {index + 1}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Typography variant="body2" color="text.secondary">
                        {t('exam.results.yourAnswer')}: {result.userAnswer}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2" color="text.secondary">
                        {t('exam.results.correctAnswer')}: {result.correctAnswer}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Typography
                        variant="body2"
                        color={result.isCorrect ? "success.main" : "error.main"}
                      >
                        {result.isCorrect ? t('exam.results.correct') : t('exam.results.incorrect')}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleRestart}
            sx={{ minWidth: 200 }}
          >
            {t('exam.results.startNewQuiz')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 
