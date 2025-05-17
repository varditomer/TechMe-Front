import { Route, Routes, useLocation } from "react-router-dom";
import ExamConfigPage from "./modules/exam/pages/ExamConfigPage";
import ExamPage from "./modules/exam/pages/ExamPage";
import ExamWelcomePage from "./modules/exam/pages/ExamWelcomePage";
import ExamResultPage from "./modules/exam/pages/ExamResultPage";
import HomePage from "./pages/HomePage";

function ExamWelcomeWrapper() {
  const location = useLocation();
  
  if (!location.state?.tech || !location.state?.questionCount || !location.state?.timeLimit) {
    return <div>Invalid exam configuration. Please start over.</div>;
  }

  return (
    <ExamWelcomePage 
      tech={location.state.tech}
      questionCount={location.state.questionCount}
      timeLimit={location.state.timeLimit}
    />
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<ExamConfigPage />} />
      <Route path="/exam-welcome" element={<ExamWelcomeWrapper />} />
      <Route path="/exam" element={<ExamPage />} />
      <Route path="/exam-result" element={<ExamResultPage />} />
    </Routes>
  );
} 
