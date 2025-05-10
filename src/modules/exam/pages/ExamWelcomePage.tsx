import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/exam");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          {tech.name} Quiz
        </Typography>

        <Grid container spacing={4}>
          <Grid size={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Exam Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Typography variant="body1" paragraph>
                      This quiz consists of {questionCount} {tech.name} questions.
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="body1" paragraph>
                      You will have {timeLimit} minutes to complete the quiz.
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="body1" paragraph>
                      Important Notes:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body1">
                          You can navigate between questions using the Previous and Next buttons
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body1">
                          The timer will start as soon as you begin the quiz
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body1">
                          Once started, you cannot pause the quiz
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body1">
                          The quiz will automatically submit when time runs out
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
            Start Quiz
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 
