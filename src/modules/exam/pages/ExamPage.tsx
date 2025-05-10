import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Question } from "../exam.models";

export default function ExamPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuestions = sessionStorage.getItem("examQuestions");
    if (!savedQuestions) {
      navigate("/exam-config");
      return;
    }
    setQuestions(JSON.parse(savedQuestions));
  }, [navigate]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // For now, just store the answers and navigate to results
      sessionStorage.setItem("examAnswers", JSON.stringify(answers));
      navigate("/exam-result");
    } catch (err) {
      console.error("Failed to submit exam:", err);
    }
  };

  if (!questions.length) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Tech Exam
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Technology: {currentQuestion.tech}
          </Typography>
        </Box>

        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {currentQuestion.question}
            </Typography>

            <FormControl component="fieldset">
              <FormLabel component="legend">Select your answer:</FormLabel>
              <RadioGroup
                value={currentQuestion.id ? answers[currentQuestion.id] || "" : ""}
                onChange={(e) => currentQuestion.id && handleAnswerChange(currentQuestion.id, e.target.value)}
              >
                {currentQuestion.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                    sx={{
                      mb: 1,
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      p: 1,
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        <Grid container spacing={2} justifyContent="space-between">
          <Grid size={{ xs: 12, sm: 4 }}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              fullWidth
            >
              Previous
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            {isLastQuestion ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                Submit Exam
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                fullWidth
              >
                Next
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
