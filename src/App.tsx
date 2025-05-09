import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Welcome to TechMe 👋</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
