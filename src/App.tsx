import { Route, Routes } from "react-router-dom";
import ExamConfigPage from "./modules/exam/pages/ExamConfigPage";
import ExamPage from "./modules/exam/pages/ExamPage";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<ExamConfigPage />} />
          <Route path="/exam" element={<ExamPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
