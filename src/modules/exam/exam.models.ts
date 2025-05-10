export interface Tech {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  tech: string;
  question: string;
  code?: string;
  options: string[];
  correctOptionIndex: number;
}

export interface ExamResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface ExamSummary {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  results: ExamResult[];
}
