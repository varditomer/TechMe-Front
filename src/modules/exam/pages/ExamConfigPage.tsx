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
import type { Tech } from "../exam.models";
import { examService } from "../exam.service";

export default function ExamConfigPage() {
  const [techs, setTechs] = useState<Tech[]>([]);
  const [selectedTech, setSelectedTech] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTechs = async () => {
      try {
        const techs = await examService.getTechs();
        setTechs(techs);
      } catch (err) {
        console.error("Failed to load technologies:", err);
      }
    };
    loadTechs();
  }, []);

  const handleStart = async () => {
    if (!selectedTech) {
      alert("Please select a technology");
      return;
    }

    try {
      const questions = await examService.startExam({
        techs: [selectedTech],
        numPerTech: questionCount,
      });
      sessionStorage.setItem("examQuestions", JSON.stringify(questions));
      navigate("/exam-welcome", { 
        state: { 
          tech: techs.find(t => t.id === selectedTech),
          questionCount,
          timeLimit: 10 // 10 minutes
        } 
      });
    } catch (err) {
      console.error("Failed to start exam:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Configure Your Exam
        </Typography>

        <Grid container spacing={4}>
          {/* Technology Selection */}
          <Grid size={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Select Technology
                </Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Choose a technology to test:</FormLabel>
                  <RadioGroup
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                  >
                    {techs.map((tech) => (
                      <FormControlLabel
                        key={tech.id}
                        value={tech.id}
                        control={<Radio />}
                        label={tech.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

          {/* Question Count Selection */}
          <Grid size={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Number of Questions
                </Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select number of questions:</FormLabel>
                  <RadioGroup
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                  >
                    {[5, 10, 15, 20].map((count) => (
                      <FormControlLabel
                        key={count}
                        value={count}
                        control={<Radio />}
                        label={`${count} questions`}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
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
            Start Exam
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
