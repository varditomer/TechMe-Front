import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Grid,
} from "@mui/material";
import type { Tech } from "../exam.models";
import { examService } from "../exam.service";

export default function ExamConfigPage() {
  const { t } = useTranslation();
  const [techs, setTechs] = useState<Tech[]>([]);
  const [selectedTech, setSelectedTech] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTechs = async () => {
      try {
        const techs = await examService.getTechs();
        setTechs(techs);
        if (techs.length > 0) {
          setSelectedTech(techs[0].id);
        }
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
          {t('exam.configure')}
        </Typography>

        <Grid container spacing={4}>
          {/* Technology Selection */}
          <Grid size={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('exam.selectTech')}
                </Typography>
                <FormControl component="fieldset" fullWidth>
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
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('exam.selectQuestions')}
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                  >
                    {[5, 10, 15, 20].map((count) => (
                      <FormControlLabel
                        key={count}
                        value={count}
                        control={<Radio />}
                        label={`${count} ${t('exam.questions')}`}
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
            {t('exam.startExam')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
