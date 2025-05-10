import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Tech } from "../exam.models";
import { examService } from "../exam.service";

export default function ExamConfigPage() {
  const [techs, setTechs] = useState<Tech[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [numPerTech, setNumPerTech] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    examService.getTechs().then(setTechs);
  }, []);

  const handleTechToggle = (id: string) => {
    setSelectedTechs((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const startExam = async () => {
    if (!selectedTechs.length || !numPerTech) return;

    try {
      const questions = await examService.startExam({
        techs: selectedTechs,
        numPerTech,
      });
      sessionStorage.setItem("examQuestions", JSON.stringify(questions));
      navigate("/exam");
    } catch (err) {
      console.error("Failed to start exam:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Start Your Tech Exam
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Select technologies and configure your exam settings
        </Typography>

        <Grid container spacing={4}>
          {/* Technologies Selection */}
          <Grid size={{ xs: 12 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Select Technologies
                </Typography>
                <Grid container spacing={2}>
                  {techs.map((tech) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tech.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedTechs.includes(tech.id)}
                            onChange={() => handleTechToggle(tech.id)}
                          />
                        }
                        label={tech.name}
                        sx={{
                          width: '100%',
                          border: '1px solid #e0e0e0',
                          borderRadius: 1,
                          p: 1,
                          '&:hover': {
                            backgroundColor: '#f5f5f5'
                          }
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Questions Per Tech */}
          <Grid size={{ xs: 12 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Questions per Technology
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={numPerTech}
                    onChange={(_, value) => setNumPerTech(value as number)}
                    min={1}
                    max={10}
                    marks
                    step={1}
                    valueLabelDisplay="auto"
                  />
                  <Typography variant="body2" color="text.secondary" align="center">
                    {numPerTech} questions per technology
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={startExam}
            disabled={!selectedTechs.length}
            sx={{ minWidth: 200 }}
          >
            Start Exam
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
