import { Route, Routes } from "react-router-dom";
import TechList from "./components/TechList";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<TechList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
