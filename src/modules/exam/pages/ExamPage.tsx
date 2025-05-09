import { useEffect, useState } from "react";
import type { Question } from "../exam.models";

export default function ExamPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("examQuestions");
    if (stored) setQuestions(JSON.parse(stored));
  }, []);

  const current = questions[currentIndex];

  if (!current) return <div>No exam loaded.</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Exam</h2>
      <div>
        <p>
          Question {currentIndex + 1} / {questions.length}
        </p>
        <pre>{current.question}</pre>
        <ul>
          {current.options.map((opt, i) => (
            <li key={i}>
              <button>{opt}</button>
            </li>
          ))}
        </ul>
        {currentIndex + 1 < questions.length && (
          <button onClick={() => setCurrentIndex(currentIndex + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
