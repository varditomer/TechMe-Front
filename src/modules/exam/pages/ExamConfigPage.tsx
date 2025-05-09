import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      // store in session for now
      sessionStorage.setItem("examQuestions", JSON.stringify(questions));
      navigate("/exam");
    } catch (err) {
      console.error("Failed to start exam:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Start Exam</h2>

      <div>
        <h4>Select Technologies</h4>
        {techs.map((tech) => (
          <label
            key={tech.id}
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            <input
              type="checkbox"
              value={tech.id}
              checked={selectedTechs.includes(tech.id)}
              onChange={() => handleTechToggle(tech.id)}
            />
            {tech.name}
          </label>
        ))}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>
          Questions per Tech:
          <input
            type="number"
            value={numPerTech}
            min={1}
            onChange={(e) => setNumPerTech(+e.target.value)}
          />
        </label>
      </div>

      <button style={{ marginTop: "1rem" }} onClick={startExam}>
        Start Exam
      </button>
    </div>
  );
}
