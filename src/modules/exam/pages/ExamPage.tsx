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
  Grid,
} from "@mui/material";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import type { Question, ExamResult, ExamSummary } from "../exam.models";

SyntaxHighlighter.registerLanguage('javascript', js);

const TIME_LIMIT = 10 * 60; // 10 minutes in seconds

export default function ExamPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuestions = sessionStorage.getItem("examQuestions");
    if (!savedQuestions) {
      navigate("/exam-config");
      return;
    }
    setQuestions(JSON.parse(savedQuestions));
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const handleSubmit = () => {
    const results: ExamResult[] = questions.map((question) => {
      const userAnswer = answers[question.id] || "";
      const correctAnswer = question.options[question.correctOptionIndex];
      return {
        questionId: question.id,
        userAnswer,
        correctAnswer,
        isCorrect: userAnswer === correctAnswer,
      };
    });

    const correctAnswers = results.filter((r) => r.isCorrect).length;
    const score = Math.round((correctAnswers / questions.length) * 100);

    const summary: ExamSummary = {
      totalQuestions: questions.length,
      correctAnswers,
      score,
      results,
    };

    sessionStorage.setItem("examResults", JSON.stringify(summary));
    navigate("/exam-result");
  };

  if (!questions.length) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Tech Exam
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" color="text.secondary">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Time Left: {minutes}:{seconds.toString().padStart(2, '0')}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            Technology: {currentQuestion.tech}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Question Section */}
          <Grid size={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Question
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
                  {currentQuestion.question}
                </Typography>
                {currentQuestion.code && (
                  <SyntaxHighlighter
                    language="javascript"
                    customStyle={{ borderRadius: '4px' }}
                  >
                    {currentQuestion.code}
                  </SyntaxHighlighter>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Answers Section */}
          <Grid size={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your Answer
                </Typography>
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <FormLabel component="legend">Select your answer:</FormLabel>
                  <RadioGroup
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
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
          </Grid>
        </Grid>

        {/* Navigation Footer */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          {isLastQuestion ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit Exam
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
